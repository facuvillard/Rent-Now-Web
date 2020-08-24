import React from "react";
import {
  Typography,
  Grid,
  TextField,
  MenuItem,
  Button,
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const tiposEspacios = [
  "Cancha Futbol",
  "Cancha Basquet",
  "Cancha Handball",
  "Cancha Tenis",
  "Cancha Paddle",
  "Cancha Hockey",
  "Quincho",
  "Asador",
];
const tiposPisos = [
  "Parqué",
  "Cesped natural",
  "Cesped sintetico",
  "Cemento",
  "Polvo de ladrillo",
  "Tierra",
];
const infraEstructura = ["Abierta con luz", "Abierta sin luz", "Techada"];
const estados = ["En reparación", "Disponible"];

export default function RegisterEspacios() {
  return (
    <Formik
      initialValues={{
        nombre: "",
        tipoEspacio: "",
        capacidad: "",
        tipoPiso: "",
        horaDesde: "",
        horaHasta: "",
        estado: "",
        infraestructura: "",
        descripcion: "",
      }}
    >
      <Form>
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <Field name="nombre" label="Nombre*" fullWidth as={TextField} />
          </Grid>
          <Grid item xs={6}>
            <Field
              component={TextField}
              select
              fullWidth
              label="Tipo de espacio*"
              name="tipoEspacio"
            >
              {tiposEspacios.map((tipo) => (
                <MenuItem key={tipo} value={tipo}>
                  {tipo}
                </MenuItem>
              ))}
            </Field>
          </Grid>
          <Grid item xs={6}>
            <Field
              name="capacidad"
              label="Capacidad (personas)*"
              fullWidth
              as={TextField}
            />
          </Grid>
          <Grid item xs={6}>
            <Field
              component={TextField}
              select
              fullWidth
              label="Tipo de piso*"
              name="tipoPiso"
            >
              {tiposPisos.map((tipo) => (
                <MenuItem key={tipo} value={tipo}>
                  {tipo}
                </MenuItem>
              ))}
            </Field>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Field
              component={TextField}
              type="time"
              label="Desde*"
              defaultValue="07:30"
              name="horaHasta"
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <Field
              component={TextField}
              type="time"
              label="Hasta*"
              defaultValue="20:00"
              name="horaHasta"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Field
              component={TextField}
              select
              fullWidth
              label="Estado*"
              name="estado"
            >
              {estados.map((estado) => (
                <MenuItem key={estado} value={estado}>
                  {estado}
                </MenuItem>
              ))}
            </Field>
          </Grid>
          <Grid item xs={6}>
            <Field
              component={TextField}
              select
              fullWidth
              label="Infraestructura*"
              name="infraestructura"
            >
              {estados.map((estado) => (
                <MenuItem key={estado} value={estado}>
                  {estado}
                </MenuItem>
              ))}
            </Field>
          </Grid>
          <Grid item xs={6}>
            <Field
              component={TextField}
              multiline
              rows={3}
              fullWidth
              label="Descripción de prestaciones"
              name="descripcion"
            />
          </Grid>
          <Grid container direction="row" justify="center" alignItems="center">
            <Button
              startIcon={<ArrowBackIcon />}
              variant="contained"
              color="primary"
            >
              Volver
            </Button>
            <Button variant="contained" color="primary">
              Guardar
            </Button>
            <Button variant="contained" color="primary">
              Guardar y registrar
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
}
