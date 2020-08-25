import React, { useState } from "react";
import { Button, Typography, Grid, CircularProgress } from "@material-ui/core";


const DeleteComplejoImage = (props) => {
  const [isLoading, setIsLoading] = useState(false);

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
              La imagen ya no podrá ser utilizada dentro de la aplicación
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                  props.deleteHandler();
                  props.setOpen(false);
              }}
            >
              Aceptar
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              onClick={() => {
                props.setOpen(false);
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
};

export default DeleteComplejoImage;
