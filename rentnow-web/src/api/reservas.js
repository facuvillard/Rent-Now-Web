import firebase from "firebase";
import moment from "moment";

export async function registerReservaApi(reserva) {
  const dia = moment(reserva.fechaInicio).date();
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
  reserva.estados.push({
    estado: "CONFIRMADA",
    fecha: new firebase.firestore.Timestamp.now(),
    motivo: "",
  });

  try {
    await firebase
      .firestore()
      .collection("reservas")
      .add({ ...reserva, dia, semana, año, fechaRegistro });

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

export async function getCantReservasByIdComplejoYMes(idComplejo, mes) {
  try {
    const result = await firebase
      .firestore()
      .collection("reservas")
      .where("complejo.id", "==", idComplejo)
      .where("mes", "==", mes)
      .get()
      .then((snap) => snap.size);

    return {
      status: "OK",
      message: "Se consultaron correctamente las reservas",
      data: result,
    };
  } catch (err) {
    return {
      status: "ERROR",
      message: err,
    };
  }
}

export async function getReservas(idComplejo) {
  try {
    const result = await firebase
      .firestore()
      .collection("reservas")
      .where("complejo.id", "==", idComplejo)
      .get()
      .then((snap) => snap.docs.map((reservas) => reservas.data()));

    return {
      status: "OK",
      message: "Se consultaron correctamente las reservas",
      data: result,
    };
  } catch (err) {
    return {
      status: "ERROR",
      message: err,
    };
  }
}
