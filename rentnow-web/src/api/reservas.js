import firebase from "firebase";
import moment from "moment";
export async function registerReservaApi(reserva) {
  const semana = moment(reserva.fechaInicio).week();
  const año = moment(reserva.fechaInicio).year();
  const fechaRegistro = new firebase.firestore.Timestamp.fromDate(moment().toDate())

  reserva.fechaInicio = new firebase.firestore.Timestamp.fromDate(
    reserva.fechaInicio
  );
  reserva.fechaFin = new firebase.firestore.Timestamp.fromDate(
    reserva.fechaFin
  );

  try {
    const result = await firebase
      .firestore()
      .collection("reservas")
      .add({ ...reserva, semana, año, fechaRegistro });

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
