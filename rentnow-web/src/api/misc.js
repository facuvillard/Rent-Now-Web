import firebase from "firebase";


export async function sendEmailWithHTMLApi(emailData) {
    const  formatedEmaildata = {
        recipient: emailData.destinatario,
        subject: emailData.asunto,
        body: emailData.contenido,
        attatchments: emailData.adjuntos
    }
    const sendEmailFromFirebase = firebase.functions().httpsCallable('sendContactEmailHTML')
    const result = await sendEmailFromFirebase(formatedEmaildata)
    
    return result.data;
}

export async function sendEmailApi(emailData) {
    const  formatedEmaildata = {
        recipient: emailData.destinatario,
        subject: emailData.asunto,
        body: emailData.contenido,
        attatchments: emailData.adjuntos
    }
    const sendEmailFromFirebase = firebase.functions().httpsCallable('sendContactEmail')
    const result = await sendEmailFromFirebase(formatedEmaildata)
    
    return result.data;
}