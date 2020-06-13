import React from 'react'
import { Container, makeStyles, Grid, Typography } from '@material-ui/core'
import AboutImg from "../../../assets/img/logos/logo-amarillo.png"

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        overflow: 'hidden',
        backgroundColor: '#FAFAFE',
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
        backgroundImage: `url(${AboutImg})`,
        backgroundRepeat: "repeat",
        // theme.palette.type === "light"
        //   ? theme.palette.grey[50]
        //   : theme.palette.grey[900],
        backgroundSize: "cover",
        backgroundPosition: "center",
    },
    title: {
        marginBottom: theme.spacing(5),
    },
    subrayado: {
        height: 5,
        width: 100,
        display: 'block',
        margin: `${theme.spacing(1)}px auto 0`,
        background: "rgb(255,191,0) linear-gradient(90deg, rgba(255,191,0,0.7517401392111369) 29%, rgba(255,255,191,1) 100%)",
    },
}))

const About = () => {
    const classes = useStyles()
    return (
        <section className={classes.root}>
            <Container className={classes.container}>
                <Grid container spacing={5}>
                    <Grid item xs={12} md={6} className={classes.image}></Grid>
                    <Grid item xs={12} md={6}>
                        <div className={classes.item}>
                            <Typography variant="h4" marked="center" className={classes.title}>
                                <b>SOBRE NOSOTROS</b>
                                <span className={classes.subrayado} />
                            </Typography>
                            <Typography variant="h6" align="center">
                                {'Nosotros somos Rent Now, 4 chicos de Córdoba inspirados en utilizar la tecnología para facilitarnos la vida.'}
                                <br></br>
                                {'¿Sentís que tus clientes no se renuevan? ¿Estás interesado en aumentar tu cantidad de turnos '}
                                {'reservados? ¿Te gustaría darte a conocer más? '}
                                <br></br>
                                {'¡Estás en la página correcta! Con Rent Now ya '}
                                {'no es necesario contar solo con los clientes del barrio, tampoco estar pendiente del teléfono '}
                                {'para anotar las reservas de turnos. Aquí podrás organizar tus turnos, estar pendiente de lo que '}
                                {'piensan los usuarios de tu complejo, y lanzar promociones para los días en que el complejo no '}
                                {'tiene el éxito esperado. Con Rent Now tus días serán mucho más fáciles.'}
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </section>
    )
}

export default About