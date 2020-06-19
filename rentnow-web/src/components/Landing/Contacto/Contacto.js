import React, {useState} from 'react'
import {makeStyles,Typography,Grid, TextField, Select, InputLabel, MenuItem,FormControl, Button, Container} from '@material-ui/core'
import imagenFondo from "../../../assets/img/Landing/fondo-image.png"

const useStyles = makeStyles(theme =>  ({
    root: {
        backgroundColor: '#FAFAFA',
        display: 'flex',
        overflow: 'hidden',
    },

    container: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(15),
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
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
    imagenFondo: {
        pointerEvents: 'none',
        position: 'absolute',
        top: -180,
        opacity: 0.20,
    },


}))
 const Contacto = () => {
    const classes = useStyles();
    const [dataContacto, setDataContacto] = useState({})
    
    const handleTextFieldChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setDataContacto(oldData => ({
            ...oldData, [name] : value
        }))
    }

    return (
        <section className={classes.root}>
            <Container className={classes.container}>
                <img
                    src={imagenFondo}
                    className={classes.imagenFondo}
                    alt=""
                />
                <Typography variant="h4" marked="center" align='center' className={classes.title} component="h2">
                    <b>CONTACTATE CON NOSOTROS</b>
                    <span className={classes.subrayado} />
                </Typography>
            {/* <Paper className={classes.paper}> */}
       
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} >
                        <TextField 
                         required
                         id="nombres"
                         name="nombres"
                         label="Nombres"
                         fullWidth
                         autoComplete="given-name"
                         onChange={(e) => { handleTextFieldChange(e)}}
                        />
                    </Grid>   
                    <Grid item xs={12} sm={6} >
                        <TextField 
                         required
                         id="apellido"
                         name="apellido"
                         label="Apellido"
                         fullWidth
                         autoComplete="family-name"
                         onChange={(e) => { handleTextFieldChange(e)}}
                         />
                    </Grid>   
                    <Grid item xs={12} sm={12} >
                        <TextField 
                            required
                            id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            autoComplete="email"
                            onChange={(e) => { handleTextFieldChange(e)}}
                        />
                    </Grid>   
                    <Grid item xs={12} sm={6} >
                        <FormControl fullWidth>
                            <InputLabel id="provincia-select-label">Provincia</InputLabel>
                            <Select
                                labelId="provincia-select-label"
                                id="provincia-select"
                            >
                                <MenuItem>Cordoba</MenuItem>
                                <MenuItem>Buenos Aires</MenuItem>
                                <MenuItem>Mendoza</MenuItem>
                                <MenuItem>Misiones</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>   
                    <Grid item xs={12} sm={6} >
                        <FormControl fullWidth>
                            <InputLabel id="ciudad-select-label">Ciudad</InputLabel>
                            <Select
                            labelId="ciudad-select-label"
                            id="ciudad-select"
                            >
                                <MenuItem>Cordoba</MenuItem>
                                <MenuItem>Carlos paz</MenuItem>
                                <MenuItem>Villa Gral. Belgrano</MenuItem>
                                <MenuItem>Potrero de garay</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>   
                    <Grid item xs={12} sm={12} >
                        <TextField 
                            required
                            id="mensaje"
                            name="mensaje"
                            label="Mensaje"
                            fullWidth
                            multiline
                            rows={6}
                            onChange={(e) => { handleTextFieldChange(e)}}
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <Button color='primary' variant='contained' fullWidth>Enviar</Button>
                    </Grid>  
                </Grid>
            {/* </Paper> */}
            </Container>
        </section>
        
    )
}
export default Contacto