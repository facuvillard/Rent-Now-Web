import React, { useState, useEffect } from "react";
import { Button, Typography, Grid, CircularProgress } from "@material-ui/core";
import { deleteUserApi } from "../../../api/usuarios";
import AlertCustom from "../../utils/AlertCustom/AlertCustom";

export default function DeleteUser(props) {
  const [alertCustomOpen, setAlertCustomOpen] = useState(false);
  const [alertCustomType, setAlertCustomType] = useState();
  const [alertCustomText, setAlertCustomText] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleUserDelete = async () => {
    setIsLoading(true);
    const result = await deleteUserApi(props.userId);
    setIsLoading(false);
    if (result.status === "OK") {
      setAlertCustomText(result.message);
      setAlertCustomType("success");
      setAlertCustomOpen(true);
    
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
                props.setOpen(false);
              }}
              color="primary"
            >
              Cancelar
            </Button>
          </Grid>
        </Grid>
      )}
      <AlertCustom
        type={alertCustomType}
        text={alertCustomText}
        open={alertCustomOpen}
        setOpen={setAlertCustomOpen}
      />
    </>
  );
}
