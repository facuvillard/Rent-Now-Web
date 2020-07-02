import React, { useEffect, useState } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Alert, AlertTitle } from "@material-ui/lab";
import { getComplejosApi } from "../../../api/complejos";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    maxHeight: 232,
  },
  container: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(4),
  },
  media: {
    height: 140,
  },
  item: {
    display: "flex",
    alignItems: "center",
  },
  subrayado: {
    height: 5,
    width: 100,
    display: "block",
    margin: `${theme.spacing(1)}px auto 0`,
    background:
      "rgb(255,191,0) linear-gradient(90deg, rgba(255,191,0,0.7517401392111369) 29%, rgba(255,255,191,1) 100%)",
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  image: {
    backgroundPosition: "center",
    minHeight: "100px",
    height: "100%",
    width: "100%",
  },
  addButton: {
    position: "fixed",
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Complejos = () => {
  const classes = useStyles();
  const [complejos, setComplejos] = useState([]);
  useEffect(() => {
    getComplejosApi().then((response) => {
      setComplejos(response);
    });
  }, []);

  return (
    <>
      <div>
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            TUS COMPLEJOS
            <span className={classes.subrayado} />
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="textSecondary"
            paragraph
          >
            Aquí podras visualizar todos tus complejos registrados en la
            aplicación.
          </Typography>
        </Container>
      </div>
      {complejos.length !== 0 ? (
        <Grid container spacing={5} justify="center">
          {complejos.map((complejo) => (
            <Grid key={complejo.nombre} item xs={12} md={4}>
              <Card elevation={10}>
                <CardActionArea disabled={!complejo.habilitado}>
                  <CardMedia
                    className={classes.media}
                    image={complejo.imagen}
                    title={complejo.nombre}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {complejo.nombre}{" "}
                      {complejo.habilitado ? null : <Chip disabled label="Deshabilitado" />}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {complejo.direccion}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Alert severity="info">
          <AlertTitle>No tienes complejos registrados</AlertTitle>
          Has click en el botón Nuevo Complejo y <strong>registralos</strong>!
        </Alert>
      )}
      <Fab
        color="primary"
        aria-label="add"
        title="Registrar un nuevo complejo"
        className={classes.addButton}
        variant="extended"
      >
        <AddIcon className={classes.extendedIcon} />
        Nuevo Complejo
      </Fab>
    </>
  );
};

export default Complejos;
