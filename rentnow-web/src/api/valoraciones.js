import firebase from "firebase";

export async function getValoracionesByComplejoId(idComplejo) {
	try {
		const result = await firebase
			.firestore()
			.collection("complejos")
			.doc(idComplejo)
			.collection("valoraciones")
			.orderBy("fecha", "asc")
			.get();
		const valoraciones = result.docs.map((val) => {
			return {...val.data(), id: val.id, fecha: val.data().fecha.toDate()};
		});
		return {
			status: "OK",
			message: "Se consultaron las valoraciones con exito",
			data: valoraciones,
		};
	} catch (err) {
		return {
			status: "ERROR",
			message: "Se produjo un error al consultar las valoraciones",
			error: err,
		};
	}
}
