import firebase from "firebase";

export async function createEspacio(docRef, espacio) {
  try {
    await docRef.set({
      ...espacio,
      baja: false,
    });
    return { status: "OK", message: "Se registró el espacio con exito" };
  } catch (err) {
    return {
      status: "ERROR",
      message: "Se produjo un error al registrar el espacio",
      error: err,
    };
  }
}

export async function getEspaciosByIdComplejo(idComplejo) {
  try {
    const result = await firebase
      .firestore()
      .collection("/espacios")
      .where("idComplejo", "==", idComplejo)
      .where("baja", "==", false)
      .get();
    const espacios = result.docs.map((espacio) => ({
      id: espacio.id,
      ...espacio.data(),
    }));
    return {
      status: "OK",
      message: "Se consultaron los espacios con exito",
      data: espacios,
    };
  } catch (err) {
    console.log(err);
    return {
      status: "ERROR",
      message: "Se produjo un error al consultar los espacios",
      error: err,
    };
  }
}

export async function bajaEspacioApi(idEspacio) {
  try {
    await firebase
      .firestore()
      .collection("espacios")
      .doc(idEspacio)
      .update({ baja: true });
    return {
      status: "OK",
      message: "El espacio ha sido dado de baja con éxito.",
    };
  } catch (err) {
    return {
      status: "ERROR",
      message: "El espacio no se ha podido dar de baja.",
    };
  }
}


export async function getEspacioById(id) {
  try {
    const result = await firebase
      .firestore()
      .collection("espacios")
      .doc(id)
      .get();

    const espacio = { id: result.id, ...result.data() };
    return {
      status: "OK",
      message: "Se consulto el espacio con exito",
      data: espacio,
    };
  } catch (err) {
    console.log(err);
    return {
      status: "ERROR",
      message: "Se produjo un error al consultar espacio",
      error: err,
    };
  }
}


export async function getDocRefApi() {
  try {
    const result = await firebase.firestore().collection("/espacios").doc();
    return {
      status: "OK",
      message: "Se trajo la referencia a documento de espacio con éxito",
      data: result,
    };
  } catch (err) {
    return {
      status: "ERROR",
      message: "Se produjo un error al traer la referencia a documento espacio",
      error: err,
    };
  }
}


export async function updateEspacioApi(espacio, idEspacio) {
  try {
    await firebase
      .firestore()
      .collection("espacios")
      .doc(idEspacio)
      .update(espacio);
    return {
      status: "OK",
      message: "Los datos del espacio han sido actualizados con exito",
    };
  } catch (err) {
    return {
      status: "ERROR",
      message: "Error al actualizar los datos del espacio",
    };
  }
}

