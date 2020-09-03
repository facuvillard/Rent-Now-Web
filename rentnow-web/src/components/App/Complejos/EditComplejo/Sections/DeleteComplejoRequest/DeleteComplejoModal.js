import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { RadioGroup, Grid, Typography, Button, Radio, TextField } from '@material-ui/core'
import { Formik, Field, Form } from "formik";


const useStyles = makeStyles((theme) => ({
    text: {
        marginBottom: theme.spacing(2),
    },
    grid: {
        marginBottom: theme.spacing(5),
    },
}));

const DeleteComplejoModal = (props) => {
    const classes = useStyles();

    return (
        <>
            <Formik
                initialValues={{
                    motivo: "",
                    descripcion: "",
                }}
                onSubmit={async (values) => {
                    props.deleteHandler(values);
                    props.setOpen(false);
                }}
            >
                {({ values }) => (
                    <Form>
                        <Grid container>
                            <Grid item xs={12} className={classes.grid}>
                                <Typography className={classes.text}>
                                    {props.text}
                                </Typography>
                                <RadioGroup>
                                    <Typography component={'label'} variant={'body1'}>
                                        <Field type="radio" name="motivo" value="Cierre de Complejo" required as={Radio} />
                                    Cierre del complejo
                                    </Typography>
                                    <Typography component={'label'} variant={'body1'}>
                                        <Field type="radio" name="motivo" value="Cambio de direccion" required as={Radio} />
                                    Cambio de dirección del complejo
                                    </Typography>
                                    <Typography component={'label'} variant={'body1'}>
                                        <Field type="radio" name="motivo" value="La aplicacion no es lo que esperaba" required as={Radio} />
                                    La aplicacion no es lo que esperaba
                                    </Typography>
                                    <Typography component={'label'} variant={'body1'}>
                                        <Field type="radio" name="motivo" value="Otro" required as={Radio} />
                                    Otro
                                    </Typography>
                                </RadioGroup>
                                <Field
                                    name="descripcion"
                                    label="Descripción adicional"
                                    fullWidth
                                    multiline
                                    as={TextField}
                                    value={values.descripcion}
                                />
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justify="center"
                                alignItems="center">
                                <Grid item xs={2} >
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                    >
                                        Aceptar
                                </Button>
                                </Grid>
                                <Grid item xs={2}>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            props.setOpen(false);
                                        }}
                                        color="secondary"
                                    >
                                        Cancelar
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


export default DeleteComplejoModal
