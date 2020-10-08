import React, { useState, useEffect } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { getReservasSixWeeksAndEspacioRealTime } from "api/reservas";

const EspacioCalendar = ({ espacio }) => {
  const [reservas, setReservas] = useState([]);
  const [fecha, setFecha] = useState(moment().toDate());
  moment.locale("es");
  const localizer = momentLocalizer(moment);

  const formatReservas = (reservas) => {
    let formattedReservas = [];
    if (reservas) {
      formattedReservas = reservas.map((reserva) => ({
        id: reserva.id,
        start: reserva.fechaInicio.toDate(),
        end: reserva.fechaFin.toDate(),
        title: "RESERVA",
      }));
    }
    setReservas(formattedReservas);
  };

  const dateChange = (date) => {
    if (moment(date).month() !== moment(fecha).month()) {
      setFecha(moment(date).toDate());
    }
  };

  useEffect(() => {
    getReservasSixWeeksAndEspacioRealTime(
      fecha,
      espacio.id,
      formatReservas
    )
  }, [espacio, fecha]);

  return (
    <>
      <Calendar
        style={{
          fontFamily: "Segoe UI",
          backgroundColor: "#FAFAFA",
          marginBottom: "1rem",
          height: "70vh",
        }}
        step={60}
        timeslots={2}
        localizer={localizer}
        defaultView={Views.DAY}
        defaultDate={fecha}
        onNavigate={dateChange}
        events={reservas}
        min={moment(fecha).hour(5).minutes(0).toDate()}
        formats={{
          timeGutterFormat: "HH:mm",
          eventTimeRangeFormat: (dates) => {
            return `${moment(dates.start).format("HH:mm")} - ${moment(
              dates.end
            ).format("HH:mm")}`;
          },
        }}
      />
    </>
  );
};

export default EspacioCalendar;
