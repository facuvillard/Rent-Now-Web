import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from "@material-ui/core";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    expansionPanel: {
        width: '100%',
        border: '1px solid rgba(0, 0, 0, .125)',
        backgroundColor: '#FAFAFA',
        marginBottom: theme.spacing(3),
    },
    heading: {
        position: "center"
    },
    botones: {
        marginTop: theme.spacing(3),
    },
    divider: {
        borderTop: "1px solid #BDBDBD",
        marginLeft: theme.spacing(0),
        marginRight: theme.spacing(0),
        marginBottom: theme.spacing(5),
        borderRadius: "0.5px",
    },
}));

const EditComplejos = () => {
    const classes = useStyles();
    return (
        <>
            <ExpansionPanel className={classes.expansionPanel} >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="h5" className={classes.heading}>Datos Basicos</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid item xs={12}>
                        < hr className={classes.divider} />
                        <Typography>
                            Aqui van los DATOS BASICOS
                    </Typography>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel className={classes.expansionPanel} >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="h5" className={classes.heading}>Ubicación</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid item xs={12}>
                        < hr className={classes.divider} />
                        <Typography>
                            Aqui van los datos de UBICACION
                    </Typography>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel className={classes.expansionPanel} >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="h5" className={classes.heading}>Dias y Horarios</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid item xs={12}>
                        < hr className={classes.divider} />
                        <Typography>
                            Aqui van los datos de DIAS Y HORARIOS
                    </Typography>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel className={classes.expansionPanel} >
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="h5" className={classes.heading}>Fotos</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid item xs={12}>
                        < hr className={classes.divider} />
                        <Typography>
                            Aqui van las FOTOS
                    </Typography>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <Grid container spacing={10} justify="center" className={classes.botones}>
                <Grid item xs={2}>
                    <Button
                        variant="contained"
                        fullWidth
                        color="secondary"
                    >
                        Cancelar
              </Button>
                </Grid>
                <Grid item xs={2} >
                    <Button
                        variant="contained"
                        fullWidth
                        type="submit"
                        color="primary"
                    >
                        Guardar
              </Button>
                </Grid>
            </Grid>
        </>
    )
}

export default EditComplejos
