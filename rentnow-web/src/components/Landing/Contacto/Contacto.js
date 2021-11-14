import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Typography,
  Grid,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  Button,
  Container,
  CircularProgress,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import imagenFondo from "../../../assets/img/Landing/fondo-image.png";
import { getProvincesApi, getCitiesByProvincesApi } from "../../../api/geoApi";
import { sendEmailApi } from "../../../api/misc";
import { Formik, Form } from "formik";
import AlertCustom from "../../utils/AlertCustom/AlertCustom";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#FAFAFA",
    display: "flex",
    overflow: "hidden",
  },

  container: {
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(15),
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    marginBottom: theme.spacing(5),
  },
  subrayado: {
    height: 5,
    width: 100,
    display: "block",
    margin: `${theme.spacing(1)}px auto 0`,
    background:
      "rgb(255,191,0) linear-gradient(90deg, rgba(255,191,0,0.7517401392111369) 29%, rgba(255,255,191,1) 100%)",
  },
  imagenFondo: {
    pointerEvents: "none",
    position: "absolute",
    top: -180,
    opacity: 0.2,
  },
}));
const Contacto = () => {
  const classes = useStyles();

  const [provincias, setProvincias] = useState([]);
  const [ciudades, setCiudades] = useState([]);
  const [ciudad, setCiudad] = useState("");

  const [alertCustomOpen, setAlertCustomOpen] = useState(false);
  const [alertCustomType, setAlertCustomType] = useState();
  const [alertCustomText, setAlertCustomText] = useState();

  const [sending, setSending] = useState(false);

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

  const handleSendEmail = async (data) => {
    const formatedData = {
      destinatario: "contacto.rentnow@gmail.com",
      asunto: "Contacto rentnow",
      contenido: JSON.stringify(data),
      adjuntos: null,
    };
    const result = await sendEmailApi(formatedData);
    if (result.status === "OK") {
      setAlertCustomText(result.message);
      setAlertCustomType("success");
      setAlertCustomOpen(true);
    } else {
      setAlertCustomText(result.message);
      setAlertCustomType("error");
      setAlertCustomOpen(true);
    }
    setSending(false);
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
        setCiudades(localidadesNames);
      }
    } catch (err) {
      alert("hubo un error");
    }
  };

  return (
    <section id="Contacto" className={classes.root}>
      <Container className={classes.container}>
        <img src={imagenFondo} className={classes.imagenFondo} alt="" />
        <Typography
          variant="h4"
          marked="center"
          align="center"
          className={classes.title}
          component="h2"
        >
          <b>CONTACTATE CON NOSOTROS</b>
          <span className={classes.subrayado} />
        </Typography>
        {/* <Paper className={classes.paper}> */}
        {sending ? (
          <CircularProgress />
        ) : (
          <Formik
            initialValues={{
              nombres: "",
              apellido: "",
              email: "",
              provincia: "",
              ciudad: "",
              mensaje:
                "Buenas tardes, Quiero comenzar a administrar mi complejo con RentNow!",
            }}
            onSubmit={(data) => {
              setSending(true);
              handleSendEmail(data);
            }}
          >
            {({ values, handleChange, handleBlur }) => (
              <Form>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="nombres"
                      label="Nombres"
                      fullWidth
                      autoComplete="given-name"
                      value={values.nombres}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      name="apellido"
                      label="Apellido"
                      fullWidth
                      autoComplete="family-name"
                      value={values.apellido}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      name="email"
                      label="Email"
                      fullWidth
                      autoComplete="email"
                      value={values.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <InputLabel id="provincia-select-label">
                        Provincia
                      </InputLabel>
                      <Select
                        required
                        labelId="provincia-select-label"
                        name="provincia"
                        value={values.provincia}
                        onChange={(e) => {
                          values.ciudad = "";
                          handleChange(e);
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
                        value={values.ciudad}
                        onChange={(_, newValue) => {
                          const target = {
                            name: "ciudad",
                            value: newValue,
                          };

                          handleChange({ target });
                        }}
                        inputValue={ciudad}
                        onInputChange={(_, value) => {
                          handleCitiesChange(value, values.provincia);
                        }}
                        name="ciudad"
                        options={ciudades}
                        renderInput={(params) => (
                          <TextField
                            name="ciudad"
                            required
                            label="Ciudad"
                            {...params}
                          />
                        )}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      name="mensaje"
                      label="Mensaje"
                      fullWidth
                      multiline
                      rows={6}
                      onChange={handleChange}
                      value={values.mensaje}
                    />
                  </Grid>
                  <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Button
                      color="primary"
                      type="submit"
                      variant="contained"
                    >
                      Enviar
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        )}

        <AlertCustom
          type={alertCustomType}
          text={alertCustomText}
          open={alertCustomOpen}
          setOpen={setAlertCustomOpen}
        />
      </Container>
    </section>
  );
};
export default Contacto;
