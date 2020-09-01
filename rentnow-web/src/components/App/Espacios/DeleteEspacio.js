import React, { useState } from "react";
import { Button, Grid, CircularProgress } from "@material-ui/core";
import { bajaEspacioApi } from "api/espacios";

export default function DeleteEspacio(props) {
  const [isLoading, setIsLoading] = useState(false);
  const eliminarEspacio = () => {
    setIsLoading(true);
    bajaEspacioApi(props.espacio.id).then((response) => {
      if (response.status === "OK") {
        props.setAlertType("success");
        props.setAlertContent("Se ha eliminado el espacio con éxito");
        props.setOpenAlert(true);
        props.setIsLoading(true);
        props.setOpenModal(false);
      } else {
        props.setAlertType("error");
        props.setAlertContent("Se ha producido un error al eliminar espacio");
        props.setOpenAlert(true);
        props.setIsLoading(true);
        props.setOpenModal(false);
      }
    });
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
        <Grid container spacing={2} justify="space-evenly">
          <Grid item xs={2}>
            <Button
              color="primary"
              variant="contained"
              onClick={eliminarEspacio}
            >
              Si
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              onClick={() => {
                props.setOpenModal(false);
              }}
              color="secondary"
            >
              No
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
}
