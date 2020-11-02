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
    "EN CURSO": "#5F8A2D",
    "CONFIRMADA": "#0197CA",
    "FINALIZADA": "#757575",
    "EN HORARIO": "#66B032",
    "CANCELADA": "#FE2713",
    "SIN CONCURRENCIA": "#FB9900",
}






