import firebase from "firebase";

export async function createEspacio(espacio) {
  try {
    await firebase.firestore().collection("/espacios").doc().set({
      ...espacio,
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
