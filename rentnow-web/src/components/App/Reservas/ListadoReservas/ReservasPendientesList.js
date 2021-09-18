import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import { getAllReservasPendientesByIdComplejo } from "../../../../api/reservas";
import { useParams } from 'react-router-dom';


const ReservasPendientesList = props => {
	const [reservas, setReservas] = useState([])
	const { idComplejo } = useParams();

	useEffect(() => {
		getAllReservasPendientesByIdComplejo(idComplejo, setReservas).then((response) => {
			setReservas(response.data)
		})
	}, [])
	return (
		<MaterialTable
			title="Reservas pendientes de aprobación"
			data={reservas}
			columns={[
				{title: 'ESPACIO', field: 'espacio.descripcion'},
				{title: 'FECHA REGISTRO', field: 'fechaRegistroString', type: 'datetime'},
				{title: 'FECHA INICIO', field: 'fechaInicioString', type: 'datetime'},
				{title: 'FECHA FIN', field: 'fechaFinString', type: 'datetime'},
				{title: 'APELLIDO', field: 'cliente.apellido'},
				{title: 'NOMBRE', field: 'cliente.nombre'},
				{title: 'TELEFONO', field: 'cliente.celular'},
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
				body: {emptyDataSourceMessage: '¡No existen reservas pendientes de aprobación!'},
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
	)
}


export default ReservasPendientesList;
