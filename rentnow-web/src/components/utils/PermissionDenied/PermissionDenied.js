import React from "react";
import { Typography, Paper, Grid, Button } from "@material-ui/core";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { withRouter } from "react-router-dom";
const PermissionDenied = (props) => {
  return (
    <Paper style={{ margin: "auto" }}>
      <Grid
        direction="column"
        style={{ height: "70vh" }}
        alignItems="center"
        alignContent="center"
        justify="center"
        container
      >
        <Grid item xs={1}>
          <SentimentVeryDissatisfiedIcon fontSize="large" />
        </Grid>
        <Grid item xs={6}>
          <Typography align="center">
            NO TENES PERMISO PARA ESTA VISTA REY/REYNA
          </Typography>
        </Grid>
        <Grid item>
          <Button
            xs={12}
            fullWidth
            variant="contained"
            color="primary"
            endIcon={<ArrowBackIcon />}
            onClick={(e) => {
              e.preventDefault();
              props.history.go(-1);
            }}
          >
            Volver
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default withRouter(PermissionDenied);
