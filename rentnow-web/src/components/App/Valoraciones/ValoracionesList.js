import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import {
	Typography,
	Grid,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from "@material-ui/lab";
import { useParams } from "react-router-dom";
import { getValoracionesByComplejoId } from "../../../api/valoraciones";

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

export default function ValoracionesList() {
	const [valoraciones, setValoraciones] = useState([]);
	const { idComplejo } = useParams();
	const classes = useStyles();

	useEffect(() => {
		getValoracionesByComplejoId(idComplejo).then(response => {
			if(response.status === "OK") {
				setValoraciones(response.data)
			} else {
				console.log(response.error)
			}
		})
	},[])

	const customRender = (value) => {
		return <Rating readOnly value={value.puntaje} />;
	};

	return (
		<>
			<MaterialTable
				title="VALORACIONES"
				data={valoraciones}
				columns={[
					{ title: 'FECHA', field: 'fecha', type: 'datetime' },
					{ title: 'CLIENTE', field: 'cliente.nombre' },
					{ title: 'APELLIDO', field: 'cliente.apellido' },
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
					body: { emptyDataSourceMessage: '¡No existen valoraciones en este complejo!' },
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
