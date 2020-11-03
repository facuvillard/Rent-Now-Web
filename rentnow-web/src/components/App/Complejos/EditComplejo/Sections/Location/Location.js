import React from 'react'
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { GOOGLE_MAP_KEY } from "constants/apiKeys";
import { Marker } from "@react-google-maps/api";
import { Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
    alert: {
        marginTop: theme.spacing(3),
    },
}));

const Location = (props) => {
    const classes = useStyles();
    const { complejo } = props;
    const geoPoint = {
        lat: complejo.latitud,
        lng: complejo.longitud,
    };
    const style = {
        width: "100%",
        height: "300px",
    };
    return (
        <>
            <Grid container justify="center" spacing={2}>
                <Grid item xs={10}>
                    <LoadScript googleMapsApiKey={GOOGLE_MAP_KEY}>
                        <GoogleMap mapContainerStyle={style} center={geoPoint} zoom={18}>
                            <Marker key="1" position={geoPoint} />
                        </GoogleMap>
                    </LoadScript>
                </Grid>
                <Grid item xs={5}>
                    <TextField disabled id="provincia" label="Provincia" fullWidth margin='normal' value={complejo.provincia} />
                </Grid>
                <Grid item xs={5}>
                    <TextField disabled id="ciudad" label="Ciudad" fullWidth margin='normal' value={complejo.ciudad} />
                </Grid>
                <Grid item xs={4}>
                    <TextField disabled id="calle" label="Calle" fullWidth margin='normal' value={complejo.calle} />
                </Grid>
                <Grid item xs={2}>
                    <TextField disabled id="numero" label="Numero" fullWidth margin='normal' value={complejo.numero} />
                </Grid>
                <Grid item xs={4}>
                    <TextField disabled id="barrio" label="Barrio" fullWidth margin='normal' value={complejo.barrio} />
                </Grid>
            </Grid>
            <Grid container justify="center" className={classes.alert}>
                <Alert severity="info">
                    <AlertTitle>
                        ¡Los datos de Ubicación no pueden ser modificados!
                    </AlertTitle>
                    Comunicate con el equipo de RentNow para poder modificarlos
                </Alert>
            </Grid>
        </>
    )
}

export default Location