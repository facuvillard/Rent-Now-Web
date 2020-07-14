import React from "react";
import { Typography, Button, Grid } from "@material-ui/core";

export const RegisterSuccessComplejo = ({ complejo }) => {
  return (
    <Grid
      container
      style={{
        height: "100%",
      }}
      spacing={5}
      justify="space-around"
    >
      <Grid item xs={12}>
        <Typography align="center" variant="h4">
          Tu complejo {complejo.nombre} fue registrado con exito!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography align="center">
          Ahora puedes comenzar a agregarle espacios.
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <Button variant='contained' color='primary' > Agregar espacios </Button>
        {/* On Click redireccionar a la pagina de registrar espacios */}
      </Grid>
    </Grid>
  );
};
