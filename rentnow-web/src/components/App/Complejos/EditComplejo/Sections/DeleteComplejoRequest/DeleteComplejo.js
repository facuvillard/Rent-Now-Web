import React, { useState, useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, CircularProgress } from "@material-ui/core";
import * as Routes from "constants/routes"
import AlertCustom from "components/utils/AlertCustom/AlertCustom";
import Dialog from "components/utils/Dialog/Dialog";
import DeleteComplejoModal from 'components/App/Complejos/EditComplejo/Sections/DeleteComplejoRequest/DeleteComplejoModal'
import { useParams } from "react-router-dom";
import { sendEmailApi } from "api/misc";
import { AuthContext } from "Auth/Auth";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    paragraph: {
        marginBottom: theme.spacing(2),
    },
    imageUploader: {
        marginTop: theme.spacing(3),
    },
}));

const DeleteComplejo = (props) => {
    const classes = useStyles();

    const [isLoading, setIsLoading] = useState(false);

    const [alertCustomOpen, setAlertCustomOpen] = useState(false);
    const [alertCustomType, setAlertCustomType] = useState();
    const [alertCustomText, setAlertCustomText] = useState();

    const [dialogContent, setDialogContent] = useState(null);
    const [open, setOpen] = useState(false);

    const { idComplejo } = useParams();
    const { currentUser } = useContext(AuthContext);
    const emailUser = currentUser.email;
    const nombreComplejo = props.complejo.nombre;
    const telefonoComplejo = props.complejo.telefono;
    const emailComplejo = props.complejo.email;

    const [sent, setSent] = useState(false);

    const deleteHandler = async (data) => {
        setIsLoading(true);
        const mensaje = {
            idComplejo,
            nombreComplejo,
            telefonoComplejo,
            emailComplejo,
            data,
            emailUser
        }
        const formatedData = {
            destinatario: "juanpbergues@gmail.com",
            asunto: "Baja de Complejo",
            contenido: JSON.stringify(mensaje),
            adjuntos: null,
        };
        const result = await sendEmailApi(formatedData);
        if (result.status === "OK") {
            setAlertCustomText("Solicitud de Baja enviada con éxito");
            setAlertCustomType("success");
            setAlertCustomOpen(true);
            setSent(true);
        } else {
            setAlertCustomText(result.message);
            setAlertCustomType("error");
            setAlertCustomOpen(true);
        }
        setIsLoading(false);
    };

    const deleteDialogHandler = () => {
        setDialogContent(
            <DeleteComplejoModal
                text="Ingrese un motivo por el cual desea dar la baja del complejo: "
                setOpen={setOpen}
                deleteHandler={(data) => {
                    deleteHandler(data);
                }}
            />
        );
        setOpen(true);
    };

    if (sent) {
        return (
            <Grid container justify="center" className={classes.imageUploader}>
                <Alert severity="info">
                    <AlertTitle>
                        ¡Solicitud de Baja iniciada con éxito!
              </AlertTitle>
              Espera que el equipo de RentNow evalue la solicitud y efectivice la baja entre 24 y 48 horas.
            </Alert>
            </Grid>
        )
    }

    return (
        <>
            {isLoading ?
                (
                    <Grid container justify="center" >
                        <Grid item>
                            <CircularProgress />
                        </Grid>
                    </Grid>
                ) : (
                    <>
                        <Grid item xs={12}>
                            <Typography className={classes.paragraph}>
                                Aquí podras solicitar la baja de este complejo. Si das de baja tu complejo, este pasará a estado <b>Deshabilitado</b> y no se podrá acceder ni efectuar reservas en el mismo.
            </Typography>
                            <Typography className={classes.paragraph}>
                                Esta baja se concretará efectivamente entre 24 y 48 horas, y las reservas en curso para este complejo seran canceladas.
            </Typography>
                            <Typography className={classes.paragraph}>
                                En el caso de quieras volver a habilitarlo, deberas comunicarte con el equipo de RentNow en el apartado de <b>Contactanos</b> de la <a href={Routes.LANDING}>pagina principal</a> solicitando que tu complejo sea habilitado nuevamente.
            </Typography>
                        </Grid>
                        <Grid container justify="center">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={(_) => {
                                    deleteDialogHandler();
                                }}
                            >
                                Solicitar Baja
            </Button>
                        </Grid>
                    </>
                )
            }
            <Dialog
                title="¿Está seguro que desea solicitar la baja de su complejo?"
                open={open}
                setOpen={setOpen}
                size="md"
            >
                {dialogContent}
            </Dialog>
            <AlertCustom
                type={alertCustomType}
                text={alertCustomText}
                open={alertCustomOpen}
                setOpen={setAlertCustomOpen}
            />
        </>
    )
}

export default DeleteComplejo
