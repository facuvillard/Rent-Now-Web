import firebase from "firebase";

export async function getComplejosByUserApi(user) {
  try {
    const userId = user.uid;
    const result = await firebase
      .firestore()
      .collection("complejos")
      .where("usuarios", "array-contains", userId)
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

export async function getComplejosApi(){
  try {
    const result = await firebase
      .firestore()
      .collection("complejos")
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

export async function createComplejoApi(complejo) {
  try {
    const result = await firebase
      .firestore()
      .collection("complejos")
      .add(complejo);
      console.log(result)
    return { status: "OK", message: "Se registró el complejo con exito" };
  } catch (err) {
    return {
      status: "ERROR",
      message: "Se produjo un error al registrar el complejo",
      error: err,
    };
  }
}
