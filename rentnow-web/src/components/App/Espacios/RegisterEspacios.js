import React, { useState } from "react";
import {
  Grid,
  TextField,
  MenuItem,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { Formik, Form } from "formik";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useParams } from "react-router-dom";
import LinkCustom from "components/utils/LinkCustom/LinkCustom";
import AlertCustom from "components/utils/AlertCustom/AlertCustom";
import { createEspacio } from "api/espacios";

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
const infraestructuras = ["Abierta con luz", "Abierta sin luz", "Techada"];
const estados = ["En reparación", "Disponible"];

export default function RegisterEspacios() {
  const { idComplejo } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [contentAlert, setContentAlert] = useState("");
  const [severityAlert, setSeverityAlert] = useState("");

  const registrarEspacio = (espacio) => {
    if (
      !espacio.nombre ||
      !espacio.tipoEspacio ||
      !espacio.capacidad ||
      !espacio.tipoPiso ||
      !espacio.infraestructura ||
      !espacio.estado ||
      !espacio.horaDesde ||
      !espacio.horaHasta
    ) {
      setIsLoading(false);
      setContentAlert("Faltan datos obligatorios!");
      setSeverityAlert("warning");
      setOpenAlert(true);
    } else {
      setIsLoading(true);
      createEspacio({ ...espacio, idComplejo: idComplejo }).then((response) => {
        if (response.status === "OK") {
          setIsLoading(false);
          setContentAlert("El espacio ha sido registrado con éxito");
          setSeverityAlert("success");
          setOpenAlert(true);
        } else {
          setIsLoading(false);
          setContentAlert("Error al registrar espacio");
          setSeverityAlert("error");
          setOpenAlert(true);
        }
      });
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
        <Formik
          initialValues={{
            nombre: "",
            tipoEspacio: "",
            capacidad: "",
            tipoPiso: "",
            horaDesde: "07:00",
            horaHasta: "22:00",
            estado: "",
            infraestructura: "",
            descripcion: "",
          }}
          onSubmit={(values) => {
            registrarEspacio({ ...values });
          }}
        >
          {({ values, handleChange }) => (
            <Form>
              <Grid container spacing={6}>
                <Grid item xs={6}>
                  <TextField
                    required
                    name="nombre"
                    label="Nombre"
                    fullWidth
                    value={values.Nombre}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    select
                    name="tipoEspacio"
                    label="Tipo de espacio"
                    fullWidth
                    value={values.tipoEspacio}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    {tiposEspacios.map((tipo) => (
                      <MenuItem key={tipo} value={tipo}>
                        {tipo}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    name="capacidad"
                    type="number"
                    label="Capacidad (personas)"
                    fullWidth
                    values={values.capacidad}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    name="tipoPiso"
                    select
                    fullWidth
                    label="Tipo de piso"
                    value={values.tipoPiso}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    {tiposPisos.map((tipo) => (
                      <MenuItem key={tipo} value={tipo}>
                        {tipo}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    required
                    name="horaDesde"
                    type="time"
                    label="Hora Desde"
                    value={values.horaDesde}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField
                    required
                    name="horaHasta"
                    type="time"
                    label="Hora Hasta"
                    value={values.horaHasta}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    name="estado"
                    select
                    fullWidth
                    label="Estado"
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
                    required
                    name="infraestructura"
                    select
                    fullWidth
                    label="Infraestructura"
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
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                >
                  <LinkCustom to={"/app/complejos/" + idComplejo + "/espacios"}>
                    <Button
                      startIcon={<ArrowBackIcon />}
                      variant="contained"
                      color="primary"
                      style={{ margin: "10px" }}
                    >
                      Volver
                    </Button>
                  </LinkCustom>
                  <Button
                    style={{ margin: "10px" }}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Registrar
                  </Button>
                  <Button
                    style={{ margin: "10px" }}
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Registrar y continuar
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      )}
      <AlertCustom
        type={severityAlert}
        text={contentAlert}
        open={openAlert}
        setOpen={setOpenAlert}
      />
    </>
  );
}
