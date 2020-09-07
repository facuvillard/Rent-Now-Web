import React, { useState, useEffect } from "react";
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
import { getEspacioById } from "api/espacios";
import {
  tiposEspacio,
  estados,
  tiposPiso,
  infraestructuras,
} from "constants/espacios/constants";
import { ImageUploader } from "components/App/Complejos/RegisterComplejo/Steps/Fotos/ImageUploader";

export default function ModificarEspacio() {
  const { idComplejo, idEspacio } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);
  const [contentAlert, setContentAlert] = useState("");
  const [severityAlert, setSeverityAlert] = useState("");
  const [espacio, setEspacio] = useState({});
  const [foto, setFoto] = useState(espacio.foto)

  useEffect(() => {
    getEspacioById(idEspacio).then((resp) => {
      if (resp.status === "OK") {
        setEspacio(resp.data);
        setIsLoading(false);
        console.log(resp.data);
      }
    });
  }, [idEspacio]);

  const getUrls = React.useCallback((urls) => {
    setFoto(urls);
  }, []);

  const modificarEspacio = (data) => {
    console.log(data);
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
            nombre: espacio.nombre,
            tipoEspacio: espacio.tipoEspacio,
            capacidad: espacio.capacidad,
            tipoPiso: espacio.tipoPiso,
            horaDesde: espacio.horaDesde,
            horaHasta: espacio.horaHasta,
            estado: espacio.estado,
            infraestructura: espacio.infraestructura,
            descripcion: espacio.descripcion,
          }}
          onSubmit={(values) => {
            modificarEspacio({ ...values });
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
                <Grid item xs={12}>
                  <ImageUploader
                    maxFiles={1 - espacio.foto.lenght }
                    url={`espacios/${espacio.id}/imagen-espacio`}
                    getUrls={getUrls}
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
                    Guardar
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
