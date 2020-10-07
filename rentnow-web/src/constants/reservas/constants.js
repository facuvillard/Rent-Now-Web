export const estados = {
    confirmada: 'CONFIRMADA',
    creada: 'CREADA',
    enCurso: 'EN CURSO',
    cancelada: 'CANCELADA',
    enHorario: 'EN HORARIO',
    sinConcurrencia: 'SIN CONCURRENCIA',
    finalizada: 'FINALIZADA'
}

export const posiblesEstados = {}
posiblesEstados = {
    creada : [confirmada, cancelada],
    confirmada : [enHorario, cancelada, sinConcurrencia],
    enHorario : [enCurso, cancelada, sinConcurrencia],
    enCurso : [finalizada, cancelada],
    sinConcurrencia : [],
    cancelada: [],
    finalizada: [],
}


