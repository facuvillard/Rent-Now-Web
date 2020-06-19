import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Container, Typography, Grid, Link } from '@material-ui/core'
import argentinaImage from "../../../assets/img/Landing/argentina-logo.png"
import IconButton from '@material-ui/core/IconButton';
import Facebook from '@material-ui/icons/Facebook';
import Twitter from '@material-ui/icons/Twitter';
import Instagram from '@material-ui/icons/Instagram';




const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: theme.palette.primary.main,
    },
    container: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: 'flex',
    },
    iconsWrapper: {
        height: 120,
    },
    icons: {
        display: 'flex',
    },
    icon: {
        width: 45,
        height: 45,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing(1),

    },
    list: {
        margin: 0,
        listStyle: 'none',
        padding: 0,
    },
    listItem: {
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(0.5),
    },
    language: {
        marginTop: theme.spacing(1),
        width: 150,
    },
    subrayado: {
        height: 2,
        width: 20,
        display: 'block',
        background: "rgb(0,0,0) linear-gradient(90deg, rgba(0,0,0,0.7517401392111369) 0%, rgba(0,0,0,1) 0%)",
    },
}));

function Copyright() {
    return (
        <React.Fragment>
            {'© '}
            <Link color="inherit" href="https://material-ui.com/">
                RentNow
        </Link>{' '}
            {new Date().getFullYear()}
        </React.Fragment>
    );
}

const Footer = () => {
    const classes = useStyles();
    return (

        <Typography component="footer" className={classes.root}>
            <Container className={classes.container}>
                <Grid container spacing={5}>
                    <Grid item xs={6} sm={4} md={3}>
                        <Grid
                            container
                            direction="column"
                            justify="flex-end"
                            className={classes.iconsWrapper}
                            spacing={2}
                        >
                            <Grid item className={classes.icons}>
                                <IconButton color="inherit" href="https://www.facebook.com/juan.bergues" aria-label="Facebook">
                                    <Facebook />
                                </IconButton>
                                <IconButton color="inherit" href="https://twitter.com/JuanBergues" aria-label="Twitter">
                                    <Twitter />
                                </IconButton>
                                <IconButton color="inherit" href="https://www.instagram.com/juanpablobergues" aria-label="Instagram">
                                    <Instagram />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <Copyright />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} sm={8} md={4}>
                        <Typography variant="h6" marked="left" gutterBottom>
                            <b>PAISES</b>
                            <span className={classes.subrayado} />
                        </Typography>
                        <img className={classes.icon} src={argentinaImage} alt="Argentina" />
                    </Grid>
                </Grid>
            </Container>
        </Typography>
    )
}

export default Footer