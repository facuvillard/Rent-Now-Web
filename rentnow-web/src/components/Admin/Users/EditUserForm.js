import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { getProvincesApi, getCitiesByProvincesApi } from "../../../api/geoApi";
import { editUserApi } from "../../../api/usuarios";
import { ADMIN_APP, ADMIN_COMPLEJO } from "../../../constants/auth/roles";

export default function EditUserForm(props) {
  const {
    setOpen,
    user,
    userId,
    setReload,
    setAlertCustomOpen,
    setAlertCustomType,
    setAlertCustomText,
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [provinces, setProvinces] = useState();
  const [cities, setCities] = useState([]);
  const [userData, setUserData] = useState({
    nombres: user.nombres,
    apellidos: user.apellidos,
    email: user.email,
    roles: user.roles,
    nroTelefono: user.nroTelefono,
    provincia: user.provincia,
    ciudad: user.ciudad,
    direccion: user.direccion,
  });

  useEffect(() => {
    setIsLoading(true);
    getProvincesApi().then((response) => {
      setProvinces(response.provincias);
    });
    getCitiesByProvincesApi(user.provincia, user.ciudad).then((response) => {
      setCities(response.localidades);
      setIsLoading(false);
    });
  }, []);

  const validateUserData = (e) => {
    if (
      userData.nombres === "" ||
      userData.apellidos === "" ||
      userData.email === "" ||
      userData.roles === [] ||
      userData.nroTelefono === "" ||
      userData.provincia === "" ||
      userData.ciudad === "" ||
      userData.direccion === ""
    ) {
      setAlertCustomText("Todos los campos son obligatorios.");
      setAlertCustomType("error");
      setAlertCustomOpen(true);
      return false;
    }
    return true;
  };

  const handleCityTextField = async (e) => {
    if (e.target.value.length > 3) {
      await getCitiesByProvincesApi(userData.provincia, e.target.value).then(
        (response) => {
          setCities(response.localidades);
        }
      );
    } else {
      setCities([]);
    }
  };
  const handleEditUser = (e) => {
    e.preventDefault();
    if (!validateUserData()) return;
    setIsLoading(true);
    consumeEditApi().then(() => {
      setIsLoading(false);
    });
  };

  const consumeEditApi = async () => {
    const result = await editUserApi(userData, userId);
    if (result.status === "OK") {
      setAlertCustomText(result.message);
      setAlertCustomType("success");
      setAlertCustomOpen(true);
      setReload(true);
      setOpen(false);
    } else {
      setAlertCustomText(result.message);
      setAlertCustomType("error");
      setAlertCustomOpen(true);
    }
  };

  return (
    <>
      {isLoading ? (
        <Grid container justify="center">
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : (
        <form onSubmitCapture={handleEditUser}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                fullWidth
                label="Nombres"
                defaultValue={user.nombres}
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
                defaultValue={user.apellidos}
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
                defaultValue={user.email}
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
                defaultValue={user.roles[0]}
                onChange={(e) => {
                  setUserData({ ...userData, roles: [e.target.value] });
                }}
              >
                <MenuItem value={ADMIN_APP}>Administrador</MenuItem>
                <MenuItem value={ADMIN_COMPLEJO}>Adm. Complejos</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                label="Numero de Telefono"
                defaultValue={user.nroTelefono}
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
                  setUserData({ ...userData, provincia: e.target.value, ciudad: "" });
                }}
                defaultValue={user.provincia}
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
                disabled={userData.provincia ? false : true}
                options={cities}
                getOptionLabel={(option) => option.nombre}
                defaultValue={
                  cities.find((city) => city.nombre === user.ciudad) || {}
                }
                inputValue={userData.ciudad}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Ciudad"
                    variant="outlined"
                    onChange={handleCityTextField}
                  />
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
                defaultValue={user.direccion}
                onChange={(e) => {
                  setUserData({ ...userData, direccion: e.target.value });
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
                Editar
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
    </>
  );
}
