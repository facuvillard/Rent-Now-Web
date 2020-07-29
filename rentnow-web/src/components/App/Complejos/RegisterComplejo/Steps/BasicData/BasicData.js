import React from "react";
import {
  Typography,
  Grid,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import { Field } from "formik";



const BasicData = ({errors, touched}) => {

  return (
    <Grid container style={{marginBottom: '10%'}} spacing={5} alignItems="center" justify="space-around">
      <Grid item xs={12}>
        <Typography variant="h4" marked="center" align="center" component="h2">
          DATOS BÁSICOS
        </Typography>
      </Grid>
      <Grid item md={8}>
        <Grid container spacing={3} justify="space-between">
          <Grid item md={5}>
            <Field
              name="nombre"
              label="Nombre"
              fullWidth
              error={!!errors.nombre && touched.nombre}
              helperText={!!touched.nombre ? errors.nombre : null}
              as={TextField}
            />
          </Grid>
          <Grid item md={5}>
            <Field
              name="telefono"
              type="input"
              as={TextField}
              label="Telefono"
              error={!!errors.telefono && touched.telefono}
              helperText={touched.telefono ? errors.telefono : null}
              fullWidth
            />
          </Grid>
          <Grid item md={12}>
            <Field
              name="email"
              label="Email"
              error={!!errors.email && touched.email}
              helperText={touched.email ? errors.email : null}
              fullWidth
              as={TextField}
            />
          </Grid>
          <Grid item md={3}>
            <Field
              type="input"
              name="redes.facebook"
              fullWidth
              label="Facebook"
              as={TextField}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FacebookIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item md={3}>
            <Field
              type="input"
              name="redes.instagram"
              fullWidth
              label="Instagram"
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
          <Grid item md={3}>
            <Field
              type="input"
              name="redes.twitter"
              fullWidth
              label="Twitter"
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
        </Grid>
      </Grid>
    </Grid>
  );
};

//Validar que todos los campos sean correctos y si es asi pasar los datos al padre.

export default BasicData;
