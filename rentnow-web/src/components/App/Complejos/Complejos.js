import React, { useEffect, useState, useContext } from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Alert, AlertTitle } from "@material-ui/lab";
import { getComplejosByUserApi } from "../../../api/complejos";
import Chip from "@material-ui/core/Chip";
import { AuthContext } from '../../../Auth/Auth'
import HttpsOutlined from '@material-ui/icons/HttpsOutlined';
import Title from './Title.js'



const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(10),
  },
  media: {
    height: 250,
  },
  item: {
    display: "flex",
    alignItems: "center",
  },
  addButton: {
    position: "fixed",
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  circularProgress: {
    marginTop: theme.spacing(25),
  },
}));

const Complejos = () => {
  const currentUser = useContext(AuthContext)
  const classes = useStyles();
  const [complejos, setComplejos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getComplejosByUserApi(currentUser).then((response) => {
      if (response.status === 'OK') {
        setComplejos(response.data);
        setIsLoading(false)
      } else {
        console.log(response.message, response.error)
        setIsLoading(false)
      }
    });
  }, []);

  return (
    <>
      <Title titulo="Mis Complejos" />
      {isLoading ? (
        <Grid container justify="center" className={classes.circularProgress}>
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : (
          <>
            {complejos.length !== 0 ? (
              <Grid container spacing={5} justify="center" className={classes.container}>
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
                            {complejo.habilitado ? null : <Chip variant="outlined" label="Deshabilitado" color="primary" icon={<HttpsOutlined />} />}
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
          ¡Has click en el botón <strong> Nuevo Complejo</strong> y registralos!
                </Alert>

              )}
          </>
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
