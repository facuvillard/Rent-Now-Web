import React, { useState, useEffect } from "react";
import { Grid, TextField, MenuItem, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { getProvincesApi, getCitiesByProvincesApi } from "../../../Api/GeoApi";

export default function RegisterUserForm(props) {
  const { setOpen } = props;
  const [provinces, setProvinces] = useState();
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getProvincesApi().then((response) => {
      setProvinces(response.provincias);
    });
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();
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
          <TextField variant="outlined" fullWidth label="Nombres" />
        </Grid>
        <Grid item xs={6}>
          <TextField variant="outlined" fullWidth label="Apellidos" />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField variant="outlined" fullWidth label="Email" />
        </Grid>
        <Grid item xs={6}>
          <TextField variant="outlined" label="Rol" select fullWidth>
            <MenuItem value="1">Administrador</MenuItem>
            <MenuItem value="2">Adm. Complejos</MenuItem>
          </TextField>
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
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField variant="outlined" fullWidth label="Dirección" />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            type="password"
            variant="outlined"
            fullWidth
            label="Contraseña"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="password"
            variant="outlined"
            fullWidth
            label="Repetir contraseña"
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
