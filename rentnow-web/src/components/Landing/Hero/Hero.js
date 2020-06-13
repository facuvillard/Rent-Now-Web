import React from 'react'
import {Container, makeStyles, Typography, Button} from '@material-ui/core'
import heroBgImage from "../../../assets/img/Landing/landing-image.jpg" 


const useStyles = makeStyles(theme => ({
    hero: {
        height:"100vh",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
    },
    background: {
        backgroundImage: `url(${heroBgImage})`,
        backgroundPositionX:'37%',
        backgroundPositionY: '20%',
        height: "100%",
        width: "100%",
        filter: "brightness(50%)",
        position: "absolute"
    },
    toFront:{
        zIndex: 1
    },
    button: {
        marginTop: theme.spacing(8),
    },
}))

const Hero = () => {
    const classes = useStyles()
    return (
        <Container className={classes.hero} maxWidth="xl">
            <div className={classes.background}></div>
        <Typography variant="h2" display="block" style={{color: "#FAFAFA" }} className={classes.toFront} gutterBottom> <b>BIENVENIDOS A RENTNOW</b> </Typography> 
        <Typography variant="h4" display="block" style={{color: "#FAFAFA" }} className={classes.toFront} gutterBottom> Administra tu complejo de forma simple y rapida </Typography> 
        <Button color="primary" size="large" variant="contained" className={classes.button} href="">Conoce más</Button>
        </Container>
    )
}

export default Hero