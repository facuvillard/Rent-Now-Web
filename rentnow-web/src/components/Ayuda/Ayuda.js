import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  RadioGroup,
  Grid,
  Typography,
  Button,
  Radio,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { Formik, Field, Form } from "formik";
import LinkCustom from "components/utils/LinkCustom/LinkCustom";
import AlertCustom from "components/utils/AlertCustom/AlertCustom";
import { sendEmailApi } from "api/misc";
import { AuthContext } from "Auth/Auth";

const useStyles = makeStyles((theme) => ({
  text: {
    marginBottom: theme.spacing(2),
  },
  grid: {
    marginBottom: theme.spacing(5),
  },
}));

export default function Ayuda(props) {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [alertParams, setAlertParams] = useState({
    setOpen,
    text: "",
    type: "",
  });

  const handleSubmit = (values) => {
    setIsLoading(true);
    const { motivo, descripcion } = values;
    const mensaje = { remitente: currentUser.email, motivo, descripcion };
    const formatedData = {
      destinatario: "facuvillard@gmail.com",
      asunto: "Ayuda con Rent Now",
      contenido: JSON.stringify(mensaje),
      adjuntos: null,
    };
    if (motivo === "" || descripcion === "") {
      setAlertParams({
        ...alertParams,
        text: "Faltan datos de completar",
        type: "warning",
      });
      setOpen(true);
      setIsLoading(false);
    } else {
      sendEmailApi(formatedData).then((resp) => {
        if (resp.status === "OK") {
          setAlertParams({
            ...alertParams,
            text: "Consulta enviada con éxito!",
            type: "success",
          });
          setOpen(true);
          setIsLoading(false);
        } else {
          setAlertParams({
            ...alertParams,
            text: "Error al enviar consulta!",
            type: "error",
          });
          setOpen(true);
          setIsLoading(false);
        }
      });
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          motivo: "",
          descripcion: "",
        }}
        onSubmit={async (values) => {
          handleSubmit(values);
        }}
      >
        {({ values }) => (
          <Form>
            <Grid container>
              <Grid item xs={12} className={classes.grid}>
                <Typography className={classes.text}>
                  Aquí podrás contactarnos y realizarnos consultas sobre todas
                  las dudas que tengas con respecto a <b>Rent Now!</b>.
                </Typography>
                <Typography className={classes.text}>
                  Deberás ingresar un motivo y detallar la consulta que quieras
                  realizar. La misma será contestada dentro de las 24 o 48 hs al
                  correo de email de tu usuario de Rent Now.
                </Typography>
                <RadioGroup>
                  <Typography component={"label"} variant={"body1"}>
                    <Field
                      type="radio"
                      name="motivo"
                      value="Error en el sistema"
                      required
                      as={Radio}
                      rows={6}
                    />
                    Error en el sistema
                  </Typography>
                  <Typography component={"label"} variant={"body1"}>
                    <Field
                      type="radio"
                      name="motivo"
                      value="Dudas respecto al sistema"
                      required
                      as={Radio}
                    />
                    Dudas respecto al sistema
                  </Typography>
                  <Typography component={"label"} variant={"body1"}>
                    <Field
                      type="radio"
                      name="motivo"
                      value="Alta de complejo"
                      required
                      as={Radio}
                    />
                    Quiero solicitar el alta de mi complejo
                  </Typography>
                  <Typography component={"label"} variant={"body1"}>
                    <Field
                      type="radio"
                      name="motivo"
                      value="Otro"
                      required
                      as={Radio}
                    />
                    Otro
                  </Typography>
                </RadioGroup>
                <Field
                  name="descripcion"
                  label="Explique aqui el motivo de su contacto"
                  fullWidth
                  as={TextField}
                  multiline
                  rows={6}
                  value={values.descripcion}
                  required
                />
              </Grid>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={2}>
                  <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <CircularProgress color="secondary" />
                    ) : (
                      "Enviar"
                    )}
                  </Button>
                </Grid>
                <Grid item xs={2}>
                  <LinkCustom to={"/app/complejos"}>
                    <Button variant="contained" color="secondary">
                      Cancelar
                    </Button>
                  </LinkCustom>
                </Grid>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>

      <AlertCustom
        open={open}
        type={alertParams.type}
        text={alertParams.text}
        setOpen={alertParams.setOpen}
      />
    </>
  );
}
