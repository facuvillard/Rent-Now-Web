import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Checkbox, Grid, Typography, Button, TextField, MenuItem, } from '@material-ui/core'
import { Formik, Field, Form } from "formik";
import InputAdornment from '@material-ui/core/InputAdornment';
import moment from "moment";



const useStyles = makeStyles((theme) => ({
    text: {
        marginBottom: theme.spacing(2),
    },
    grid: {
        marginBottom: theme.spacing(3),
        marginTop: theme.spacing(3),
    },
}));

const UpdateReserva = (props) => {
    const classes = useStyles();
    const posiblesEstados = props.posiblesEstados;

    moment.locale('es'); 
    return (
        <>
            <Formik
                initialValues={{
                    id: props.reserva.id,
                    descripcionComplejo: props.reserva.complejo.descripcion,
                    descripcionEspacio: props.reserva.espacio.descripcion,
                    horaInicio: moment(props.reserva.start).format('Do MMMM YYYY, HH:mm '),
                    horaFin: moment(props.reserva.end).format('Do MMMM YYYY, HH:mm '),
                    esFijo: props.reserva.esFijo,
                    descripcionCliente: "Juan Perez",
                    telefonoCliente: "2995969371",
                    monto: props.reserva.monto,
                    estaPagado: props.reserva.estaPagado,
                    estado: props.reserva.estado,
                    motivo: ""
                }}
                onSubmit={async (values) => {
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
                                    name="descripcionComplejo"
                                    label="Nombre Complejo"
                                    fullWidth
                                    as={TextField}
                                    value={values.descripcionComplejo}
                                    margin='normal'
                                    InputProps={{
                                        readOnly: true,
                                      }}
                                />
                            </Grid>
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
                            <Grid item xs={6}>
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
                            <Grid item xs={6}>
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
                            {values.estado === "Cancelado" ? (
                                <Grid item xs={12}>
                                <Field
                                    name="observacion"
                                    label="Observación"
                                    fullWidth
                                    as={TextField}
                                    value={values.motivo}
                                    margin='normal'
                                    helperText="Detalle la razon por la cual la turno/reserva fue cancelado"
                                />
                            </Grid>
                            ):(null)}
                            <Grid item xs={3}>
                                <Typography>
                                    <Field type="checkbox" name="estaPagado" as={Checkbox} />
                                Pagado
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography>
                                    <Field type="checkbox" name="esFijo" as={Checkbox} disabled/>
                                Es un turno fijo
                                </Typography>
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