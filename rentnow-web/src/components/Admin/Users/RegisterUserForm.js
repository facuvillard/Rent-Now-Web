import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { getProvincesApi, getCitiesByProvincesApi } from "../../../api/geoApi";
import { createUserApi } from "../../../api/usuarios";
import AlertCustom from "../../utils/AlertCustom/AlertCustom";

export default function RegisterUserForm(props) {
  const { setOpen } = props;
  const [provinces, setProvinces] = useState();
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    roles: [],
    nroTelefono: "",
    provincia: "",
    ciudad: "",
    direccion: "",
    contraseña: "",
    repetirContraseña: "",
  });

  const [alertCustomOpen, setAlertCustomOpen] = useState(false);
  const [alertCustomType, setAlertCustomType] = useState();
  const [alertCustomText, setAlertCustomText] = useState();

  useEffect(() => {
    getProvincesApi().then((response) => {
      setProvinces(response.provincias);
      setIsLoading(true);
    });
  }, []);

  const handleAddUser = (e) => {
    e.preventDefault();
    if (
      userData.nombres === "" ||
      userData.apellidos === "" ||
      userData.email === "" ||
      userData.roles === [] ||
      userData.nroTelefono === "" ||
      userData.provincia === "" ||
      userData.direccion === "" ||
      userData.contraseña === "" ||
      userData.repetirContraseña === ""
    ) {
      setAlertCustomText("Todos los campos son obligatorios.");
      setAlertCustomType("error");
      setAlertCustomOpen(true);
    } else {
      if (userData.contraseña !== userData.repetirContraseña) {
        setAlertCustomText("Has ingresado contraseñas distintas");
        setAlertCustomType("error");
        setAlertCustomOpen(true);
      } else {
        if (userData.contraseña.length < 6) {
          setAlertCustomText("La contraseña debe ser de minimo 6 caracteres");
          setAlertCustomType("error");
          setAlertCustomOpen(true);
        } else {
          delete userData.repetirContraseña;
          createUserApi(userData);
        }
      }
    }
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
    <>
      {!isLoading ? (
        <Typography>Cargando...</Typography>
      ) : (
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
                  setUserData({ ...userData, roles: [e.target.value] });
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
                type="number"
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
                  setUserData({
                    ...userData,
                    repetirContraseña: e.target.value,
                  });
                }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                color="primary"
              >
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
      )}

      <AlertCustom
        type={alertCustomType}
        text={alertCustomText}
        open={alertCustomOpen}
        setOpen={setAlertCustomOpen}
      />
    </>
  );
}
