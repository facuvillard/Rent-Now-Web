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