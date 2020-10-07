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








