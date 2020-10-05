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
        ...complejoData,
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

export async function updateComplejoApi(complejo, idComplejo) {
  try {
    await firebase
      .firestore()
      .collection("complejos")
      .doc(idComplejo)
      .update(complejo);
    return {
      status: "OK",
      message: "Los datos del complejo han sido actualizados con exito",
    };
  } catch (err) {
    return {
      status: "ERROR",
      message: "Error al actualizar los datos del complejo",
    };
  }
}

export async function getComplejosById(id) {
  try {
    const result = await firebase
      .firestore()
      .collection("complejos")
      .doc(id)
      .get();

    const complejo = { id: result.id, ...result.data() };
    return {
      status: "OK",
      message: "Se consultaron los complejos con exito",
      data: complejo,
    };
  } catch (err) {
    console.log(err);
    return {
      status: "ERROR",
      message: "Se produjo un error al consultar los complejos",
      error: err,
    };
  }
}

export async function getClienteByNumeroTelefono(idComplejo, numTelefono) {
  try {
    const result = await firebase
      .firestore()
      .collection("complejos")
      .doc(idComplejo)
      .collection("clientes")
      .where("numTelefono", "==", numTelefono)
      .get();

    const cliente = result.docs.map((docs) => docs.data());
    if (cliente.length === 0) {
      throw "No existe usuario";
    }
    return {
      status: "OK",
      message: "Se encontro el cliente con exito",
      data: cliente,
    };
  } catch (err) {
    return {
      status: "Error",
      message: "No se encontro el cliente buscado",
      error: err,
    };
  }
}

export async function addCliente(idComplejo, cliente) {}
