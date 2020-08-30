import firebase from "firebase";

export async function createEspacio(espacio) {
  try {
    await firebase
      .firestore()
      .collection("/espacios")
      .doc()
      .set({
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

export async function getEspaciosByIdComplejo(idComplejo) {
  try {
    const result = await firebase
      .firestore()
      .collection("/espacios")
      .where("idComplejo", "==", idComplejo)
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
