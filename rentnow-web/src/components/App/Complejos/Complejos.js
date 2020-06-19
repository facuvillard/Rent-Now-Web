import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import addImage from "../../../assets/img/add_circle_outline-black-24dp.svg"
 
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    maxHeight: 232,
  },
  media: {
    height: 140,
  },
  subrayado: {
    height: 5,
    width: 100,
    display: "block",
    margin: `${theme.spacing(1)}px auto 0`,
    background:
      "rgb(255,191,0) linear-gradient(90deg, rgba(255,191,0,0.7517401392111369) 29%, rgba(255,255,191,1) 100%)",
  },
}));

const complejos = [
  {
    nombre: "La Gran 7",
    direccion: "Ciudad universitaria, Cordoba capital.",
    image:
      "https://www.hoysejuega.com/uploads/Modules/ImagenesComplejos/800_600_img-20170526-wa0008.jpg",
  },
];

const Complejos = () => {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={5}>
        {complejos.map((complejo) => (
          <Grid key={complejo.nombre} item xs={12} md={4}>
            <Card elevation={10} className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={complejo.image}
                  title={complejo.nombre}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {complejo.nombre}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {complejo.direccion}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12} md={4}>
          <Card elevation={10} className={classes.root}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={addImage}
                title="Nuevo complejo"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Nuevo complejo
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Click aquí para registrar un nuevo complejo!
                  </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Complejos;
