import React from 'react'
import { Container, makeStyles, Typography } from '@material-ui/core'
import imagenFondo from "../../../assets/img/fondo-imagen2.png"

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        overflow: 'hidden',
        backgroundColor: '#f5f5f5',
    },
    container: {
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
    },
    imagenFondo: {
        pointerEvents: 'none',
        position: 'absolute',
        top: -360,
        left: -20,
        opacity: 0.20,
    },
}))

const Title = (props) => {
    const classes = useStyles()
    return (
        <section className={classes.root}> 
        <Container className={classes.container}>
          <img
            src={imagenFondo}
            className={classes.imagenFondo}
            alt=""
          />
          <Typography variant="h5">
            {props.titulo}
          </Typography>
        </Container>
        </section>
    )
}

export default Title