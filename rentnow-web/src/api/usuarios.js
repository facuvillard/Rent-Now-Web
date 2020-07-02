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
