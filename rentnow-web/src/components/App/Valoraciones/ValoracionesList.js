import React, { useState, useEffect } from 'react';
import Datepicker from 'react-datepicker';
import MaterialTable from 'material-table';
import {
	TextField,
	InputAdornment,
	ExpansionPanelDetails,
	ExpansionPanel,
	ExpansionPanelSummary,
	Typography,
	Grid,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import DateRangeIcon from '@material-ui/icons/DateRange';
import es from 'date-fns/locale/es';
import { Alert, AlertTitle } from "@material-ui/lab";

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
		width: '100%',
		border: '1px solid rgba(0, 0, 0, .125)',
		backgroundColor: '#FAFAFA',
		marginBottom: theme.spacing(3),
	},
	container: {
		marginTop: theme.spacing(2),
		marginBottom: theme.spacing(2),
	  },
}));

const valoraciones = [
	{
		puntaje: 5,
		fecha: '10/8/2021',
		comentario: 'Buenisimo el complejo, canchas bien cuidadas y ambiente muy sano',
		cliente: {
			idCliente: '123123asjdajdj',
			nombre: 'Facundo Villard',
		},
		idReserva: '123128sjfaksdkjh234',
	},
	{
		puntaje: 1,
		fecha: '10/12/2021',
		comentario: '',
		cliente: {
			idCliente: '123123asjdajdj',
			nombre: 'Steven Spielberg',
		},
		idReserva: '123128sjfaksdkjh234',
	},
	{
		puntaje: 3,
		fecha: '10/11/2021',
		comentario: 'Regular, tirando a bueno... ',
		cliente: {
			idCliente: '123123asjdajdj',
			nombre: 'Roberto Motoneta',
		},
		idReserva: '123128sjfaksdkjh234',
	},
];

export default function ValoracionesList() {
	const classes = useStyles();

	const customRender = (value) => {
		return <Rating readOnly value={value.puntaje} />;
	};

	return (
		<>
			<ExpansionPanel className={classes.expansionPanel} expanded={true}>
				<ExpansionPanelSummary aria-controls="filtros" id="filtros">
					<Typography className={classes.heading}>
						<b>FILTROS</b>
					</Typography>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails>
					<Grid container direction="row" justify="center" alignItems="center" spacing={5}>
						<Grid item md={3} xs={6}></Grid>
					</Grid>
				</ExpansionPanelDetails>
			</ExpansionPanel>
			<MaterialTable
				title="VALORACIONES"
				data={valoraciones}
				columns={[
					{ title: 'FECHA', field: 'fecha', type: 'datetime' },
					{ title: 'CLIENTE', field: 'cliente.nombre' },
					{
						title: 'PUNTAJE',
						field: 'puntaje',
						render: (value) => customRender(value),
					},
				]}
				detailPanel={[
					{
						tooltip: 'Ver comentario',
						render: (rowData) => (
							<div className={classes.container}>
								{rowData.comentario !== '' ? (
									<Typography gutterBottom align="center">
										<b>Descripción: </b>{rowData.comentario}
									</Typography>
								) : (
									<Grid
										container
										justify="center"
									>
										<Alert severity="info">
											<AlertTitle>El cliente no ha proporcionado una descripción de su puntaje</AlertTitle>
										</Alert>
									</Grid>
								)}
							</div>
						),
					},
				]}
				options={{
					grouping: true,
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
					body: { emptyDataSourceMessage: '¡No existen reservas en la fecha seleccionada!' },
					grouping: {
						placeholder: 'Arrastre alguna columna aquí para agrupar datos',
						groupedBy: 'Agrupando por: ',
					},
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
				}}
			/>
		</>
	);
}
