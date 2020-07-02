import firebase from "firebase";

export function getComplejosApi() {
   return firebase
    .firestore()
    .collection("complejos")
    .get()
    .then((response) => {
      return response.docs.map(complejo => (complejo.data()))
    }).catch(error => {
        console.log(error)
    })
}