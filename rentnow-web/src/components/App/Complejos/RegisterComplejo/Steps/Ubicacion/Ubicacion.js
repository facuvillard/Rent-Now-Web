import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { GOOGLE_MAP_KEY } from "constants/apiKeys";
import { Marker } from "@react-google-maps/api";
import { useFormikContext } from "formik";
import firebase from "firebase";
import {
  TextField,
  Grid,
  Select,
  FormControl,
  InputLabel,
  Typography,
  MenuItem
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { getProvincesApi, getCitiesByProvincesApi } from "api/geoApi";
import { Field } from "formik";

const Ubicacion = ({errors, touched}) => {
  const [center, setCenter] = useState({});
  const [markerPosition, setMarkerPosition] = useState(null);
  const { setFieldValue } = useFormikContext();
  const [provincias, setProvincias] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [ciudad, setCiudad] = useState("");
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("")
  const [provincia, setProvincia] = useState("")

  useEffect(() => {
    if (markerPosition) {
      const geopoint = new firebase.firestore.GeoPoint(
        markerPosition.lat,
        markerPosition.lng
      );
      setFieldValue("ubicacion.latlng", geopoint);
    }
  }, [markerPosition]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setMarkerPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    async function fetchProvinces() {
      try {
        const result = await getProvincesApi();
        if (result.provincias) {
          setProvincias(result.provincias);
        } else {
          return null;
        }
      } catch (err) {
        alert("se produjo un error");
        return [];
      }
    }
    fetchProvinces();
  }, []);

  const containerStyle = {
    width: "100%",
    height: "25vh",
  };

  const centerPlaHolder = {
    lat: -3.745,
    lng: -38.523,
  };

  const onClickMapHandler = (e) => {
    setMarkerPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
  };

  const handleCitiesChange = async (city, province) => {
   setCiudad(city);

    if (city.length < 3) {
      return;
    }
    try {
      const result = await getCitiesByProvincesApi(province, city);
      if (result.localidades) {
        const localidadesNames = result.localidades.map(
          (localidad) => localidad.nombre
        );
        setCiudades(["",...localidadesNames]);
      }
    } catch (err) {
      alert("hubo un error");
    }
  };



  return (
    <Grid container spacing={3} style={{ marginBottom: "3vh" }}>
      <Grid item xs={12}>
        <Typography variant="h4" marked="center" align="center" component="h2">
          Ubicación
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <LoadScript googleMapsApiKey={GOOGLE_MAP_KEY}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center || centerPlaHolder}
            zoom={12}
            onClick={onClickMapHandler}
          >
            <Marker position={markerPosition} />
          </GoogleMap>
        </LoadScript>
      </Grid>
      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          <InputLabel id="provincia-select-label">Provincia</InputLabel>
          
          <Select
            required
            labelId="provincia-select-label"
            name="ubicacion.provincia"
            value={provincia}
            onChange={(e) => {
              setCiudadSeleccionada("")
              setCiudad("")
              setFieldValue("ubicacion.ciudad", "");
              setCiudades([])
              setFieldValue("ubicacion.provincia", e.target.value);
              setProvincia(e.target.value)
            }}
            id="provincia-select"
          >
            {provincias.length > 0
              ? provincias.map((prov) => (
                  <MenuItem key={prov.id} value={prov.nombre}>
                    {prov.nombre}
                  </MenuItem>
                ))
              : null}
          </Select>
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6}>
        <FormControl fullWidth>
          {/* <InputLabel id="ciudad-select-label">Ciudad</InputLabel> */}
          <Autocomplete
            label="Ciudad"
            value={ciudadSeleccionada}
            onChange={(_, newValue) => {
              
              setFieldValue("ubicacion.ciudad", newValue || "");
              setCiudadSeleccionada(newValue || "")
              
            }}
            disabled={provincia === ""}
            inputValue={ciudad}
            onInputChange={(_, value) => {
              handleCitiesChange(value, provincia);
            }}
            name="ciudad"
            options={ciudades}
            renderInput={(params) => (
              <TextField name="ciudad" required label="Ciudad" {...params} />
            )}
          />
        </FormControl>
      </Grid>
      <Grid item xs={9} md={7}>
        <Field
          name="ubicacion.calle"
          label="Calle"
          fullWidth
          error={!!errors.calle && touched.calle}
          helperText={!!touched.calle ? errors.calle : null}
          as={TextField}
        />
      </Grid>
      <Grid item xs={3} md={2}>
        <Field
          name="ubicacion.numero"
          label="Numero"
          fullWidth
          error={!!errors.numero && touched.numero}
          helperText={!!touched.numero ? errors.numero : null}
          as={TextField}
        />
      </Grid>
      <Grid item xs={12} md={3} >
        <Field
          name="ubicacion.barrio"
          label="Barrio"
          fullWidth
          error={!!errors.barrio && touched.barrio}
          helperText={!!touched.barrio ? errors.barrio : null}
          as={TextField}
        /> 
      </Grid>
    </Grid>
  );
};

export default Ubicacion;