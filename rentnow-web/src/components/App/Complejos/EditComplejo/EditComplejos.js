import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button, CircularProgress, } from "@material-ui/core";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getComplejosById } from "../../../../api/complejos";
import BasicData from 'components/App/Complejos/EditComplejo/Sections/BasicData'
import LinkCustom from "components/utils/LinkCustom/LinkCustom";
import { useParams } from "react-router-dom"
import ImageVisualizer from "components/App/Complejos/EditComplejo/Sections/ImageVisualizer"


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
    boton: {
        marginTop: theme.spacing(3),
    },
    divider: {
        borderTop: "1px solid #BDBDBD",
        marginLeft: theme.spacing(0),
        marginRight: theme.spacing(0),
        marginBottom: theme.spacing(5),
        borderRadius: "0.5px",
    },
    circularProgress: {
        marginTop: theme.spacing(25),
    },
}));



const EditComplejos = () => {
    const classes = useStyles();
    const [complejo, setComplejo] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { idComplejo } = useParams();

    useEffect(() => {
        getComplejosById(idComplejo).then((response) => {
            if (response.status === "OK") {
                setComplejo(response.data);
                setIsLoading(false);
            } else {
                setIsLoading(false);
            }
        });
    }, [idComplejo]);


    return (
        <>
            {isLoading ? (
                <Grid container justify="center" className={classes.circularProgress}>
                    <Grid item>
                        <CircularProgress />
                    </Grid>
                </Grid>
            ) : (
                    <>
                        <ExpansionPanel className={classes.expansionPanel} >
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography variant="h5" className={classes.heading}>Datos Básicos</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Grid item xs={12}>
                                    < hr className={classes.divider} />
                                    <BasicData
                                        complejo={{
                                            nombre: complejo.nombre,
                                            email: complejo.email,
                                            telefono: complejo.telefono,
                                            instagram: complejo.redes.instagram,
                                            facebook: complejo.redes.facebook,
                                            twitter: complejo.redes.twitter
                                        }}
                                    />
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
                                    <ImageVisualizer fotos={complejo.fotos} />
                                </Grid>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        <Grid container spacing={10} justify="center" className={classes.boton}>
                            <Grid item xs={2}>
                                <LinkCustom to={`/app/complejos/${idComplejo}`}>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        color="secondary"
                                    >
                                        Volver
                                    </Button>
                                </LinkCustom>
                            </Grid>
                        </Grid>
                    </>
                )
            }
        </>
    )
}

export default EditComplejos
