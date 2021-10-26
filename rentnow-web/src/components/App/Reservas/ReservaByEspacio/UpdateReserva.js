import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Checkbox, Grid, Typography, Button, TextField, MenuItem, Stepper, Step, StepLabel, Chip } from '@material-ui/core'
import { Formik, Field, Form } from "formik";
import InputAdornment from '@material-ui/core/InputAdornment';
import moment from "moment";
import firebase from "firebase";
import * as constants from 'constants/reservas/constants'
import { Alert, AlertTitle } from "@material-ui/lab";


const useStyles = makeStyles((theme) => ({
    text: {
        marginBottom: theme.spacing(2),
    },
    grid: {
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3),
    },
    checkboxes: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(3)
    },
}));

const UpdateReserva = (props) => {
    console.log(props)
    const classes = useStyles();
    const [disabled, setDisabled] = useState(true)
    const estadoActual = props.reserva.estados ? props.reserva.estados[props.reserva.estados.length - 1].estado : "";
    const motivoActual = props.reserva.estados ? props.reserva.estados[props.reserva.estados.length - 1].motivo : "";
    let posiblesEstados = [];
    posiblesEstados = constants.posiblesEstados[estadoActual];
    if (!posiblesEstados.includes(estadoActual)) {
        posiblesEstados.unshift(estadoActual)
    }

    const fechaActualizacion = new firebase.firestore.Timestamp.fromDate(
        moment().toDate()
    );
    moment.locale('es');

    const handleSetDisabled = () => {
        if(disabled){
            setDisabled(false)
        }
    }
    return (
        <>
            <Formik
                initialValues={{
                    id: props.reserva.id,
                    descripcionComplejo: props.reserva.complejo.descripcion,
                    descripcionEspacio: props.reserva.espacio.descripcion,
                    horaInicio: moment(props.reserva.start).format('Do MMMM YYYY, HH:mm ') || props.reserva.fechaInicioString,
                    horaFin: moment(props.reserva.end).format('Do MMMM YYYY, HH:mm ') || props.reserva.fechaFinString,
                    esFijo: props.reserva.esFijo,
                    descripcionCliente: props.reserva.title || props.reserva.nombreCompleto,
                    telefonoCliente: props.reserva.telefonoCliente || (props.reserva.cliente ? props.reserva.cliente.celular : "" ),
                    monto: props.reserva.monto,
                    estaPagado: props.reserva.estaPagado,
                    estado: estadoActual,
                    estados: props.reserva.estados,
                    motivo: motivoActual,
                    emailCliente: props.reserva?.emailCliente,
                    reservaApp: props.reserva.reservaApp
                }}
                onSubmit={async (values) => {
                    if (estadoActual !== values.estado || motivoActual !== values.motivo) {
                        values.estados.push({ estado: values.estado, fecha: fechaActualizacion, motivo: values.motivo })
                    }
                    props.updateHandler(values);
                    props.setOpen(false);
                }}
            >
                {({ values, handleChange }) => (
                    <Form>
                        <Grid container
                            spacing={2}
                            direction="row"
                            justify="center"
                            alignItems="center">
                            <Grid item xs={6}>
                                <Field
                                    name="descripcionEspacio"
                                    label="Nombre Espacio"
                                    fullWidth
                                    as={TextField}
                                    value={values.descripcionEspacio}
                                    margin='normal'
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                {values.reservaApp && <Chip className={classes.checkboxes} label='APP' color='primary' size='small' />}
                            </Grid>
                            <Grid item xs={3}>
                                <Typography className={classes.checkboxes}>
                                    <Field type="checkbox" name="estaPagado" as={Checkbox} onClick={()=>handleSetDisabled()}/>
                                    <b>PAGADO</b>
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    name="horaInicio"
                                    label="Hora Inicio"
                                    fullWidth
                                    as={TextField}
                                    value={values.horaInicio}
                                    margin='normal'
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    name="horaFin"
                                    label="Hora Fin"
                                    fullWidth
                                    as={TextField}
                                    value={values.horaFin}
                                    margin='normal'
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Field
                                    name="descripcionCliente"
                                    label="Nombre Cliente"
                                    fullWidth
                                    as={TextField}
                                    value={values.descripcionCliente}
                                    margin='normal'
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <Field
                                    name="telefonoCliente"
                                    label="Telefono Cliente"
                                    fullWidth
                                    as={TextField}
                                    value={values.telefonoCliente}
                                    margin='normal'
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    name="emailCliente"
                                    label="Email Cliente"
                                    fullWidth
                                    as={TextField}
                                    value={values.emailCliente}
                                    margin='normal'
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Field
                                    name="monto"
                                    label="Monto Total"
                                    fullWidth
                                    as={TextField}
                                    value={values.monto}
                                    margin='normal'
                                    InputProps={{
                                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    name="estado"
                                    select
                                    fullWidth
                                    label="Estado"
                                    value={values.estado}
                                    margin='normal'
                                    onChange={(e) => {
                                        handleSetDisabled();
                                        handleChange(e);
                                    }}
                                >
                                    <MenuItem value="" disabled>
                                        <b><em>Estado</em></b>
                                    </MenuItem>
                                    {posiblesEstados.map((estado) => (
                                        <MenuItem key={estado} value={estado}>
                                            {estado}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item>
                                <Stepper activeStep={props.reserva.estados.length - 1} orientation="vertical">
                                    {props.reserva.estados.map((estado, index) => (
                                        <Step key={index}>
                                            <StepLabel>{estado.estado} - {moment(estado.fecha.toDate()).format('D/M/YY hh:mm').toString()}</StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                            </Grid>
                            {values.estado === constants.estados.cancelada ? (
                                <Grid item xs={12}>
                                    <Field
                                        name="motivo"
                                        label="Motivo Cancelación"
                                        fullWidth
                                        as={TextField}
                                        value={values.motivo}
                                        margin='normal'
                                        helperText="Detalle la razon por la cual la turno/reserva fue cancelada"
                                    />
                                </Grid>
                            ) : (null)}
                            <Grid container justify="center" className={classes.alert}>
                                <Alert severity="info">
                                    <AlertTitle>
                                        Solo podras modificar el Pago y el Estado de la Reserva
                                    </AlertTitle>
                                    Si deseas modificar algun otro dato, deberas Cancelar la Reserva actual y volver a Registrar una nueva.
                                </Alert>
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                alignItems="center"
                                justify="space-evenly"
                                className={classes.grid}
                            >
                                <Grid item xs={2} >
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            props.setOpen(false);
                                        }}
                                        color="secondary"

                                    >
                                        Volver
                                    </Button>
                                </Grid>
                                <Grid item xs={2} >
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                        disabled={disabled}

                                    >
                                        Guardar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default UpdateReserva