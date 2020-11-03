import React from 'react'
import { Container, makeStyles, Grid, Typography } from '@material-ui/core'
import promocionImage from "../../../assets/img/Landing/promocion-image.png"
import estadisticaImage from "../../../assets/img/Landing/estadistica-image.png"
import calendarioImage from "../../../assets/img/Landing/calendario-image.png"
import usuarioImage from "../../../assets/img/Landing/usuario-image.png"
import comentarioImage from "../../../assets/img/Landing/comentario-image.png"
import facilImage from "../../../assets/img/Landing/facil-image.png"
import imagenFondo from "../../../assets/img/Landing/fondo-image.png"


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
    },
    container: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(15),
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(0, 5),
    },
    image: {
        height: 150,
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(2),
    },
    title: {
        marginBottom: theme.spacing(4),
    },
    imagenFondo: {
        pointerEvents: 'none',
        position: 'absolute',
        top: -180,
        opacity: 0.20,
        backgroundRepeat: "repeat-y",
    },
    subrayado: {
        height: 5,
        width: 100,
        display: 'block',
        margin: `${theme.spacing(1)}px auto 0`,
        background: "rgb(255,191,0) linear-gradient(90deg, rgba(255,191,0,0.7517401392111369) 29%, rgba(255,255,191,1) 100%)",
    },
}))

const Features = () => {
    const classes = useStyles()
    return (
        <section id="Features" className={classes.root}>
          
        <Container className={classes.container}>
          <img
            src={imagenFondo}
            className={classes.imagenFondo}
            alt=""
          />
          <Typography variant="h4" marked="center" className={classes.title} component="h2">
            <b>VENTAJAS DE SUMAR TU COMPLEJO</b>
            <span className={classes.subrayado} />
          </Typography>
          <div>
            <Grid container spacing={5}>
              <Grid item xs={12} md={4}>
                <div className={classes.item}>
                  
                  <img
                    src={usuarioImage}
                    alt="usuarios"
                    className={classes.image}
                  />
                  <Typography variant="h5" className={classes.title}>
                       <b>LLEGÁ A MUCHOS MAS CLIENTES</b>
                   </Typography>
                  <Typography variant="h6" align="center">
                    {'Los usuarios de Rent Now podrán ver ubicación, fotos, tipo de canchas que contiene'}
                    {' y comentarios de otros usuarios sobre tu complejo.'}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className={classes.item}>
                  <img
                    src={calendarioImage}
                    alt="calendario"
                    className={classes.image}
                  />
                  <Typography variant="h5"  className={classes.title}>
                        <b>MANTENÉ TU CALENDARIO MÁS ORGANIZADO</b>
                  </Typography>
                  <Typography variant="h6" align="center">
                        {'En Rent Now los turnos se registran automáticamente a través de la aplicación,'}
                        {' además, permite registrar los turnos realizados fuera de la aplicación, como los presenciales y llamadas telefónicas.'}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className={classes.item}>
                  <img
                    src={comentarioImage}
                    alt="comentarios"
                    className={classes.image}
                  />
                  <Typography variant="h5"  className={classes.title}>
                       <b>CONOCÉ VALORACIONES Y COMENTARIOS</b>
                    </Typography>
                  <Typography variant="h6" align="center">
                        {' Tus clientes podrán hacer valoraciones y comentarios sobre que piensan de tu complejo.'}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className={classes.item}>
                  
                  <img
                    src={estadisticaImage}
                    alt="estadisticas"
                    className={classes.image}
                  />
                  <Typography variant="h5"  className={classes.title}>
                       <b>VISUALIZÁ ESTADISTICAS</b>
                   </Typography>
                  <Typography variant="h6" align="center">
                    {'Podrás obtener estadísticas de los horarios más y menos concurridos, de'}
                    {' los espacios más utilizados, clientes más frecuentes, y mucho más.'}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className={classes.item}>
                  
                  <img
                    src={promocionImage}
                    alt="promociones"
                    className={classes.image}
                  />
                  <Typography variant="h5" className={classes.title}>
                       <b>INCLUÍ PROMOCIONES</b>
                   </Typography>
                  <Typography variant="h6" align="center">
                    {'¡Observa las estadísticas e incluí promociones para lograr'}
                    {' mayores beneficios para tu complejo!'} 
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={12} md={4}>
                <div className={classes.item}>
                  
                  <img
                    src={facilImage}
                    alt="facil"
                    className={classes.image}
                  />
                  <Typography variant="h5" className={classes.title}>
                       <b>FÁCIL DE USAR</b>
                   </Typography>
                  <Typography variant="h6" align="center">
                    {'RentNow está pensada para sus usuarios. Buscando siempre'} 
                    {' reducir el tiempo y el trabajo manual'}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </div>
        </Container>
      </section>
    )
}

export default Features