import React, { useState } from "react";
import {
  Grid,
  TextField,
  InputAdornment,
  Button,
  CircularProgress,
} from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import { Formik, Form, Field } from "formik";
import { updateComplejoApi } from '../../../../../api/complejos'
import AlertCustom from "components/utils/AlertCustom/AlertCustom";
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  boton: {
    marginTop: theme.spacing(3),
  },
}))

const BasicData = (props) => {
  const classes = useStyles();
  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlertProps] = useState({});
  const { idComplejo } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const updateComplejo = (values) => {
    let complejoToUpdate = {
      ...values
    }
    updateComplejoApi(complejoToUpdate, idComplejo).then((response) => {
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
          nombre: props.complejo.nombre,
          telefono: props.complejo.telefono,
          email: props.complejo.email,
          redes: {
            instagram: props.complejo.instagram,
            facebook: props.complejo.facebook,
            twitter: props.complejo.twitter,
          },
        }}
        onSubmit={(values) => {
          setIsLoading(true)
          const valuesToUpdate = { telefono: values.telefono, email: values.email, redes: values.redes }
          updateComplejo(valuesToUpdate);
        }}>
        <Form>
          <Grid container spacing={3} justify="space-between">
            <Grid item md={12}>
              <Field
                name="nombre"
                label="Nombre"
                disabled
                fullWidth
                as={TextField}
              />
            </Grid>
            <Grid item md={6}>
              <Field
                name="telefono"
                type="input"
                as={TextField}
                label="Telefono"
                fullWidth
                required
              />
            </Grid>
            <Grid item md={6}>
              <Field
                required
                type="email"
                name="email"
                label="Email"
                fullWidth
                as={TextField}
              />
            </Grid>
            <Grid item md={4}>
              <Field
                type="input"
                name="redes.facebook"
                fullWidth
                label="Facebook"
                as={TextField}
                placeholder="URL del perfil de Facebook del complejo"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FacebookIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={4}>
              <Field
                type="input"
                name="redes.instagram"
                fullWidth
                label="Instagram"
                placeholder="URL del perfil de Instagram del complejo"
                as={TextField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <InstagramIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item md={4}>
              <Field
                type="input"
                name="redes.twitter"
                fullWidth
                label="Twitter"
                placeholder="URL del perfil de Twitter del complejo"
                as={TextField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TwitterIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid container justify="center">
              <Button variant="contained"
                type="submit"
                color="primary"
                className={classes.boton}
                disabled={isLoading}
              >{isLoading ? (<CircularProgress />) : ("Actualizar Datos")
                }
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
      <AlertCustom
        type={alertProps.type}
        text={alertProps.text}
        open={showAlert}
        setOpen={setShowAlert}
      />
    </>
  );
};

export default BasicData;