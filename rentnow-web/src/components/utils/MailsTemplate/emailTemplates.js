export const emailReservaCancelada = (info) =>
`<p>Hola, ${info.descripcionCliente}:</p>
<p>Tu reserva en el dia y horario ${info.horaInicio} en el espacio ${info.descripcionEspacio} en ${info.descripcionComplejo} fue correctamente CANCELADA.</p>
<p>Para mas información comunicate con el complejo: ${info.descripcionComplejo}.</p>
<p>Gracias.</p>
<p>El equipo de Rent Now</p>`;

export const emailReservaConfirmada = (info) =>
`<p>Hola, ${info.descripcionCliente}:</p>
<p>Tu reserva en el dia y horario ${info.horaInicio} en el espacio ${info.descripcionEspacio} en ${info.descripcionComplejo} fue CONFIRMADA.</p>
<p>Recordá presentarte unos 15 minutos antes en el dia y horario pactado.</p>
<p>Para mas información comunicate con el complejo: ${info.descripcionComplejo}.</p>
<p>Gracias.</p>
<p>El equipo de Rent Now</p>`;
