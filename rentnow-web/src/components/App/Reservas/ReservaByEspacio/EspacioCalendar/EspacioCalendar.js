import React, { useState, useEffect } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { getReservasSixWeeksAndEspacioRealTime, updateReservaStateAndPayment } from "api/reservas";
import UpdateReserva from "components/App/Reservas/ReservaByEspacio/UpdateReserva"
import Dialog from "components/utils/Dialog/Dialog";
import AlertCustom from "components/utils/AlertCustom/AlertCustom";
import {colorsByEstado} from 'constants/reservas/constants'



const EspacioCalendar = ({ espacio }) => {
  const [reservas, setReservas] = useState([]);
  const [fecha, setFecha] = useState(moment().toDate());
  moment.locale("es");
  const localizer = momentLocalizer(moment);

  const [dialogContent, setDialogContent] = useState(null);
  const [open, setOpen] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlertProps] = useState({});

  const formatReservas = (reservas) => {
    let formattedReservas = [];
    if (reservas) {
      formattedReservas = reservas.map((reserva) => ({
        id: reserva.id,
        start: reserva.fechaInicio.toDate(),
        end: reserva.fechaFin.toDate(),
        title: reserva.cliente.apellido + ", " + reserva.cliente.nombre,
        esFijo: reserva.esFijo,
        estaPagado: reserva.estaPagado,
        monto: reserva.monto,
        espacio: reserva.espacio,
        complejo: reserva.complejo,
        estados: reserva.estados,
        telefonoCliente: reserva.cliente.numTelefono
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
        eventPropGetter= {function(event, start, end, isSelected) {
          const estadoReserva = event.estados[event.estados.length -1].estado
          var backgroundColor = colorsByEstado[estadoReserva];
          var style = {
              backgroundColor: backgroundColor,
              borderRadius: '3px',
              opacity: 0.8,
              color: 'black',
              fontWeight: 'bold',
              border: '1px solid black',
          };
          return {
              style: style
          };
      }}
        onSelectEvent={event => updateDialogHandler(event)}
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
  );
};

export default EspacioCalendar;
