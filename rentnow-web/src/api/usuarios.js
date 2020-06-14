import firebase from "firebase";

export function getUsersApi() {
  return firebase
    .firestore()
    .collection("usuarios")
    .get()
    .then((response) => {
      return response.docs.map((user) => ({id: user.id, ...user.data()}))
    });
}

export function createUserApi(userToRegister) {
  try { 
    const email = userToRegister.email
    const password = userToRegister.contraseña
    delete userToRegister.contraseña
    firebase.auth().createUserWithEmailAndPassword(email,password).catch(function(error){
      console.log(error.code, error.message)
    })
   

    
  } catch (err) {
    console.log("HUBO FLOR DE ERROR AMIGAR2", err);
  }
}

export function editUserApi(user, idUser) {
  try {
    firebase.firestore().collection("usuarios").doc(idUser).update(user)
  } catch (err) {
    console.log("HUBO FLOR DE ERROR AMIGAR2");
  }
}

export function deleteUserApi() {
  return "...";
}
