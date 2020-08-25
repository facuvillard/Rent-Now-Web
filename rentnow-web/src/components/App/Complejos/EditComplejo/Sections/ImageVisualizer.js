import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Grid,
    Card,
    CardActionArea,
    CardMedia,
    IconButton,
} from "@material-ui/core";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import DeleteIcon from "@material-ui/icons/Delete";
import { ImageUploader } from "components/App/Complejos/RegisterComplejo/Steps/Fotos/ImageUploader";
import { useParams } from "react-router-dom";
import { updateComplejoApi } from "api/complejos";
import { Alert, AlertTitle } from "@material-ui/lab";
import Dialog from "components/utils/Dialog/Dialog";
import DeleteComplejoImage from "components/App/Complejos/EditComplejo/Sections/DeleteComplejoImage";
import AlertCustom from "components/utils/AlertCustom/AlertCustom";
import uuid from "react-uuid";

const useStyles = makeStyles((theme) => ({
    container: {
        marginBottom: theme.spacing(2),
    },
    imageUploader: {
        marginTop: theme.spacing(3),
    },
}));

const Arrow = function (props) {
    return (
        <IconButton>
            {props.back ? (
                <ArrowBackIcon style={{ color: props.cssColor }} />
            ) : (
                    <ArrowForwardIcon style={{ color: props.cssColor }} />
                )}
        </IconButton>
    );
};

const ImageVisualizer = (props) => {
    const classes = useStyles();
    const [fotos, setFotos] = useState([]);
    const { idComplejo } = useParams();
    const [dialogContent, setDialogContent] = useState(null);

    const [alertCustomOpen, setAlertCustomOpen] = useState(false);
    const [alertCustomType, setAlertCustomType] = useState();
    const [alertCustomText, setAlertCustomText] = useState();

    const [open, setOpen] = useState(false);

    const getUrls = React.useCallback((urls) => {
        setFotos((old) => {
            const newFotos = [...old, ...urls];
            handleComplejoImageUpdate(newFotos);
            return newFotos;
        });
    }, []);

    useEffect(() => {
        setFotos(() => [...props.fotos]);
    }, [props.fotos]);

    const handleComplejoImageUpdate = async (fotosToSave) => {
        // setIsLoading(true);
        const result = await updateComplejoApi(
            { fotos: fotosToSave },
            idComplejo
        );
        // setIsLoading(false);
        if (result.status === "OK") {
            setAlertCustomText(result.message);
            setAlertCustomType("success");
            setAlertCustomOpen(true);
            setOpen(false);
        } else {
            setAlertCustomText(result.message);
            setAlertCustomType("error");
            setAlertCustomOpen(true);
        }
    };


    const deleteHandler = (index) => {
        const newFotos = [...fotos];
        newFotos.splice(index, 1);
        handleComplejoImageUpdate(newFotos);
        setFotos(newFotos);
    };

    const deleteDialogHandler = (index) => {
        setDialogContent(
            <DeleteComplejoImage
                setOpen={setOpen}
                deleteHandler={() => {
                    deleteHandler(index);
                }}
            />
        );
        setOpen(true);
    };

    return (
        <>
            <Grid container spacing={1} className={classes.container}>
                <Carousel
                    dots
                    arrowLeft={<Arrow back cssColor="black" />}
                    arrowLeftDisabled={<Arrow back cssColor="grey" />}
                    arrowRight={<Arrow cssColor="black" />}
                    arrowRightDisabled={<Arrow cssColor="grey" />}
                    addArrowClickHandler
                >
                    {fotos.map((foto, index) => (
                        <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                            key={uuid()}
                        >
                            <Grid item xs={12} sm={6}>
                                <Card>
                                    <CardActionArea href={foto} target="_blank">
                                        <CardMedia component="img" height={400} image={foto} />
                                    </CardActionArea>
                                </Card>
                            </Grid>
                            {fotos.length === 1 ? null : (
                                <Grid item xs={12}>
                                    <IconButton
                                        aria-label="delete"
                                        color="secondary"
                                        title="Eliminar Imagen"
                                        onClick={(_) => {
                                            deleteDialogHandler(index);
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                            )}
                        </Grid>
                    ))}
                </Carousel>
                {fotos.length >= 5 ? (
                    <Grid container justify="center" className={classes.imageUploader}>
                        <Alert severity="info">
                            <AlertTitle>
                                ¡Ya tienes demasiadas fotos registradas! No podrás subir ninguna
                                más
              </AlertTitle>
              Elimina alguna/s si quieres seguir subiendo mas cantidad
            </Alert>
                    </Grid>
                ) : (
                        <Grid item xs={12}>
                            <ImageUploader
                                maxFiles={5 - fotos.length}
                                className={classes.imageUploader}
                                url={`complejos/${idComplejo}/imagenes-complejo`}
                                getUrls={getUrls}
                            />
                        </Grid>
                    )}
            </Grid>
            <Dialog
                title="¿Esta seguro que desea eliminar foto seleccionada?"
                open={open}
                setOpen={setOpen}
                size="sm"
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
    );
};

export default ImageVisualizer;