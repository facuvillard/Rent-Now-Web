import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Container, Typography } from '@material-ui/core'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ThumbsUpDownOutlinedIcon from '@material-ui/icons/ThumbsUpDownOutlined';
import HouseOutlined from '@material-ui/icons/HouseOutlined';
import EventAvailableOutlined from '@material-ui/icons/EventAvailableOutlined'


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        overflow: 'hidden',
        backgroundColor: '#FAFAFA',
    },
    container: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(15),
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
    expansionPanel: {
        width: '100%',
        border: '1px solid rgba(0, 0, 0, .125)',
        backgroundColor: '#FAFAFA',
    },
    heading: {
        position: "center"
    },
    tab: {
        width: '100%',
        backgroundColor: '#FAFAFA',
    },
}));

const Pregunta = (props) => {
    const classes = useStyles();
    return (
        <ExpansionPanel className={classes.expansionPanel} >
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.heading}>{props.contenido.pregunta}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
                        {props.contenido.respuesta}
                </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )
}

const preguntasComplejo = [
    {
        id: 1,
        pregunta: '¿Puedo registrar más de un complejo con el mismo usuario?',
        respuesta: 'Si, Rent Now está hecho para que puedas registrar varios complejos con un mismo usuario.',
    },
    {
        id: 2,
        pregunta: '¿Qué pasa si una cancha no está disponible por reparación u otro motivo?',
        respuesta: 'Todos los espacios pueden tener diferentes estados: Disponible, Ocupado, En Reparación. Estos podrán ser vistos por los usuarios',
    },
]

const preguntasTurnos = [
    {
        id: 1,
        pregunta: '¿Cómo se agendan los turnos en el calendario?',
        respuesta: 'Una vez que los usuarios elijan un espacio, y un turno según tu calendario de turnos, te llegará una notificación en la cual debes confirmar el turno deseado, y listo, el turno quedará agendado.',
    },
    {
        id: 2,
        pregunta: '¿Qué pasa si me confirman un turno y luego no vienen?',
        respuesta: 'El usuario será penalizado no pudiendo reservar ningún turno ni aprovechar promociones por 2 semanas.',
    },
    {
        id: 3,
        pregunta: '¿Pueden quedar registrados los turnos fijos? ¿Y registrar turnos realizados fuera de la aplicación?',
        respuesta: 'Si, el administrador del complejo podrá registrar los turnos realizados por otro medio, aunque las de la app se registran automaticamente.',
    },

]

const preguntasValoraciones = [
    {
        id: 1,
        pregunta: '¿Podré responder las valoraciones?',
        respuesta: 'Si, se pueden responder todas las valoraciones de los usuarios.',
    },
    {
        id: 2,
        pregunta: '¿Sabré quien realiza la valoración?',
        respuesta: 'Si, el nombre del usuario quedará registrado junto con su valoración.',
    },
]

const FAQ = () => {
    const classes = useStyles();
    return (
        <section className={classes.root}>

            <Container className={classes.container}>
                <Typography variant="h4" marked="center" className={classes.title} component="h2">
                    <b>PREGUNTAS FRECUENTES</b>
                    <span className={classes.subrayado} />
                </Typography>
                <List component="nav" className={classes.tab} aria-label="">
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <EventAvailableOutlined />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText>                            
                            <b>TURNOS</b>
                        </ListItemText>
                    </ListItem>
                    {preguntasTurnos.map((contenido)=>(<Pregunta contenido={contenido} key={contenido.id}/>))}
                    <Divider />
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <HouseOutlined />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText>
                            <b>COMPLEJOS</b>
                        </ListItemText>
                    </ListItem>
                    {preguntasComplejo.map((contenido)=>(<Pregunta contenido={contenido} key={contenido.id}/>))}
                    <Divider />
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <ThumbsUpDownOutlinedIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText>
                            <b>VALORACIONES</b>
                        </ListItemText>
                    </ListItem>
                    {preguntasValoraciones.map((contenido)=>(<Pregunta contenido={contenido} key={contenido.id}/>))}
                    <Divider />
                </List>
            </Container>
        </section>
    )
}

export default FAQ