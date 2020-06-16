import React, { useState } from "react";
import { Button, Typography, Grid, CircularProgress } from "@material-ui/core";
import { deleteUserApi } from "../../../api/usuarios";

export default function DeleteUser(props) {
  const {
    setOpen,
    userId,
    setReload,
    setAlertCustomOpen,
    setAlertCustomText,
    setAlertCustomType,
  } = props;
  const [isLoading, setIsLoading] = useState(false);

  const handleUserDelete = async () => {
    setIsLoading(true);
    const result = await deleteUserApi(userId);
    setIsLoading(false);
    if (result.status === "OK") {
      setAlertCustomText(result.message);
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
            <Typography>El usuario no podrá acceder al sistema.</Typography>
          </Grid>

          <Grid item xs={2}>
            <Button
              color="primary"
              variant="contained"
              onClick={handleUserDelete}
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
