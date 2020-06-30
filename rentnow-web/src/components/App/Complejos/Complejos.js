import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Button
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import addImage from "../../../assets/img/more-image.png"
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    maxHeight: 232,
  },
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(4),
  },
  media: {
    height: 140,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
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
    position: 'fixed',
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
  heroButtons: {
    marginTop: theme.spacing(2),
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
      <div>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            TUS COMPLEJOS
            <span className={classes.subrayado} />
            </Typography>
          <Typography variant="h6" align="center" color="textSecondary" paragraph>
            Aquí podras visualizar todos tus complejos registrados en la aplicación. 
            Recuerda que puedes tener solicitudes pendientes de aprobación de complejos, puedes verlas apretando en el siguiente botón:
            </Typography>
          <div className={classes.heroButtons}>
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button variant="outlined" color="primary">
                  SOLICITUDES PENDIENTES
                  </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <Container className={classes.container}>
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
          
        </Grid>
      </Container>
      <Fab color="primary" aria-label="add" title="Registrar un nuevo complejo" className={classes.addButton}>
        <AddIcon />
      </Fab>
    </>
  );
};

export default Complejos;
