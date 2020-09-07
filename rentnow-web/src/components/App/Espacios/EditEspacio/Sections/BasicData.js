import React, { useState } from "react";
import {
  Grid,
  TextField,
  Button,
  CircularProgress,
  MenuItem,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import { updateEspacioApi } from "api/espacios";
import AlertCustom from "components/utils/AlertCustom/AlertCustom";
import { makeStyles } from "@material-ui/core/styles";
import {
  tiposEspacio,
  estados,
  tiposPiso,
  infraestructuras,
} from "constants/espacios/constants";

const useStyles = makeStyles((theme) => ({
  boton: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
}));

export default function BasicData(props) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlertProps] = useState({});

  const updateEspacio = (values) => {
    let espacioToUpdate = {
      ...values,
    };
    updateEspacioApi(espacioToUpdate, props.espacio.id).then((response) => {
      if (response.status === "OK") {
        setAlertProps({
          type: "success",
          text: response.message,
        });
        setShowAlert(true);
      } else {
        setAlertProps({
          type: "error",
          text: response.message,
        });
        setShowAlert(true);
      }
      setIsLoading(false);
    });
  };
  return (
    <>
      <Formik
        initialValues={{
          nombre: props.espacio.nombre,
          tipoEspacio: props.espacio.tipoEspacio,
          capacidad: props.espacio.capacidad,
          tipoPiso: props.espacio.tipoPiso,
          horaDesde: props.espacio.horaDesde,
          horaHasta: props.espacio.horaHasta,
          estado: props.espacio.estado,
          infraestructura: props.espacio.infraestructura,
          descripcion: props.espacio.descripcion,
        }}
        onSubmit={(values) => {
          setIsLoading(true);
          updateEspacio(values);
        }}
      >
        {({ values, handleChange }) => (
          <Form>
            <Grid container spacing={6}>
              <Grid item xs={6}>
                <TextField
                  name="nombre"
                  label="Nombre*"
                  fullWidth
                  value={values.nombre}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  name="tipoEspacio"
                  label="Tipo de espacio*"
                  fullWidth
                  value={values.tipoEspacio}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  {tiposEspacio.map((tipo) => (
                    <MenuItem key={tipo} value={tipo}>
                      {tipo}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="capacidad"
                  type="number"
                  label="Capacidad*"
                  fullWidth
                  value={values.capacidad}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="tipoPiso"
                  select
                  fullWidth
                  label="Tipo de piso*"
                  value={values.tipoPiso}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  {tiposPiso.map((tipo) => (
                    <MenuItem key={tipo} value={tipo}>
                      {tipo}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  name="horaDesde"
                  type="time"
                  label="Hora Desde*"
                  value={values.horaDesde}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <TextField
                  name="horaHasta"
                  type="time"
                  label="Hora Hasta*"
                  value={values.horaHasta}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="estado"
                  select
                  fullWidth
                  label="Estado*"
                  value={values.estado}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  {estados.map((estado) => (
                    <MenuItem key={estado} value={estado}>
                      {estado}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="infraestructura"
                  select
                  fullWidth
                  label="Infraestructura*"
                  value={values.infraestructura}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  {infraestructuras.map((infra) => (
                    <MenuItem key={infra} value={infra}>
                      {infra}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="descripcion"
                  multiline
                  rows={3}
                  fullWidth
                  label="Descripción de prestaciones"
                  value={values.descripcion}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              </Grid>
              <Grid container justify="center">
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  className={classes.boton}
                  disabled={isLoading}
                >
                  {isLoading ? <CircularProgress /> : "Actualizar Datos"}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <AlertCustom
        type={alertProps.type}
        text={alertProps.text}
        open={showAlert}
        setOpen={setShowAlert}
      />
    </>
  );
}
