import React from 'react'
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { GOOGLE_MAP_KEY } from "constants/apiKeys";
import { Marker } from "@react-google-maps/api";
import { Grid } from "@material-ui/core";

const Location = (props) => {
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
        <Grid container justify="center">
            <Grid item xs={10}>
                <LoadScript googleMapsApiKey={GOOGLE_MAP_KEY}>
                    <GoogleMap mapContainerStyle={style} center={geoPoint} zoom={18}>
                        <Marker key="1" position={geoPoint} />
                    </GoogleMap>
                </LoadScript>
            </Grid>
        </Grid>
    )
}

export default Location