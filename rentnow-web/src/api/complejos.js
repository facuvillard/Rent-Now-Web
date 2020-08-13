import firebase from "firebase";

export async function getComplejosByUserApi(user) {
  try {
    const userObject = { id: user.uid, nombre: user.displayName };
    const result = await firebase
      .firestore()
      .collection("complejos")
      .where("usuarios", "array-contains", userObject)
      .get();
    const complejos = result.docs.map((complejo) => {
      return { id: complejo.id, ...complejo.data() };
    });

    return {
      status: "OK",
      message: "Se consultaron los complejos con exito",
      data: complejos,
    };
  } catch (err) {
    return {
      status: "ERROR",
      message: "Se produjo un error al consultar los complejos",
      error: err,
    };
  }
}

export async function getComplejosApi() {
  try {
    const result = await firebase
      .firestore()
      .collection("complejos")
      .orderBy("fechaAlta", "asc")
      .get();
    const complejos = result.docs.map((complejo) => {
      const complejoData = complejo.data();
      return {
        id: complejo.id,
        ...complejoData
      };
    });
    return {
      status: "OK",
      message: "Se consultaron los complejos con exito",
      data: complejos,
    };
  } catch (err) {
    return {
      status: "ERROR",
      message: "Se produjo un error al consultar los complejos",
      error: err,
    };
  }
}

export async function createComplejoApi(docRef, complejo) {
  let options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  let fecha = new Date().toLocaleDateString("es-US", options);
  try {
    await docRef.set({
      ...complejo,
      habilitado: false,
      fechaAlta: fecha,
      fechaHabilitado: null,
    });
    return { status: "OK", message: "Se registró el complejo con exito" };
  } catch (err) {
    return {
      status: "ERROR",
      message: "Se produjo un error al registrar el complejo",
      error: err,
    };
  }
}

export async function habilitarComplejoApi(idComplejo, value) {
  let options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  let fecha = new Date().toLocaleDateString("es-US", options);
  try {
    await firebase
      .firestore()
      .collection("complejos")
      .doc(idComplejo)
      .update({ habilitado: !value, fechaHabilitado: value ? null : fecha });
    return {
      status: "OK",
      message: "Complejo habilitado/deshabilitado con exito",
    };
  } catch (err) {
    return {
      status: "ERROR",
      message: "Error al habilitar/deshabilitar el complejo",
    };
  }
}
