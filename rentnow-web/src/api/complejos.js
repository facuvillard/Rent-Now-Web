import firebase from "firebase";

export async function getComplejosByUserApi(user) {
  try {
    const userObject = { id: user.uid, nombre: user.displayName  };
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
export async function createComplejoApi(docRef, complejo) {
  try {
    await docRef.set({...complejo, habilitado: false})
    return { status: "OK", message: "Se registró el complejo con exito" };
  } catch (err) {
    return {
      status: "ERROR",
      message: "Se produjo un error al registrar el complejo",
      error: err,
    };
  }
}
