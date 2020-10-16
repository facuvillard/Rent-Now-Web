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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DateRangeIcon from "@material-ui/icons/DateRange";
import moment from "moment";
import { getReservasByMonthAndYear, updateReservaStateAndPayment } from "api/reservas";
import { useParams } from "react-router-dom";
import Chip from '@material-ui/core/Chip';
import { colorsByEstado } from 'constants/reservas/constants'
import UpdateReserva from "components/App/Reservas/ReservaByEspacio/UpdateReserva"
import Dialog from "components/utils/Dialog/Dialog";
import AlertCustom from "components/utils/AlertCustom/AlertCustom";
import { Pagination } from '@material-ui/lab';


const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(20),
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

    const [dialogContent, setDialogContent] = useState(null);
    const [open, setOpen] = useState(false);

    const [showAlert, setShowAlert] = useState(false);
    const [alertProps, setAlertProps] = useState({});

    useEffect(() => {
        getReservasByMonthAndYear(fecha, idComplejo, setReservas)
    }, [fecha, idComplejo, setReservas])

    const updateDialogHandler = (reserva) => {
        setDialogContent(
            <UpdateReserva
                updateHandler={(values) => {
                    updateHandler(values);
                }}
                reserva={reserva}
                text="Modificando Reserva"
                setOpen={setOpen}
            />
        );
        setOpen(true);
    };

    const updateHandler = async (values) => {
        const id = values.id
        let reservaToUpdate = {
            estados: values.estados,
            estaPagado: values.estaPagado,
        }
        updateReservaStateAndPayment(reservaToUpdate, id).then((response) => {
            if (response.status === "OK") {
                setAlertProps({
                    type: "success",
                    text: response.message,
                });
                setShowAlert(true);
            } else {
                setAlertProps({
                    type: "error",
                    text: response.message,
                });
                setShowAlert(true);
            }
        });
    }

    const customRender = (value, renderType, renderFunc, field, ...args) => {
        if (renderType === 'row') {
            return <Chip label={value.estado} style={{ backgroundColor: colorsByEstado[value.estado], color: '#FAFAFA' }} />
        }
        if (renderType === 'group') {
            return <Chip label={value} style={{ backgroundColor: colorsByEstado[value], color: '#FAFAFA' }} />
        }
    }

    //normal render function
    const renderCellData = (status) => {
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
                                        label="Mes y Año a Filtrar"
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
                    </Grid>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <MaterialTable
                title="RESERVAS"
                data={reservas}
                columns={[
                    { title: "ESPACIO", field: "espacio.descripcion" },
                    { title: "FECHA INICIO", field: "fechaInicioString", type: "datetime" },
                    { title: "FECHA FIN", field: "fechaFinString", type: "datetime" },
                    {
                        title: "ESTADO",
                        field: "estado",
                        render: (value, renderType) => customRender(value, renderType, renderCellData, 'estado')
                    },
                    { title: "CLIENTE", field: "nombreCompleto" },
                    { title: "TELEFONO", field: "cliente.numTelefono" }
                ]}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Modificar Reserva',
                        onClick: (event, rowData) => {
                            updateDialogHandler(rowData)
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
                        backgroundColor: "#FFF4E5",
                    },
                    exportButton: true,
                }}
                localization={{
                    body: { emptyDataSourceMessage: "¡No existen reservas en la fecha seleccionada!"},
                    grouping: { placeholder: "Arrastre alguna columna aquí para agrupar datos", groupedBy: "Agrupando por: " },
                    toolbar: { exportTitle: "Exportar como Excel", exportName: "Exportar como Excel", searchTooltip: "Buscar", searchPlaceholder: "Buscar" },
                    pagination: { lastTooltip: "Ultima Pagina", firstTooltip: "Primera Pagina", nextTooltip: "Siguiente Pagina", previousTooltip: "Pagina Anterior", labelDisplayedRows: "{from}-{to} de {count}" },
                    header: { actions: "ACCIONES" }
                }}
            />
            <Dialog
                title="Modificar Reserva"
                open={open}
                setOpen={setOpen}
                size="md"
            >
                {dialogContent}
            </Dialog>
            <AlertCustom
                type={alertProps.type}
                text={alertProps.text}
                open={showAlert}
                setOpen={setShowAlert}
            />
        </>
    )
}

export default ReservasList


