import React from "react";
import { Grid, Button } from "@material-ui/core";
import { bajaEspacioApi } from "api/espacios";

export default function DeleteEspacio(props) {
  return (
    <Grid container spacing={2} justify="space-evenly">
      <Grid item xs={12}>
        <Typography>El usuario no podrá acceder al sistema.</Typography>
      </Grid>

      <Grid item xs={2}>
        <Button color="primary" variant="contained" onClick={eliminarEspacio}>
          Aceptar
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="contained"
          onClick={() => {
            setOpenModal(false);
          }}
          color="secondary"
        >
          Cancelar
        </Button>
      </Grid>
    </Grid>
  );
}
