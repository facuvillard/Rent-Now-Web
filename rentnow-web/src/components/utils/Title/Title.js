import React from 'react'
import { Container, makeStyles, Typography } from '@material-ui/core'

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
}))

const Title = (props) => {
    const classes = useStyles()
    return (
        <section className={classes.root}> 
        <Container className={classes.container}>
          <Typography variant="h5">
            {props.titulo}
          </Typography>
        </Container>
        </section>
    )
}

export default Title