import React from "react";
import { Button, Typography, Grid } from "@material-ui/core";


const DeleteComplejoImage = (props) => {
  return (
    <>
      <Grid container spacing={2} justify="space-evenly">
        <Grid item xs={12}>
          <Typography>
            {props.text}
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
    </>
  )
};

export default DeleteComplejoImage;
