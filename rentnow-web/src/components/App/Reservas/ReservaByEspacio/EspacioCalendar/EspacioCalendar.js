import React, { useState, useEffect } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import { getReservasSixWeeksAndEspacioRealTime } from "api/reservas";
import UpdateReserva from "components/App/Reservas/ReservaByEspacio/UpdateReserva"
import Dialog from "components/utils/Dialog/Dialog";
import AlertCustom from "components/utils/AlertCustom/AlertCustom";
import { updateReservaStateAndPayment } from 'api/reservas'


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
        title: "RESERVA",
        esFijo: reserva.esFijo,
        estaPagado: reserva.estaPagado,
        monto: reserva.monto,
        espacio: reserva.espacio,
        complejo: reserva.complejo,
        estado: reserva.estado,
        estados: reserva.estados,
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
    let posiblesEstados = []
    switch (reserva.estado) {
      case "Confirmado":
        posiblesEstados = ["Confirmado", "En Curso", "Cancelado", "Sin Concurrencia"]
        break;
      case "En Curso":
        posiblesEstados = ["En Curso", "Finalizado", "Cancelado"]
        break;
      case "Creado":
        posiblesEstados = ["Creado", "Confirmado", "Cancelado"]
        break;
      case "Cancelado":
        posiblesEstados = ["Cancelado"]
        break;
      case "Sin Concurrencia":
        posiblesEstados = ["Sin Concurrencia"]
        break;
    }
    console.log(reserva)
    setDialogContent(
      <UpdateReserva
        updateHandler={(values) => {
          updateHandler(values);
        }}
        reserva={reserva}
        text="Modificando Reserva"
        setOpen={setOpen}
        posiblesEstados={posiblesEstados}
      />
    );
    setOpen(true);
  };

  const updateHandler = async (values) => {
    const id = values.id
    let reservaToUpdate = {
      estado : values.estado,
      estaPagado : values.estaPagado,
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
