import firebase from "firebase";
import moment from "moment";

export async function registerReservaApi(reserva) {
  const semana = moment(reserva.fechaInicio).week();
  const mes = moment(reserva.fechaInicio).month();
  const año = moment(reserva.fechaInicio).year();
  const fechaRegistro = new firebase.firestore.Timestamp.fromDate(
    moment().toDate()
  );

  reserva.fechaInicio = new firebase.firestore.Timestamp.fromDate(
    reserva.fechaInicio
  );
  reserva.fechaFin = new firebase.firestore.Timestamp.fromDate(
    reserva.fechaFin
  );

  try {
    await firebase
      .firestore()
      .collection("reservas")
      .add({ ...reserva, semana, mes, año, fechaRegistro });

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
