export const estados = {
    confirmada: 'CONFIRMADA',
    creada: 'CREADA',
    enCurso: 'EN CURSO',
    cancelada: 'CANCELADA',
    enHorario: 'EN HORARIO',
    sinConcurrencia: 'SIN CONCURRENCIA',
    finalizada: 'FINALIZADA'
}

export const posiblesEstados = {
    "CREADA"            : [estados.confirmada, estados.cancelada],
    "CONFIRMADA"        : [estados.enHorario, estados.cancelada],
    "EN HORARIO"        : [estados.enCurso, estados.cancelada, estados.sinConcurrencia],
    "EN CURSO"          : [estados.finalizada, estados.cancelada],
    "SIN CONCURRENCIA"  : [],
    "CANCELADA"         : [],
    "FINALIZADA"        : [],
}


export const colorsByEstado = {
    "EN CURSO": "#9ccc65",
    "CONFIRMADA": "#42a5f5",
    "FINALIZADA": "#757575",
    "EN HORARIO": "#26a69a",
    "CANCELADA": "#ef5350",
    "SIN CONCURRENCIA": "#ffa726",
}






