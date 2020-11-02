import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Stop from '@material-ui/icons/Stop';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid';
import { estados, colorsByEstado } from 'constants/reservas/constants'


const StateReferences = () => {
    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Grid item md={6}>
                <Typography><u><b>REFERENCIAS</b></u></Typography>
            </Grid>
            <Grid item md={12}>
                <List dense={true}>
                    <ListItem>
                        <ListItemIcon>
                            <Stop style={{ color: colorsByEstado[estados.confirmada] }} />
                        </ListItemIcon>
                        <ListItemText primary={estados.confirmada} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Stop style={{ color: colorsByEstado[estados.enHorario] }} />
                        </ListItemIcon>
                        <ListItemText primary={estados.enHorario} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Stop style={{ color: colorsByEstado[estados.enCurso] }} />
                        </ListItemIcon>
                        <ListItemText primary={estados.enCurso} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Stop style={{ color: colorsByEstado[estados.finalizada] }} />
                        </ListItemIcon>
                        <ListItemText primary={estados.finalizada} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Stop style={{ color: colorsByEstado[estados.cancelada] }} />
                        </ListItemIcon>
                        <ListItemText primary={estados.cancelada} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <Stop style={{ color: colorsByEstado[estados.sinConcurrencia] }} />
                        </ListItemIcon>
                        <ListItemText primary={estados.sinConcurrencia} />
                    </ListItem>
                </List>
            </Grid>
        </Grid>

    )
}

export default StateReferences
