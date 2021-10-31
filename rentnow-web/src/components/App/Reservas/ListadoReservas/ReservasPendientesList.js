import firebase from "firebase";
import MaterialTable from "material-table";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { getAllReservasPendientesByIdComplejo, updateReservaStateAndPayment } from "../../../../api/reservas";
import AlertCustom from "../../../utils/AlertCustom/AlertCustom";
import { Popover, IconButton, Grid, Typography,  Divider } from '@material-ui/core';
import HelpOutline from '@material-ui/icons/HelpOutline'

const ReservasPendientesList = () => {
	const [reservas, setReservas] = useState([])
	const [refresh, setRefresh] = useState(true);
	const [openAlert, setOpenAlert] = useState(false);
	const [alertProps, setAlertProps] = useState({})
	const [loading, setLoading] = useState(false);
	const { idComplejo } = useParams();
	const [anchorEl, setAnchorEl] = useState(null);


	useEffect(() => {
		if (refresh) {
			getAllReservasPendientesByIdComplejo(idComplejo, setReservas).then((response) => {
				setReservas(response.data)
				setRefresh(false)
			})
		}
	}, [refresh])

	const fechaActualizacion = new firebase.firestore.Timestamp.fromDate(moment().toDate());
	const onCancelClick = (event, rowData) => {
		setLoading(true)
		let estados = rowData.estados;
		estados.push({
			estado: "CANCELADA",
			fecha: fechaActualizacion,
			motivo: "El administrador del complejo ha rechazado la reserva."
		})
		let reservaToUpdate = {
			estadoActual: "CANCELADA",
			estados: estados,
		}
		updateReservaStateAndPayment(reservaToUpdate, rowData.id).then((response) => {
			if (response.status === 'OK') {
				setAlertProps({
					type: 'success',
					text: "Reserva cancelada con éxito!",
				});
			} else {
				setAlertProps({
					type: 'error',
					text: "Error al cancelar la reserva",
				})
			}
			setOpenAlert(true);
			setRefresh(true);
			setLoading(false)
		});
	}

	const onConfirmClick = (event, rowData) => {
		setLoading(true);
		let estados = rowData.estados;
		estados.push({
			estado: "CONFIRMADA",
			fecha: fechaActualizacion,
			motivo: "El administrador del complejo ha confirmado la reserva."
		});
		let reservaToUpdate = {
			estadoActual: "CONFIRMADA",
			estados: estados,
		};
		updateReservaStateAndPayment(reservaToUpdate, rowData.id).then((response) => {
			if (response.status === 'OK') {
				setAlertProps({
					type: 'success',
					text: "Reserva confirmada con éxito!",
				});
			} else {
				setAlertProps({
					type: 'error',
					text: "Error al confirmar la reserva",
				})
			}
			setOpenAlert(true);
			setRefresh(true);
			setLoading(false)
		});
	}

	const customInfoAsistenciaCliente = (cantidadCreadas, cantidadSinConcurrencia) => {

		const handleHelpClick = (event) => {
			setAnchorEl(event.currentTarget);
		};

		const handleHelpClose = () => {
			setAnchorEl(null);
		};

		const helpOpen = Boolean(anchorEl);
		const id = helpOpen ? 'simple-popover' : undefined;
		return (
			<Grid container
				direction="row"
				justify="center"
				alignItems="center">
				{
					cantidadCreadas && cantidadSinConcurrencia &&
					<div><strong>{cantidadCreadas - cantidadSinConcurrencia}</strong> de <strong>{cantidadCreadas} reservas</strong></div>
				}
				{
					cantidadCreadas && !cantidadSinConcurrencia &&
					<div><strong>{cantidadCreadas}</strong> de <strong>{cantidadCreadas} reservas</strong></div>
				}
				{
					!cantidadCreadas && !cantidadSinConcurrencia &&
					<div>1er reserva del cliente</div>
				}
				<IconButton
					size="small"
					aria-describedby={id}
					onClick={handleHelpClick}
					color='inherit'
				>
					<HelpOutline />
				</IconButton>
				<Popover
					id={id}
					open={helpOpen}
					anchorEl={anchorEl}
					onClose={handleHelpClose}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
					transformOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
				>
					<Grid
						container
						direction="column"
						justify="center"
						alignItems="center"
						style={{ marginTop: '5px',  marginBottom: '5px',  marginLeft: '5px',  marginRight: '5px'}}
					>
						<Typography><strong>Ayuda</strong></Typography>
						<Typography variant='subtitle2'>Se muestra la cantidad de reservas a las que el cliente asistió</Typography>
						<Typography variant='subtitle2'>con respecto a la cantidad de reservas que creó historicamente</Typography>
					</Grid>
				</Popover>
			</Grid>
		)
	}

	return (
		<>
			<MaterialTable
				title="Reservas pendientes de aprobación"
				data={reservas}
				columns={[
					{ title: 'ESPACIO', field: 'espacio.descripcion' },
					{ title: 'FECHA REGISTRO', field: 'fechaRegistroString', type: 'datetime' },
					{ title: 'FECHA INICIO', field: 'fechaInicioString', type: 'datetime' },
					{ title: 'FECHA FIN', field: 'fechaFinString', type: 'datetime' },
					{ title: 'APELLIDO', field: 'cliente.apellido' },
					{ title: 'NOMBRE', field: 'cliente.nombre' },
					{ title: 'TELEFONO', render: (rowData) => rowData.cliente.celular || rowData.cliente.numTelefono },
					{ title: 'ASISTENCIA', render: (rowData) => customInfoAsistenciaCliente(rowData.cliente?.cantidadCreadas, rowData.cliente?.cantidadSinConcurrencia) },
				]}
				actions={[
					{
						icon: 'check',
						tooltip: 'Confirmar reserva',
						onClick: onConfirmClick,
						disabled: loading,
					},
					{
						icon: 'clear',
						tooltip: 'Cancelar reserva',
						onClick: onCancelClick,
						disabled: loading,
					}
				]}
				options={{
					actionsColumnIndex: -1,
					pageSize: 10,
					pageSizeOptions: [10],
					rowStyle: {
						backgroundColor: '#FAFAFA',
					},
					headerStyle: {
						backgroundColor: '#FFF4E5',
					},
					exportButton: true,
				}}
				localization={{
					body: { emptyDataSourceMessage: '¡No existen reservas pendientes de aprobación!' },
					toolbar: {
						exportTitle: 'Exportar como Excel',
						exportName: 'Exportar como Excel',
						searchTooltip: 'Buscar',
						searchPlaceholder: 'Buscar',
					},
					pagination: {
						lastTooltip: 'Ultima Pagina',
						firstTooltip: 'Primera Pagina',
						nextTooltip: 'Siguiente Pagina',
						previousTooltip: 'Pagina Anterior',
						labelDisplayedRows: '{from}-{to} de {count}',
					},
					header: {
						actions: 'ACCIONES'
					}
				}}
			/>
			<AlertCustom
				open={openAlert}
				setOpen={setOpenAlert}
				type={alertProps.type}
				text={alertProps.text}
			/>
		</>)
}


export default ReservasPendientesList;
