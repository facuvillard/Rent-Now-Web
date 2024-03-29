import { capitalize, getFranjaHoraria } from "components/utils/Functions/functions"
import firebase from "firebase";
import moment from "moment";


export async function registerReservaApi(reserva) {
	const dia = moment(reserva.fechaInicio).date();
	const semana = moment(reserva.fechaInicio).week();
	const mes = moment(reserva.fechaInicio).month();
	const año = moment(reserva.fechaInicio).year();
	const diaString = capitalize(moment(reserva.fechaInicio).format('dddd'))
	const hora = moment(reserva.fechaInicio).hour()
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
	reserva.estados.push({
		estado: "CONFIRMADA",
		fecha: new firebase.firestore.Timestamp.now(),
		motivo: "",
	});
	reserva.estadoActual = "CONFIRMADA";

	try {
		await firebase
			.firestore()
			.collection("reservas")
			.add({ ...reserva, dia, diaString, semana, mes, año, fechaRegistro, franjaHoraria, reservaApp: false });

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
			.orderBy("fechaInicio")
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
		await firebase.firestore().collection("reservas").doc(id).update(reserva);
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

export async function getReservasComplejoHistorico(
  idComplejo,
  fechaDesde,
  fechaHasta
) {
  try {
    const fechaDesdeFB = firebase.firestore.Timestamp.fromDate(fechaDesde);
    const fechaHastaFB = firebase.firestore.Timestamp.fromDate(fechaHasta);
    const result = await firebase
      .firestore()
      .collection("reservas")
      .where("complejo.id", "==", idComplejo)
      .where("fechaInicio", ">=", fechaDesdeFB)
      .where("fechaInicio", "<=", fechaHasta)
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
			.where("complejo.id", "==", idComplejo)
			.where("año", "==", year)
			.where("mes", "==", month)
			.orderBy("fechaInicio", "asc")
			.onSnapshot((querySnapshot) => {
				let reservas = [];

				querySnapshot.forEach((reservaDoc) => {
					const reserva = reservaDoc.data();
					reservas.push({
						id: reservaDoc.id,
						fechaInicioString: reserva.fechaInicio.toDate(),
						fechaFinString: reserva.fechaFin.toDate(),
						estado: reserva.estados[reserva.estados.length - 1].estado,
						nombreCompleto: `${reserva.cliente.apellido}, ${reserva.cliente.nombre}`,
						...reserva,
					});
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

export async function getAllReservasByDate(date) {
	const firebaseDate = new firebase.firestore.Timestamp.fromDate(date);
	try {
		const result = await firebase
			.firestore()
			.collection("reservas")
			.where("fechaRegistro", ">=", firebaseDate)

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

export async function getAllReservasByDateAndIdComplejo(date, idComplejo) {
	const firebaseDate = new firebase.firestore.Timestamp.fromDate(date);
	try {
		const result = await firebase
			.firestore()
			.collection("reservas")
			.where("fechaRegistro", ">=", firebaseDate)
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

export async function getAllReservasPendientesByIdComplejo(idComplejo, runWhenChange) {
	try {
		const result = await firebase
			.firestore()
			.collection("reservas")
			.where("complejo.id", "==", idComplejo)
			.where("estadoActual", "==", "CREADA")
			.orderBy("fechaRegistro", "asc")
			.get()
			.then((snap) => snap.docs.map((reservas) => reservas));

		const reservas = []
		result.map((reserva) => {
			reservas.push({
				fechaInicioString: reserva.data().fechaInicio.toDate(),
				fechaFinString: reserva.data().fechaFin.toDate(),
				fechaRegistroString: reserva.data().fechaRegistro.toDate(),
				id: reserva.id,
				...reserva.data()
			})
		})


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
