import firebase from "firebase";

export async function recoverAndResetPassword(email) {
    var auth = firebase.auth();
    try {
        await auth.sendPasswordResetEmail(email)
        return {status: "OK", message:"Email de reseteo de contraseña enviado"}

    } catch (err) {
        return {status: "ERROR", message: "Error al recuperar contraseña"}
    }
}

export async function signOut() {
    var auth = firebase.auth();
    try {
        await auth.signOut()
        return {status: "OK", message:"Deslogeo correcto"}

    } catch (err) {
        return {status: "ERROR", message: "Error al deslogear"}
    }
}

export async function signIn(email, password) {
    var auth = firebase.auth()
    try {
        await auth.signInWithEmailAndPassword(email, password)
        return {status: "OK", message:"Logeo correcto"}

    } catch (err) {
        return {status: "ERROR", message:"Logeo incorrecto"}
    }


}