import React, { useState } from "react";
import {
  CardContent,
  CardMedia,
  CardActionArea,
  Card,
  Typography,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LinkCustom from "components/utils/LinkCustom/LinkCustom";
import * as Routes from "constants/routes";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  addButton: {
    position: "fixed",
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function Espacios(props) {
  const [espacios, setEspacios] = useState(["1", "2", "3", "4", "5", "6"]);
  const currentLocation = useLocation().pathname;
  const classes = useStyles();
  return (
    <>
      <Grid container spacing={6}>
        {espacios.map((espacio) => (
          <Grid item xs={4}>
            <Card>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  width="140"
                  image="https://i1.wp.com/www.parqueygrama.com/wp-content/uploads/2018/02/medidas-reglamentarias-para-canchas-de-futbol-5-6-7-8-9-11.jpg?w=1025&ssl=1"
                  title="Cancha de futbol 1"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Best Cancha de Futbol Ever
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Cancha futból 5
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <LinkCustom to={currentLocation + "/registrar"}>
        <Fab
          color="primary"
          aria-label="add"
          title="Registrar espacios"
          className={classes.addButton}
          variant="extended"
        >
          <AddIcon className={classes.extendedIcon} />
          Nuevo espacio
        </Fab>
      </LinkCustom>
    </>
  );
}
