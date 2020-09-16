import React, { useState, useEffect } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import { useFormikContext } from "formik";

function Event({ event }) {
  return (
    <span>
      <strong>{event.title}</strong>
      {event.desc && ":  " + event.desc}
    </span>
  );
}

const Horarios = () => {
  const [events, setEvents] = useState([]);
  const DragAndDropCalendar = withDragAndDrop(Calendar);
  const { setFieldValue } = useFormikContext();
  moment.locale("es");
  const localizer = momentLocalizer(moment);
  const daysMap = [
    { dayId: 1, dayDescription: "Domingo" },
    { dayId: 2, dayDescription: "Lunes" },
    { dayId: 3, dayDescription: "Martes" },
    { dayId: 4, dayDescription: "Miercoles" },
    { dayId: 5, dayDescription: "Jueves" },
    { dayId: 6, dayDescription: "Viernes" },
    { dayId: 7, dayDescription: "Sabado" },
    { dayId: 8, dayDescription: "Feriados" },
  ];

  const eventStyleGetter = (event, start, end, isSelected) => {
    var backgroundColor = "#" + event.hexColor;
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  };

  useEffect(() => {
    setEvents([
      {
        id: 1,
        title: "Cerrado",
        resourceTitle: "Domingo",
        abre: false,
        start: new Date("Sat Sep 12 2020 00:00:00 "),
        end: new Date("Sat Sep 12 2020 00:00:00  "),
        resourceId: 1,
        hexColor: "F44336",
      },
      {
        id: 2,
        title: "Cerrado",
        resourceTitle: "Lunes",
        abre: false,
        start: new Date("Sat Sep 12 2020 00:00:00 "),
        end: new Date("Sat Sep 12 2020 00:00:00 "),
        resourceId: 2,
        hexColor: "F44336",
      },
      {
        id: 3,
        title: "Cerrado",
        resourceTitle: "Martes",
        abre: false,
        start: new Date("Sat Sep 12 2020 00:00:00 "),
        end: new Date("Sat Sep 12 2020 00:00:00 "),
        resourceId: 3,
        hexColor: "F44336",
      },
      {
        id: 4,
        title: "Cerrado",
        resourceTitle: "Miercoles",
        abre: false,
        start: new Date("Sat Sep 12 2020 00:00:00 "),
        end: new Date("Sat Sep 12 2020 00:00:00 "),
        resourceId: 4,
        hexColor: "F44336",
      },
      {
        id: 5,
        title: "Cerrado",
        resourceTitle: "Jueves",
        abre: false,
        start: new Date("Sat Sep 12 2020 00:00:00 "),
        end: new Date("Sat Sep 12 2020 00:00:00"),
        resourceId: 5,
        hexColor: "F44336",
      },
      {
        id: 6,
        title: "Cerrado",
        resourceTitle: "Viernes",
        abre: false,
        start: new Date("Sat Sep 12 2020 00:00:00 "),
        end: new Date("Sat Sep 12 2020 00:00:00 "),
        resourceId: 6,
        hexColor: "F44336",
      },
      {
        id: 7,
        title: "Cerrado",
        resourceTitle: "Sabado",
        abre: false,
        start: new Date("Sat Sep 12 2020 00:00:00"),
        end: new Date("Sat Sep 12 2020 00:00:00 "),
        resourceId: 7,
        hexColor: "F44336",
      },
      {
        id: 8,
        title: "Cerrado",
        resourceTitle: "Feriados",
        abre: false,
        start: new Date("Sat Sep 12 2020 00:00:00"),
        end: new Date("Sat Sep 12 2020 00:00:00"),
        resourceId: 8,
        hexColor: "F44336",
      },
    ]);
  }, []);

  useEffect(() => {
    const horarios = {};
    events.forEach((event) => {
      horarios[event.resourceTitle] = {
        abre: event.abre,
        desde: moment(event.start).format("HH:mm "),
        hasta: moment(event.end).format("HH:mm "),
      };
    });
    setFieldValue("horarios", horarios);
  }, [events, setFieldValue]);

  const nuevoEvento = (event) => {
    const abre = !!(event.box || event.bounds);
    setEvents((old) => {
      const newArray = old.filter(
        (turno) => turno.resourceId !== event.resourceId
      );
      return [
        ...newArray,
        {
          id: event.resourceId,
          title: abre ? "Abierto" : "Cerrado",
          abre: abre,
          resourceTitle: daysMap[event.resourceId - 1].dayDescription,
          start: event.start,
          end: event.end,
          resourceId: event.resourceId,
          hexColor: abre ? "4CAF50" : "F44336",
        },
      ];
    });
  };

  const resizeEvent = ({ event, start, end }) => {
    const nextEvents = events.map((existingEvent) => {
      return existingEvent.id === event.id
        ? { ...existingEvent, start, end }
        : existingEvent;
    });

    setEvents(nextEvents);
  };

  const moveEvent = ({ event, start, end }) => {
    if (moment(end).isAfter("Sat Sep 13 2020 00:00:00")) {
      return;
    }

    setEvents((old) =>
      old.map((existingEvent) => {
        return existingEvent.id === event.id
          ? { ...existingEvent, start, end }
          : existingEvent;
      })
    );
  };

  return (
    <>
      <DragAndDropCalendar
        style={{
          fontFamily: "Segoe UI",
          backgroundColor: "#FAFAFA",
          marginBottom: "1rem",
        }}
        selectable
        defaultView={Views.DAY}
        step={30}
        timeslots={4}
        resources={daysMap}
        toolbar={false}
        resourceIdAccessor="dayId"
        resourceTitleAccessor="dayDescription"
        localizer={localizer}
        events={events}
        defaultDate={new Date("Sat Sep 12 2020")}
        onSelectSlot={(event) => nuevoEvento(event)}
        onEventResize={resizeEvent}
        onEventDrop={moveEvent}
        formats={{
          timeGutterFormat: "HH:mm",
          eventTimeRangeFormat: (dates) => {
            return `${moment(dates.start).format("HH:mm")} - ${moment(
              dates.end
            ).format("HH:mm")}`;
          },
          selectRangeFormat: (dates) => {
            return `${moment(dates.start).format("HH:mm")} - ${moment(
              dates.end
            ).format("HH:mm")}`;
          },
        }}
        eventPropGetter={eventStyleGetter}
        components={{
          event: Event,
        }}
        min={new Date("Sat Sep 12 2020 05:00")}
      />
    </>
  );
};

export default Horarios;
