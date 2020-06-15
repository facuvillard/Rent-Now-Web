import firebase from "firebase";


export function getUsersApi() {
  return firebase
    .firestore()
    .collection("usuarios")
    .where("habilitado", "==", true)
    .get()
    .then((response) => {
      return response.docs.map((user) => ({id: user.id, ...user.data()}))
    });
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
