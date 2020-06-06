import React from 'react'
import {Container, makeStyles, Typography, Button} from '@material-ui/core'
import heroBgImage from "../../../assets/img/Landing/landing-image.jpg" 


const useStyles = makeStyles(theme => ({
    hero: {
        backgroundImage: `url(${heroBgImage})`,
        height:"100vh",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
    }
}))

const Hero = () => {
    const classes = useStyles()
    return (
        <Container className={classes.hero} maxWidth="xl">
        <Typography variant="h1" display="block" color="textSecondary"> <b>Bienvenidos a RentNow</b> </Typography> 
        <Typography variant="h3" display="block" color="textSecondary" gutterBottom> Alquila tu espacio de forma simple y rapida </Typography> 
        <Button color="primary" variant="outlined" size="large"> Conoce más</Button>
        </Container>
    )
}

export default Hero