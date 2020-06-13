import React from 'react'
import { Container, makeStyles, Typography } from '@material-ui/core'
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
    imagenFondo: {
        pointerEvents: 'none',
        position: 'absolute',
        top: -180,
        opacity: 0.20,
    },
    subrayado: {
        height: 5,
        width: 100,
        display: 'block',
        margin: `${theme.spacing(1)}px auto 0`,
        background: "rgb(255,191,0) linear-gradient(90deg, rgba(255,191,0,0.7517401392111369) 29%, rgba(255,255,191,1) 100%)",
    },
}))


const ComplejosAdheridos = () => {
    const classes = useStyles()
    return (
        <section className={classes.root}> 
        <Container className={classes.container}>
          <img
            src={imagenFondo}
            className={classes.imagenFondo}
            alt=""
          />
          <Typography variant="h4" marked="center" className={classes.title} component="h2">
            <b>COMPLEJOS ADHERIDOS</b>
            <span className={classes.subrayado} />
          </Typography>
        </Container>
        </section>
    )
}


export default ComplejosAdheridos