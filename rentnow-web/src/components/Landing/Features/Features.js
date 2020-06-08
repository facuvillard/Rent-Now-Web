import React from 'react'
import { Container, makeStyles, Grid, Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles(theme => ({
    container: {
        height: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 200,
        width: 200,
    },
    title: {
        marginBottom: "70px",
        textAlign : "center",
    }, 
}))
const Features = () => {
    const classes = useStyles()
    return (

        
        <Grid container className={classes.root}>
            <Grid item xs={12} >
                <Typography className={classes.title} variant="h2"> Caracteristicas </Typography>
            </Grid>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={5}>
                    {[0, 1, 2, 3, 4].map((value) => (
                        <Grid key={value} item>
                            <Paper className={classes.paper} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>

        </Grid>

    )
}

export default Features