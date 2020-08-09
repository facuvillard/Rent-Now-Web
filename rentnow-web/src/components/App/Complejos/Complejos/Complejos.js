import React, { useEffect, useState, useContext } from "react";
import {
  CircularProgress,
  IconButton,
  Paper,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Alert, AlertTitle } from "@material-ui/lab";
import { getComplejosByUserApi } from "api/complejos";
import { AuthContext } from "Auth/Auth";
import Carousel from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import LinkCustom from "components/utils/LinkCustom/LinkCustom";
import * as Routes from "constants/routes";
import CardComplejo from "../Complejos/CardComplejo.js"

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
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
  carouselItem: {
    paddingBottom: theme.spacing(2),
  },
}));

const Arrow = function (props) {
  return (
    <IconButton>
      {props.back ? (
        <ArrowBackIcon style={{ color: props.cssColor }} />
      ) : (
          <ArrowForwardIcon style={{ color: props.cssColor }} />
        )}
    </IconButton>
  );
};

const Complejos = () => {
  const { currentUser } = useContext(AuthContext);
  const classes = useStyles();
  const [complejos, setComplejos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getComplejosByUserApi(currentUser).then((response) => {
      if (response.status === "OK") {
        setComplejos(response.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  }, [currentUser]);

  return (
    <>
      {isLoading ? (
        <Grid container justify="center" className={classes.circularProgress}>
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : (
          <>
            {complejos.length !== 0 ? (
              <Paper variant='outlined'>
                <Grid container className={classes.container}>
                  <Carousel
                    dots
                    arrowLeft={<Arrow back cssColor="black" />}
                    arrowLeftDisabled={<Arrow back cssColor="grey" />}
                    arrowRight={<Arrow cssColor="black" />}
                    arrowRightDisabled={<Arrow cssColor="grey" />}
                    addArrowClickHandler
                  >
                    {complejos.map((complejo) => (
                      <Grid
                        key={complejo.id}
                        item
                        xs={11}
                        className={classes.carouselItem}
                      >
                        <CardComplejo complejo={complejo} />
                      </Grid>
                    ))}
                  </Carousel>
                </Grid>
              </Paper>
            ) : (
                <Grid
                  container
                  justify="center"
                  className={classes.circularProgress}
                >
                  <Alert severity="info">
                    <AlertTitle>No tienes complejos registrados</AlertTitle>
                ¡Has click en el botón <strong> Nuevo Complejo</strong> y
                registralos!
              </Alert>
                </Grid>
              )}
          </>
        )}
      <LinkCustom to={Routes.REGISTRAR_COMPLEJO}>
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
      </LinkCustom>
    </>
  );
};

export default Complejos;
