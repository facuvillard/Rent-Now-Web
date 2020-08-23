import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
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
import DeleteIcon from '@material-ui/icons/Delete';
import { ImageUploader } from 'components/App/Complejos/RegisterComplejo/Steps/Fotos/ImageUploader';
import { useParams } from "react-router-dom"
import { updateComplejoApi } from 'api/complejos'
import { Alert, AlertTitle } from "@material-ui/lab";


const useStyles = makeStyles((theme) => ({
    container: {
        marginBottom: theme.spacing(2),
    },
    imageUploader: {
        marginTop: theme.spacing(3),
    }
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
    const getUrls = React.useCallback((urls) => {
        setFotos((old) => {
            const newFotos = [...old, ...urls]
            updateComplejoApi({ fotos: newFotos }, idComplejo)
            return (newFotos)
        })
    }, [])
    useEffect(() => {
        setFotos(() => ([...props.fotos]))
    }, [props.fotos])

    return (
        <Grid container spacing={1} className={classes.container}>
            <Carousel
                dots
                arrowLeft={<Arrow back cssColor="black" />}
                arrowLeftDisabled={<Arrow back cssColor="grey" />}
                arrowRight={<Arrow cssColor="black" />}
                arrowRightDisabled={<Arrow cssColor="grey" />}
                addArrowClickHandler
            >
                {fotos.map((foto) => (
                    <Grid container
                        direction="column"
                        justify="center"
                        alignItems="center"
                        key={foto}
                    >
                        <Grid item xs={12} sm={6}>
                            <Card>
                                <CardActionArea href={foto} target="_blank">
                                    <CardMedia component="img" height={400} image={foto} />
                                </CardActionArea>
                            </Card>
                        </Grid>
                        <Grid item xs={12}>
                            <IconButton aria-label="delete" color="secondary" title="Eliminar Imagen">
                                <DeleteIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                ))}
            </ Carousel>
            {fotos.length >= 5 ? (
                <Grid
                    container
                    justify="center"
                    className={classes.imageUploader}
                >
                    <Alert severity="info">
                        <AlertTitle>¡Ya tienes demasiadas fotos registradas! No podrás subir ninguna más</AlertTitle>
                                        Elimina alguna/s si quieres seguir subiendo mas cantidad
                                        </Alert>
                </Grid>
            ) : (
                    <Grid item xs={12}>
                        <ImageUploader maxFiles={ 5 - fotos.length } className={classes.imageUploader} url={`complejos/${idComplejo}/imagenes-complejo`} getUrls={getUrls} />
                    </Grid>
                )}
        </ Grid>
    )
}

export default ImageVisualizer;