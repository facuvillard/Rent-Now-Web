import React, { useState } from "react";
import { Button, Typography, Grid, CircularProgress } from "@material-ui/core";
import { habilitarComplejoApi } from "./../../../api/complejos";

export default function EnableComplejo(props) {
  const {
    setOpen,
    setAlertCustomOpen,
    setAlertCustomType,
    setAlertCustomText,
    setReload,
    complejo,
  } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleAcept = async () => {
    setIsLoading(true)
    const result = await habilitarComplejoApi(complejo.id, complejo.habilitado);
    if (result.status === "OK") {
        setAlertCustomText(`El complejo ha sido ${!complejo.habilitado? "habilitado" : "deshabilitado"} correctamente.`);
        setAlertCustomType("success");
        setAlertCustomOpen(true);
        setReload(true);
        setOpen(false);
      } else {
        setAlertCustomText(result.message);
        setAlertCustomType("error");
        setAlertCustomOpen(true);
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
        <Grid container spacing={2} justify="space-evenly">
          <Grid item xs={12}>
            <Typography>
              El complejo quedará{" "}
              {!complejo.habilitado ? "habilitado y podrá empezar a operar en el sitema." : "deshabilitado y no podrá operar en el sistema"} 
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Button
              color="primary"
              variant="contained"
              onClick={handleAcept}
            >
              Aceptar
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              onClick={() => {
                setOpen(false);
              }}
              color="secondary"
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      )}
    </>
  );
}
