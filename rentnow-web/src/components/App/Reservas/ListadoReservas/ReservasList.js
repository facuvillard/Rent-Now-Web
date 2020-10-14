import React, { useState, useEffect } from 'react'
import Datepicker from "react-datepicker";
import MaterialTable from "material-table";
import {
    TextField,
    InputAdornment,
    ExpansionPanelDetails,
    ExpansionPanel,
    ExpansionPanelSummary,
    Typography,
    Grid,
    Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DateRangeIcon from "@material-ui/icons/DateRange";
import moment from "moment";
import { getReservasBetweenTwoDates } from "api/reservas";
import { useParams } from "react-router-dom";
import Chip from '@material-ui/core/Chip';
import { colorsByEstado } from 'constants/reservas/constants'

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    expansionPanel: {
        width: "100%",
        border: "1px solid rgba(0, 0, 0, .125)",
        backgroundColor: "#FAFAFA",
        marginBottom: theme.spacing(3),
    },
}))

const ReservasList = () => {
    const [reservas, setReservas] = useState([]);
    const [fecha, setFecha] = useState(moment().toDate());
    const classes = useStyles();
    const { idComplejo } = useParams();

    useEffect(() => {
        getReservasBetweenTwoDates(fecha, idComplejo, setReservas)
    }, [fecha, idComplejo, setReservas])
    
    const handleFiltrarReservas = () => {
        getReservasBetweenTwoDates(fecha, idComplejo, setReservas)
        // .then((response) => {
        //     if (response.status === "OK") {
        //         setReservas(response.data)
        //     } else {
        //         console.log(response.error)
        //     }
        // })
    }

    function customRender(value, renderType, renderFunc, field, ...args) {
        if (renderType === 'row') {
            console.log(value)
            return <Chip label={value.estado} style={{ backgroundColor: colorsByEstado[value.estado], color: '#FAFAFA' }} />
        }
        if (renderType === 'group') {
            return <Chip label={value} style={{ backgroundColor: colorsByEstado[value], color: '#FAFAFA' }} />
        }
    }

    //normal render function
    function renderCellData(status) {
        //do stuff
    }

    return (
        <>
            <ExpansionPanel className={classes.expansionPanel} expanded={true}>
                <ExpansionPanelSummary
                    aria-controls="filtros"
                    id="filtros"
                >
                    <Typography className={classes.heading}><b>FILTROS</b></Typography>
                    <Typography className={classes.secondaryHeading}>Seleccione un mes y año a filtrar</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        spacing={5}
                    >
                        <Grid item md={3} xs={6}>
                            <Datepicker
                                selected={fecha}
                                onChange={(date) => setFecha(date)}
                                dateFormat="MM/yyyy"
                                showMonthYearPicker
                                customInput={
                                    <TextField
                                        label="Fecha Hasta"
                                        fullWidth
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="start">
                                                    <DateRangeIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                } />
                        </Grid>
                        <Grid item md={3} xs={6}>
                            <Button
                                onClick={handleFiltrarReservas}
                                variant="contained"
                                color="primary"
                            >
                                Filtrar
                        </Button>
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <MaterialTable
                data={reservas}
                columns={[
                    { title: "Nombre Espacio", field: "espacio.descripcion" },
                    { title: "Fecha Inicio", field: "fechaInicioString", type: "datetime" },
                    { title: "Fecha Fin", field: "fechaFinString", type: "datetime" },
                    {
                        title: "Estado",
                        field: "estado",
                        render: (value, renderType) => customRender(value, renderType, renderCellData, 'estado')




                    },
                    { title: "Cliente", field: "nombreCompleto" },
                    { title: "Telefono", field: "cliente.numTelefono" }
                ]}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Modificar Reserva',
                        onClick: (event, rowData) => {
                            console.log(rowData)
                        }
                    }
                ]}
                options={{
                    grouping: true,
                    actionsColumnIndex: -1,
                    pageSize: 10,
                    pageSizeOptions: [10],
                    rowStyle: {
                        backgroundColor: "#FAFAFA",
                    },
                    headerStyle: {
                        backgroundColor: "#656b74",
                        color: "#FFF",
                    },
                }}
                localization={{
                    grouping: {placeholder:"Arrastre alguna columna aqui para agrupar"}
                }}
            />
        </>
    )
}

export default ReservasList


