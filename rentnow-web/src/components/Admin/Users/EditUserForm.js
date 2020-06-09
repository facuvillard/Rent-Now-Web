import React, { useState, useEffect } from "react";
import { Grid, TextField, MenuItem, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { getProvincesApi, getCitiesByProvincesApi } from "../../../Api/GeoApi";

export default function EditUserForm(props) {
  const { setOpen, editUser } = props;
  const [provinces, setProvinces] = useState();
  const [cities, setCities] = useState([]);
  const [userData, setUserData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    rol: "",
    nroTelefono: "",
    provincia: "",
    ciudad: "",
    direccion: "",
    contraseña: "",
    repetirContraseña: "",
  });

  useEffect(() => {
    getProvincesApi().then((response) => {
      setProvinces(response.provincias);
    });
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();
    console.log(userData);
  };

  const handleProvince = (provinceName) => {
    if (provinceName) {
      getCitiesByProvincesApi(provinceName).then((response) => {
        setCities(response.localidades);
      });
    } else {
      setCities([]);
    }
  };

  return (
    <form onSubmitCapture={handleAddUser}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            fullWidth
            label="Nombres"
            onChange={(e) => {
              setUserData({ ...userData, nombres: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            fullWidth
            label="Apellidos"
            onChange={(e) => {
              setUserData({ ...userData, apellidos: e.target.value });
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            type="email"
            variant="outlined"
            fullWidth
            label="Email"
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Rol"
            select
            fullWidth
            onChange={(e) => {
              setUserData({ ...userData, rol: e.target.value });
            }}
          >
            <MenuItem value="Administrador">Administrador</MenuItem>
            <MenuItem value="Adm. Complejos">Adm. Complejos</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Numero de Telefono"
            onChange={(e) => {
              setUserData({ ...userData, nroTelefono: e.target.value });
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Provincia"
            select
            fullWidth
            onChange={(e) => {
              handleProvince(e.target.value);
              setUserData({ ...userData, provincia: e.target.value });
            }}
          >
            {provinces !== undefined ? (
              provinces.map((province) => (
                <MenuItem key={province.id} value={province.nombre}>
                  {province.nombre}
                </MenuItem>
              ))
            ) : (
              <MenuItem value="">Ninguna</MenuItem>
            )}
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            disabled={cities.length === 0 ? true : false}
            options={cities}
            getOptionLabel={(option) => option.nombre}
            renderInput={(params) => (
              <TextField {...params} label="Ciudad" variant="outlined" />
            )}
            onInputChange={(e, inputValue) => {
              setUserData({ ...userData, ciudad: inputValue });
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            fullWidth
            label="Dirección"
            onChange={(e) => {
              setUserData({ ...userData, direccion: e.target.value });
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            type="password"
            variant="outlined"
            fullWidth
            label="Contraseña"
            onChange={(e) => {
              setUserData({ ...userData, contraseña: e.target.value });
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="password"
            variant="outlined"
            fullWidth
            label="Repetir contraseña"
            onChange={(e) => {
              setUserData({ ...userData, repetirContraseña: e.target.value });
            }}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button variant="contained" fullWidth type="submit" color="primary">
            Agregar
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            variant="contained"
            fullWidth
            color="secondary"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancelar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
