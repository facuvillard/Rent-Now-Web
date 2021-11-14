import React, { useState, useEffect } from "react";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.scss";
import { Grid, Button } from "@material-ui/core";
import UpdateDaysModal from 'components/App/Complejos/EditComplejo/Sections/DaysAndSchedule/UpdateDaysModal'
import Dialog from "components/utils/Dialog/Dialog";
import AlertCustom from "components/utils/AlertCustom/AlertCustom";
import { useParams } from "react-router-dom";
import { updateComplejoApi } from "api/complejos";

function Event({ event }) {
    return (
        <span>
            <strong>{event.title}</strong>
            {event.desc && ":  " + event.desc}
        </span>
    );
}

const Days = (props) => {
    const { idComplejo } = useParams();
    const [changed, setChanged] = useState(false);
    const [dialogContent, setDialogContent] = useState(null);

    const [alertCustomOpen, setAlertCustomOpen] = useState(false);
    const [alertCustomType, setAlertCustomType] = useState();
    const [alertCustomText, setAlertCustomText] = useState();

    const [open, setOpen] = useState(false);

    const [horarios, setHorarios] = useState({});
    const [events, setEvents] = useState([]);
    const DragAndDropCalendar = withDragAndDrop(Calendar);
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
                title: props.horarios.Domingo.abre ? "Abierto" : "Cerrado",
                resourceTitle: "Domingo",
                abre: props.horarios.Domingo.abre,
                start: new Date(`Sat Sep 12 2020 ${props.horarios.Domingo.desde}`),
                end: new Date(`Sat Sep 12 2020 ${props.horarios.Domingo.hasta}`),
                resourceId: 1,
                hexColor: props.horarios.Domingo.abre ? "4CAF50" : "F44336"
            },
            {
                id: 2,
                title: props.horarios.Lunes.abre ? "Abierto" : "Cerrado",
                resourceTitle: "Lunes",
                abre: props.horarios.Lunes.abre,
                start: new Date(`Sat Sep 12 2020 ${props.horarios.Lunes.desde}`),
                end: new Date(`Sat Sep 12 2020 ${props.horarios.Lunes.hasta}`),
                resourceId: 2,
                hexColor: props.horarios.Lunes.abre ? "4CAF50" : "F44336"
            },
            {
                id: 3,
                title: props.horarios.Martes.abre ? "Abierto" : "Cerrado",
                resourceTitle: "Martes",
                abre: props.horarios.Martes.abre,
                start: new Date(`Sat Sep 12 2020 ${props.horarios.Martes.desde}`),
                end: new Date(`Sat Sep 12 2020 ${props.horarios.Martes.hasta}`),
                resourceId: 3,
                hexColor: props.horarios.Martes.abre ? "4CAF50" : "F44336"
            },
            {
                id: 4,
                title: props.horarios.Miércoles.abre ? "Abierto" : "Cerrado",
                resourceTitle: "Miércoles",
                abre: props.horarios.Miércoles.abre,
                start: new Date(`Sat Sep 12 2020 ${props.horarios.Miércoles.desde}`),
                end: new Date(`Sat Sep 12 2020 ${props.horarios.Miércoles.hasta}`),
                resourceId: 4,
                hexColor: props.horarios.Miércoles.abre ? "4CAF50" : "F44336"
            },
            {
                id: 5,
                title: props.horarios.Jueves.abre ? "Abierto" : "Cerrado",
                resourceTitle: "Jueves",
                abre: props.horarios.Jueves.abre,
                start: new Date(`Sat Sep 12 2020 ${props.horarios.Jueves.desde}`),
                end: new Date(`Sat Sep 12 2020 ${props.horarios.Jueves.hasta}`),
                resourceId: 5,
                hexColor: props.horarios.Jueves.abre ? "4CAF50" : "F44336"
            },
            {
                id: 6,
                title: props.horarios.Viernes.abre ? "Abierto" : "Cerrado",
                resourceTitle: "Viernes",
                abre: props.horarios.Viernes.abre,
                start: new Date(`Sat Sep 12 2020 ${props.horarios.Viernes.desde}`),
                end: new Date(`Sat Sep 12 2020 ${props.horarios.Viernes.hasta}`),
                resourceId: 6,
                hexColor: props.horarios.Viernes.abre ? "4CAF50" : "F44336"
            },
            {
                id: 7,
                title: props.horarios.Sábado.abre ? "Abierto" : "Cerrado",
                resourceTitle: "Sábado",
                abre: props.horarios.Sábado.abre,
                start: new Date(`Sat Sep 12 2020 ${props.horarios.Sábado.desde}`),
                end: new Date(`Sat Sep 12 2020 ${props.horarios.Sábado.hasta}`),
                resourceId: 7,
                hexColor: props.horarios.Sábado.abre ? "4CAF50" : "F44336"
            },
            {
                id: 8,
                title: props.horarios.Feriados.abre ? "Abierto" : "Cerrado",
                resourceTitle: "Feriados",
                abre: props.horarios.Feriados.abre,
                start: new Date(`Sat Sep 12 2020 ${props.horarios.Feriados.desde}`),
                end: new Date(`Sat Sep 12 2020 ${props.horarios.Feriados.hasta}`),
                resourceId: 8,
                hexColor: props.horarios.Feriados.abre ? "4CAF50" : "F44336"
            },
        ]);
    }, [props.horarios]);

    useEffect(() => {
        const horarios = {}
        setChanged(false);
        events.forEach((event) => {
            horarios[event.resourceTitle] = {
                abre: event.abre,
                desde: moment(event.start).format("HH:mm "),
                hasta: moment(event.end).format("HH:mm "),
            };
            if ( props.horarios[event.resourceTitle].desde !== horarios[event.resourceTitle].desde.toString()
                || props.horarios[event.resourceTitle].hasta !== horarios[event.resourceTitle].hasta.toString() ) {
                setChanged(true);
            }
        });
        setHorarios(horarios);
    }, [events, setHorarios, props.horarios]);

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

    const updateDialogHandler = () => {
        setDialogContent(
            <UpdateDaysModal
                text="Si modifica los horarios de atención del complejo esto impactará en los horarios en los cuales puede registrar reservas"
                setOpen={setOpen}
                updateHandler={() => {
                    updateHandler();
                }}
            />
        );
        setOpen(true);
    };

    const updateHandler = async () => {
        const result = await updateComplejoApi(
            { horarios : horarios },
            idComplejo
        );
        if (result.status === "OK") {
            setAlertCustomText(result.message);
            setAlertCustomType("success");
            setAlertCustomOpen(true);
            setOpen(false);
            setChanged(false);
        } else {
            setAlertCustomText(result.message);
            setAlertCustomType("error");
            setAlertCustomOpen(true);
        }
    }

    return (
        <>
            <Grid container justify="center">
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
            </Grid>
            <Grid container justify="center">
                <Button
                    variant="contained"
                    color="primary"
                    disabled={!changed}
                    onClick={(_) => {
                        updateDialogHandler();
                    }}
                >
                    ACTUALIZAR HORARIOS
            </Button>
            </Grid>
            <Dialog
                title="¿Esta seguro que desea actualizar los horarios de atención de su complejo?"
                open={open}
                setOpen={setOpen}
                size="sm"
            >
                {dialogContent}
            </Dialog>
            <AlertCustom
                type={alertCustomType}
                text={alertCustomText}
                open={alertCustomOpen}
                setOpen={setAlertCustomOpen}
            />
        </>
    )
}

export default Days
