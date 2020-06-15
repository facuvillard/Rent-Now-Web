import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  Typography,
  CircularProgress
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { getProvincesApi, getCitiesByProvincesApi } from "../../../api/geoApi";
import { editUserApi } from "../../../api/usuarios";
import AlertCustom from "../../utils/AlertCustom/AlertCustom";

export default function EditUserForm(props) {
  const { setOpen, user, userId } = props;

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
  const [alertCustomOpen, setAlertCustomOpen] = useState(false);
  const [alertCustomType, setAlertCustomType] = useState();
  const [alertCustomText, setAlertCustomText] = useState();

  useEffect(() => {
    setIsLoading(true);
    getCitiesByProvincesApi(user.provincia).then((response) => {
      setCities(response.localidades);
      setIsLoading(false);
    });
    getProvincesApi().then((response) => {
      setProvinces(response.provincias);
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
      userData.direccion === ""
    ) {
      setAlertCustomText("Todos los campos son obligatorios.");
      setAlertCustomType("error");
      setAlertCustomOpen(true);
      return false
    } 
    return true
  };

  const handleProvince = (provinceName) => {
    setCities([]);
    if (provinceName) {
      getCitiesByProvincesApi(provinceName).then((response) => {
        setCities(response.localidades);
      });
    } else {
      setCities([]);
    }
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    if(!validateUserData()) return;
    setIsLoading(true);
    consumeEditApi().then(() => {
      setIsLoading(false)
    })
  }

  const  consumeEditApi = async () => {
    const result = await editUserApi(userData, userId)
    if(result.status === 'OK'){
      setAlertCustomText(result.message);
      setAlertCustomType("success");
      setAlertCustomOpen(true);
    } else {
      setAlertCustomText(result.message);
      setAlertCustomType("error");
      setAlertCustomOpen(true);
    }
  }

  return (
    <>
      {isLoading ? (
      <Grid container justify='center'>
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
                  handleProvince(e.target.value);
                  setUserData({ ...userData, provincia: e.target.value });
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
                disabled={cities.length === 0 ? true : false}
                options={cities}
                getOptionLabel={(option) => option.nombre}
                value={cities.find((city) => city.nombre === user.ciudad) || {}}
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
        
      )
      }
       <AlertCustom
        type={alertCustomType}
        text={alertCustomText}
        open={alertCustomOpen}
        setOpen={setAlertCustomOpen}
      />
    </>
  );
}
