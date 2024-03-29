//RUTAS BASE
export const LANDING = "/"
export const ADMIN = "/admin"
export const APP = "/app"


//LANDING
export const LOGIN = "/login"
export const FAQ = "/faq"

//APP
export const AYUDA = `${APP}/ayuda`
export const COMPLEJOS = `${APP}/complejos`
export const REGISTRAR_COMPLEJO = `${APP}/complejos/registrar`
export const COMPLEJO = `${APP}/complejos/:idComplejo`
export const MODIFICAR_COMPLEJO = `${APP}/complejos/:idComplejo/modificar`
export const ESPACIOS = `${APP}/complejos/:idComplejo/espacios`
export const REGISTRAR_ESPACIO = `${APP}/complejos/:idComplejo/espacios/registrar`
export const MODIFICAR_ESPACIO = `${APP}/complejos/:idComplejo/espacios/:idEspacio/modificar`
export const CALENDARIO =  `${COMPLEJO}/calendario`
export const REPORTES_CONCURRENCIA =  `${COMPLEJO}/reportes/concurrencia`
export const LISTADO_RESERVAS = `${COMPLEJO}/reservas/listado`
export const LISTADO_RESERVAS_PENDIENTES = `${COMPLEJO}/reservas/pendientes`
export const LISTADO_VALORACIONES = `${COMPLEJO}/valoraciones/listado`

//REDIRECCIONES


//ADMIN
export const USUARIOS = `${ADMIN}/usuarios`
export const ADMIN_COMPLEJOS = `${ADMIN}/complejos`
export const RANKING_CONCURRENCIA = `${ADMIN}/estadisticas/ranking-concurrencia`

