import * as Routes from './routes'

export const APP_COMPLEJOS = [{
    nombre: "Complejos",
    ruta: Routes.COMPLEJOS
}]

export const APP_REGISTRAR_COMPLEJO = [
    ...APP_COMPLEJOS,
    {
        nombre: "Nuevo Complejo",
        ruta: Routes.REGISTRAR_COMPLEJO
    }
]

export const ADMIN_USUARIOS = [
    {
        nombre: "Usuarios",
        ruta: Routes.USUARIOS
    }
]

export const ADMIN_COMPLEJOS = [
    {
        nombre: "Administrar Complejos",
        ruta: Routes.ADMIN_COMPLEJOS
    }
]

