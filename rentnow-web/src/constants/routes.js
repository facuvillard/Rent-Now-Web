//RUTAS BASE
export const LANDING = "/"
export const ADMIN = "/admin"
export const APP = "/app"


//LANDING
export const LOGIN = "/login"
export const FAQ = "/faq"

//APP
export const COMPLEJOS = `${APP}/complejos`
export const REGISTRAR_COMPLEJO = `${APP}/complejos/registrar`
export const COMPLEJO = `${APP}/complejos/:idComplejo`
export const MODIFICAR_COMPLEJO = `${APP}/complejos/:idComplejo/modificar`
export const ESPACIOS = `${APP}/complejos/:idComplejo/espacios`
export const REGISTRAR_ESPACIO = `${APP}/complejos/:idComplejo/espacios/registrar`
export const MODIFICAR_ESPACIO = `${APP}/complejos/:idComplejo/espacios/:idEspacio/modificar`


//REDIRECCIONES


//ADMIN
export const USUARIOS = `${ADMIN}/usuarios`
export const ADMIN_COMPLEJOS = `${ADMIN}/complejos`

