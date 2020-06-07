import firebase from "firebase";

export function getUsersApi() {
  return firebase
    .firestore()
    .collection("usuarios")
    .get()
    .then((response) => {
      return response.docs.map((user) => user.data());
    });
}
