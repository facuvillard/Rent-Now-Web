import firebase from "firebase";
import moment from "moment";

const diasStrings = {
  Monday : 'Lunes',
  Tuesday: 'Martes',
  Thirsday: 'Miercoles',
  Wednesday: 'Jueves',
  Friday: 'Viernes',
  Saturday: 'Sabado',
  Sunday: 'Domingo'
}

function getFranjaHoraria(hora) {
  
    if(hora >= 5 && hora < 13) {
      return 'Mañana'
   
    } 
    if(hora >= 13 && hora < 16){
      return 'Siesta'
     
    } 
    if(hora >= 16 && hora < 19){
     return 'Tarde'
      
    } 
    if(hora >= 19 && hora < 24){
      return 'Noche'
      
    }

    return 'Fuera de franja'
  }





export async function registerReservaApi(reserva) {
  const dia = moment(reserva.fechaInicio).date();
  const semana = moment(reserva.fechaInicio).week();
  const mes = moment(reserva.fechaInicio).month();
  const año = moment(reserva.fechaInicio).year();
  const diaString = diasStrings[moment(reserva.fechaInicio).format('dddd')]
  const hora = moment(reserva.fechaInicio).hour()
  console.log(getFranjaHoraria(hora))
  console.log(hora)
  const franjaHoraria = getFranjaHoraria(hora)
  const fechaRegistro = new firebase.firestore.Timestamp.fromDate(
    moment().toDate()
  );

  reserva.fechaInicio = new firebase.firestore.Timestamp.fromDate(
    reserva.fechaInicio
  );
  reserva.fechaFin = new firebase.firestore.Timestamp.fromDate(
    reserva.fechaFin
  );
  reserva.estados.push({estado: "CONFIRMADA", fecha: new firebase.firestore.Timestamp.now(), motivo: ""});

  try {
    await firebase
      .firestore()
      .collection("reservas")
      .add({ ...reserva, dia, diaString, semana, mes, año, fechaRegistro, franjaHoraria});


    return { status: "OK", message: "Se registró la reserva con exito" };
  } catch (err) {
    return {
      status: "ERROR",
      message: "Se produjo un error al registrar la reserva",
      error: err,
    };
  }
}

export async function getReservasByWeekAndEspacio(fecha, idEspacio) {
  try {
    const week = moment(fecha).week();
    const year = moment(fecha).year();

    const result = await firebase
      .firestore()
      .collection("reservas")
      .where("espacio.id", "==", idEspacio)
      .where("semana", "==", week)
      .where("año", "==", year)
      .get();

    const reservas = result.docs.map((reservaDoc) => {
      const reserva = reservaDoc.data();
      return {
        ...reserva,
        fechaInicio: reserva.fechaInicio.toDate(),
        fechaFin: reserva.fechaFin.toDate(),
      };
    });

    return reservas;
  } catch (err) {
    console.log(err);
    return {
      status: "ERROR",
      message: "Se produjo un error al registrar la reserva",
      error: err,
    };
  }
}

export async function getReservasSixWeeksAndEspacioRealTime(
  fecha,
  idEspacio,
  runWhenChange
) {
  try {
    const firstWeek = moment(fecha).startOf("month").week() - 1;
    const lastWeek = moment(fecha).endOf("month").week() + 1;
    const year = moment(fecha).year();

    const result = await firebase
      .firestore()
      .collection("reservas")
      .where("espacio.id", "==", idEspacio)
      .where("semana", ">=", firstWeek)
      .where("semana", "<=", lastWeek)
      .where("año", "==", year)
      .onSnapshot((querySnapshot) => {
        let reservas = [];

        querySnapshot.forEach((reservaDoc) => {
          reservas.push({ ...reservaDoc.data(), id: reservaDoc.id });
        });
        runWhenChange(reservas);
      });

    return result;
  } catch (err) {
    console.log(err);
    return {
      status: "ERROR",
      message: "Se produjo un error al registrar la reserva",
      error: err,
    };
  }
}

export async function updateReservaStateAndPayment(reserva, id) {
  try {
    await firebase
      .firestore()
      .collection("reservas")
      .doc(id)
      .update(reserva);
    return {
      status: "OK",
      message: "Los datos de la reserva han sido actualizados con exito",
    };
  } catch (err) {
    return {
      status: "ERROR",
      message: "Error al actualizar los datos de la reserva",
    };
  }
}

export async function getReservasComplejoHistorico(idComplejo) {
  try {
    const result = await firebase
      .firestore()
      .collection("reservas")
      .where("complejo.id", "==", idComplejo)
      .get();

    const reservas = result.docs.map((reservaDoc) => {
      const reserva = reservaDoc.data();
      return {
        ...reserva,
        fechaInicio: reserva.fechaInicio.toDate(),
        fechaFin: reserva.fechaFin.toDate(),
      };
    });

    return {
      status: "OK",
      message: "Se recuperaron las reservas correctamente",
      data: reservas,
    };
  } catch (err) {
    console.log(err);
    return {
      status: "ERROR",
      message: "Se produjo un error al registrar la reserva",
      error: err,
    };
  }
}

export async function getReservasByMonthAndYear(fecha, idComplejo, runWhenChange) {
  try {
    const month = moment(fecha).month();
    const year = moment(fecha).year();

    const result = await firebase
      .firestore()
      .collection("reservas")
      .where('complejo.id','==',idComplejo)
      .where('año','==', year)
      .where('mes','==', month)
      .orderBy("fechaInicio", "asc")
      .onSnapshot((querySnapshot) => {
        let reservas = [];

        querySnapshot.forEach((reservaDoc) => {
          const reserva = reservaDoc.data()
          reservas.push({
            id: reservaDoc.id,
            fechaInicioString: reserva.fechaInicio.toDate(),
            fechaFinString: reserva.fechaFin.toDate(),
            estado: reserva.estados[reserva.estados.length - 1].estado,
            nombreCompleto: `${reserva.cliente.apellido}, ${reserva.cliente.nombre}`,
            ...reserva,}
          );
        });
        runWhenChange(reservas);
      });

      const reservas = result.docs.map((reservaDoc) => {
        const reserva = reservaDoc.data();
        return {
          fechaInicioString: reserva.fechaInicio.toDate(),
          fechaFinString: reserva.fechaFin.toDate(),
          estado: reserva.estados[reserva.estados.length - 1].estado,
          nombreCompleto: `${reserva.cliente.apellido}, ${reserva.cliente.nombre}`,
          ...reserva,
        };
      });
    
      return {
        status: "OK",
        message: "Se consultaron las reservas con éxito",
        data: reservas,
      };

  } catch (err) {
    return {
      status: "ERROR",
      message: "Se produjo un error al obtener las reservas",
      error: err,
    };
  }
}
