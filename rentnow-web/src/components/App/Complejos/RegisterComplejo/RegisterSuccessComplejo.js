import React from "react";
import { Typography, Button, Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from '@material-ui/core/Snackbar';
import successImage from '../../../../assets/img/register-success-image.png'

const useStyles = makeStyles((theme) => ({
  divider: {
    borderTop: "2px solid #3F4652",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    borderRadius: "1.5px",
  },
  paper: {
    height: "65vh",
    width: "50%",
  },
  title: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  grid: {
    height: "100%",
  },
  snackbar: {
    [theme.breakpoints.down('xs')]: {
      bottom: 60,
    },
  },
  image: {
    height: "25vh",
    width: "100%",
  },
}))


export const RegisterSuccessComplejo = ({ complejo }) => {
  const classes = useStyles();
  return (
    <>
      <Paper
        variant="outlined"
        className={classes.paper}
      >
        <Grid
          container
          className={classes.grid}
          spacing={5}
          justify="center"
        >
          <Grid item xs={12}>
            <Typography align="center" variant="h6" className={classes.title}>
              ¡Tu complejo <b>{complejo.nombre}</b> fue registrado con éxito!
        </Typography>
            <hr className={classes.divider} />
          </Grid>
          <Grid item xs={12}>
            <img
              src={successImage}
              alt="exitoImage"
              className={classes.image} />
          </Grid>
          <Grid item xs={12}>
            <Typography align="center">
              ¡Ahora puedes comenzar a registrar los <b>espacios</b> que tiene tu complejo haciendo clic en el siguiente botón!
        </Typography>
          </Grid>
          <Grid item xs={3}>
            <Button fullWidth variant='contained' color='primary'>agregar espacios</Button>
            {/* On Click redireccionar a la pagina de registrar espacios */}
          </Grid>
        </Grid>
        <Typography variant="caption" display="block" gutterBottom color="textSecondary">
          <b>Nota</b>: Recuerda que el complejo permanecera en estado <b>Deshabilitado</b> hasta que el equipo de RentNow valide y apruebe la solicitud de registro.
        </Typography>
      </Paper>
      <Snackbar
        open
        color="primary"
        autoHideDuration={6000}
        message="Nota: Recuerda que el complejo permanecera en estado Deshabilitado hasta que el equipo de RentNow valide y apruebe la solicitud de registro."
        action={
          <Button color="inherit" size="small">
            Entendido
            </Button>
        }
        className={classes.snackbar}
      />
    </>
  );
};

