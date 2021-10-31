import React, { useState } from "react";
import { Button, Grid, CircularProgress, Typography } from "@material-ui/core";
import { bajaEspacioApi } from "api/espacios";
import { useParams } from "react-router-dom";

export default function DeleteEspacio(props) {
  const { idComplejo } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const eliminarEspacio = () => {
    setIsLoading(true);
    bajaEspacioApi(props.espacio, idComplejo).then((response) => {
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
          <Grid item xs={12}>
            <Typography>El espacio quedará eliminado y todas las reservas realizadas en el mismo van a quedar en estado Cancelada. Luego de esto el espacio no se podrá utilizar en el sistema. </Typography>
          </Grid>
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
