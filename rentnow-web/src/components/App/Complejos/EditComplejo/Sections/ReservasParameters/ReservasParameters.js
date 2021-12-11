import React, { useState } from "react";
import {
    Grid,
    TextField,
    Button,
    CircularProgress,
    Checkbox,
    Typography,
    Tooltip,
    InputAdornment
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { updateComplejoApi } from '../../../../../../api/complejos'
import AlertCustom from "components/utils/AlertCustom/AlertCustom";
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom"
import InfoIcon from '@material-ui/icons/Info';
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    boton: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    message: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(1),
    }
}))


const ReservasParameters = (props) => {
    const classes = useStyles();
    const [showAlert, setShowAlert] = useState(false);
    const [alertProps, setAlertProps] = useState({});
    const { idComplejo } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    const updateComplejo = (values) => {
        let complejoToUpdate = {
            ...values
        }
        updateComplejoApi(complejoToUpdate, idComplejo).then((response) => {
            if (response.status === "OK") {
                setAlertProps({
                    type: "success",
                    text: response.message,
                });
                setShowAlert(true);
            } else {
                setAlertProps({
                    type: "error",
                    text: response.message,
                });
                setShowAlert(true);
            }
            setIsLoading(false);
        });
    };

    return (
        <>
            <Formik
                initialValues={{
                    duracionTurno: props.parametrosReserva.duracionTurno || ["1", "1:30", "2", "2:30", "3", "3:30"] ,
                    tiempoVencimiento: props.parametrosReserva.tiempoVencimiento || 12,
                    tiempoAntesTurno: props.parametrosReserva.tiempoAntesTurno || 3

                }}
                onSubmit={(values) => {
                    console.log(values.duracionTurno)
                    setIsLoading(true)
                    const valuesToUpdate = {
                        parametrosReserva: {
                            duracionTurno: values.duracionTurno,
                            tiempoAntesTurno: values.tiempoAntesTurno,
                            tiempoVencimiento: values.tiempoVencimiento
                        }
                    }
                    updateComplejo(valuesToUpdate);
                }}>
                {({ values }) => (
                    <Form>
                        <Grid
                            container
                            spacing={3}
                            direction="row"
                            justifyContent="space-around"
                            alignItems="center"
                        >
                            <Grid item md={6} xs={12}>
                                <div style={{
                                    display: 'grid',
                                    placeItems: 'center'
                                }}>
                                    <Typography>
                                        Duración de los turnos:
                                    </Typography>
                                    <div role="group" aria-labelledby="my-radio-group">
                                        <Typography>
                                            <Field type="checkbox" name="duracionTurno" value="1" as={Checkbox} />
                                            1 hora
                                        </Typography>
                                        <Typography>
                                            <Field type="checkbox" name="duracionTurno" value="1:30" as={Checkbox} />
                                            1 hora y 30 minutos
                                        </Typography>
                                        <Typography>
                                            <Field type="checkbox" name="duracionTurno" value="2" as={Checkbox} />
                                            2 horas
                                        </Typography>
                                        <Typography>
                                            <Field type="checkbox" name="duracionTurno" value="2:30" as={Checkbox} />
                                            2 horas y 30 minutos
                                        </Typography>
                                        <Typography>
                                            <Field type="checkbox" name="duracionTurno" value="3" as={Checkbox} />
                                            3 horas
                                        </Typography>
                                        <Typography>
                                            <Field type="checkbox" name="duracionTurno" value="3:30" as={Checkbox} />
                                            3 horas y 30 minutos
                                        </Typography>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item md={3} xs={12}>
                                <div style={{
                                    display: 'flex',
                                    placeItems: 'center'
                                }}>
                                    <Field
                                        name="tiempoVencimiento"
                                        label="Tiempo transcurrido para cancelar si no es Confirmada"
                                        fullWidth
                                        type="number"
                                        as={TextField}
                                        style={{ marginRight: '10px' }}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">horas</InputAdornment>,
                                        }}
                                    />
                                    <Tooltip title="Despues que el cliente realice una reserva y esta no sea CONFIRMADA, se debera cancelar despues de esta cantidad de horas" arrow>
                                        <InfoIcon color="primary" />
                                    </Tooltip>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    placeItems: 'center',
                                    marginTop: '20%'
                                }}>
                                    <Field
                                        name="tiempoAntesTurno"
                                        label="Tiempo minimo antes para realizar una reserva"
                                        fullWidth
                                        type="number"
                                        as={TextField}
                                        style={{ marginRight: '10px' }}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="end">horas</InputAdornment>,
                                        }}

                                    />
                                    <Tooltip title="Cuantas horas antes como minimo podra reservar el cliente antes del comienzo del turno" arrow>
                                        <InfoIcon color="primary" />
                                    </Tooltip>
                                </div>
                            </Grid>
                            <Grid container justify="center">
                                <Button variant="contained"
                                    type="submit"
                                    color="primary"
                                    className={classes.boton}
                                    disabled={isLoading}
                                >{isLoading ? (<CircularProgress />) : ("Actualizar Datos")
                                    }
                                </Button>
                            </Grid>
                            <Grid container justify="center" className={classes.message}>
                                <Alert severity="info">
                                    <AlertTitle>
                                        ¡Recueda que estas configuraciones son validas solo para reservas de la app de RentNow!
                                    </AlertTitle>
                                    Estas configuraciones no afectaran a las reservas que cargues por tu cuenta en el calendario.
                                </Alert>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
            <AlertCustom
                type={alertProps.type}
                text={alertProps.text}
                open={showAlert}
                setOpen={setShowAlert}
            />
        </>
    )
}

export default ReservasParameters
