import * as Routes from './routes';

export const APP_COMPLEJOS = [
	{
		nombre: 'Complejos',
		ruta: Routes.COMPLEJOS,
	},
];

export const APP_COMPLEJO = [
	...APP_COMPLEJOS,
	{
		nombre: 'Home',
		ruta: Routes.COMPLEJO,
	},
];

export const APP_REGISTRAR_COMPLEJO = [
	...APP_COMPLEJOS,
	{
		nombre: 'Nuevo Complejo',
		ruta: Routes.REGISTRAR_COMPLEJO,
	},
];

export const APP_MODIFICAR_COMPLEJO = [
	...APP_COMPLEJO,
	{
		nombre: 'Modificar Complejo',
		ruta: Routes.MODIFICAR_COMPLEJO,
	},
];

export const ADMIN_USUARIOS = [
	{
		nombre: 'Usuarios',
		ruta: Routes.USUARIOS,
	},
];

export const ADMIN_ESTADISTICAS = [
	{
		nombre: 'Estadisticas',
		ruta: Routes.RANKING_CONCURRENCIA,
	},
];

export const ADMIN_COMPLEJOS = [
	{
		nombre: 'Administrar Complejos',
		ruta: Routes.ADMIN_COMPLEJOS,
	},
];

export const APP_ESPACIOS = [...APP_COMPLEJOS, { nombre: 'Espacios', ruta: Routes.ESPACIOS }];

export const APP_REGISTRAR_ESPACIOS = [
	...APP_ESPACIOS,
	{ nombre: 'Registrar Espacios', ruta: Routes.REGISTRAR_ESPACIO },
];

export const APP_MODIFICAR_ESPACIO = [
	...APP_ESPACIOS,
	{ nombre: 'Modificar Espacios', ruta: Routes.MODIFICAR_ESPACIO },
];

export const APP_COMPLEJO_CALENDARIO = [
	...APP_COMPLEJO,
	{ nombre: 'Calendario', ruta: Routes.CALENDARIO },
];

export const APP_COMPLEJO_RESERVAS_LISTADO = [
	...APP_COMPLEJO,
	{ nombre: 'Listado de Reservas', ruta: Routes.LISTADO_RESERVAS },
];

export const APP_COMPLEJO_RESERVAS_PENDIENTES_LISTADO = [
	...APP_COMPLEJO,
	{ nombre: 'Listado de reservas pendientes', ruta: Routes.LISTADO_RESERVAS_PENDIENTES },
];

export const APP_AYUDAS = [
	{
		nombre: 'Ayuda',
		ruta: Routes.AYUDA,
	},
];

export const APP_REPORTES_CONCURRENCIA = [
	...APP_COMPLEJO,
	{ nombre: 'Concurrencia', ruta: Routes.REPORTES_CONCURRENCIA },
];

export const APP_COMPLEJO_VALORACIONES_LISTADO = [
	...APP_COMPLEJO,
	{
		nombre: 'Listado valoraciones',
		ruta: Routes.LISTADO_VALORACIONES,
	},
];
