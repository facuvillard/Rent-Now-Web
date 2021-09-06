import firebase from "firebase";

export async function getUsersApi() {
  try {
    const result = await firebase
    .firestore()
    .collection("usuarios")
    .where("habilitado", "==", true)
    .get()
  
    const usuarios = result.docs.map(user => ({id: user.id, ...user.data()}))
    return {status: 'OK', message: 'Se consultaron usuarios con exito', data: usuarios}

  } catch (err) {
    return {status: 'ERROR', message: 'Error al consultar usuarios', error: err}
  }
}

export  async function  createUserApi   (userToRegister) {
 
    const createUsuario = firebase.functions().httpsCallable('createUsuario')
    const result =  await createUsuario(userToRegister)
   
    if(result.data.error && result.data.error.errorInfo.code === "auth/email-already-exists"){
      result.data.message = "El email se encuentra en uso"
    }
    return result.data
}

export async function editUserApi(user, idUser) {
  try {
    await firebase.firestore().collection("usuarios").doc(idUser).update(user)
    return {status: "OK", message: "Usuario actualizado con exito"}
  } catch (err) {
    return {status: "ERROR", message: "Error al actualizar el usuario"}
  }
}

export async function deleteUserApi(idUser) {
try {
  await firebase.firestore().collection('usuarios').doc(idUser).update({
    habilitado: false
  })
  return {status: "OK", message:"Usuario eliminado con exito"}
}
catch (err){
  return {status: "ERROR", message: "Error al eliminar el usuario"}
}
}


export async function getNotificacionesByUsuarioRealTime(
idUsuario, runWhenChange
) {
  try {

    const result = await firebase
      .firestore()
      .collection("usuarios")
      .doc(idUsuario)
      .collection("notificaciones")
      .onSnapshot((querySnapshot) => {
        let notificaciones = [];
        querySnapshot.forEach((notificacionDoc) => {
          const notificacion = notificacionDoc.data();
          console.log(notificacion)
          notificaciones.push({ ...notificacion, id: notificacionDoc.id/* , fechaInicio: notificacion.fechaInicio.toDate(), fechaFin: notificacion.fechaFin.toDate()  */});
        });
        runWhenChange(notificaciones);
      });

    return result;
  } catch (err) {
    console.log(err);
    return {
      status: "ERROR",
      message: "Se produjo un error al consultar las notificaciones",
      error: err,
    };
  }
}

export async function setNotificationAsReaded(idUsuario, notId) {
  try {

    const result = await firebase
      .firestore()
      .collection("usuarios")
      .doc(idUsuario)
      .collection("notificaciones")
      .doc(notId)
      .update({leida: true})

    return {status: "OK", message: "Notificacion marcada como leida"};
  } catch (err) {
    console.log(err);
    return {
      status: "ERROR",
      message: "Se produjo un error al registrar la reserva",
      error: err,
    };
  }
}