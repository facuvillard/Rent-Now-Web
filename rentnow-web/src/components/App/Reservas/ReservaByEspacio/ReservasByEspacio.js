import React, { useEffect, useState } from "react";
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Paper,
  CircularProgress,
  Fab,
  makeStyles,
  Grid,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { getEspaciosByIdComplejo } from "api/espacios";
import { useParams } from "react-router-dom";
import { Calendar, Views, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import RegisterReserva from "components/App/Reservas/RegisterReserva/RegisterReserva";

const useStyles = makeStyles((theme) => ({
  addButton: {
    position: "fixed",
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
}));

const reservas = [
  {
    id: 1,
    start: moment([2020, 8, 20, 5, 0, 0]).toDate(),
    end: moment("20/9/2020 7:00", "DD/MM/YYYY HH:mm").toDate(),
    espacio: "cLlPtCaJRfMlKl6faVs3",
    title: "Juan, Bergues",
    pagado: true,
  },
  {
    id: 2,
    start: moment([2020, 8, 20, 7, 0, 0]).toDate(),
    end: moment("20/9/2020 8:30", "DD/MM/YYYY HH:mm").toDate(),
    espacio: "cLlPtCaJRfMlKl6faVs3",
    title: "Juan, Bergues",
    pagado: true,
  },
  {
    id: 3,
    start: moment([2020, 8, 20, 15, 0, 0]).toDate(),
    end: moment("20/9/2020 17:00", "DD/MM/YYYY HH:mm").toDate(),
    espacio: "cLlPtCaJRfMlKl6faVs3",
    title: "Juan, Bergues",
    pagado: true,
  },
  {
    id: 4,
    start: moment([2020, 8, 20, 17, 30, 0]).toDate(),
    end: moment("20/9/2020 18:30", "DD/MM/YYYY HH:mm").toDate(),
    espacio: "cLlPtCaJRfMlKl6faVs3",
    title: "Juan, Bergues",
    pagado: true,
  },
  {
    id: 5,
    start: moment([2020, 8, 20, 23, 0, 0]).toDate(),
    end: moment("20/9/2020 00:30", "DD/MM/YYYY HH:mm").toDate(),
    espacio: "cLlPtCaJRfMlKl6faVs3",
    title: "Juan, Bergues",
    pagado: true,
  },
  {
    id: 6,
    start: moment([2020, 8, 20, 23, 0, 0]).toDate(),
    end: moment("20/9/2020  00:30", "DD/MM/YYYY HH:mm").toDate(),
    espacio: "cLlPtCaJRfMlKl6faVs3",
    title: "Juan, Bergues",
    pagado: true,
  },
  {
    id: 7,
    start: moment([2020, 8, 20, 20, 0, 0]).toDate(),
    end: moment("20/9/2020 22:00", "DD/MM/YYYY HH:mm").toDate(),
    espacio: "BxTNgb7EwirGLMMKxq5F",
    title: "Juan, Bergues",
    pagado: true,
  },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Paper>
          <Box p={4}>{children}</Box>
        </Paper>
      )}
    </div>
  );
}

const ReservasByEspacio = () => {
  const classes = useStyles();
  const { idComplejo } = useParams();
  const [espacios, setEspacios] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState();
  const [showRegistroReserva, setShowRegistroReserva] = useState(false);
  moment.locale("es");
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    setIsLoading(true);
    getEspaciosByIdComplejo(idComplejo).then((response) => {
      if (response.status === "OK") {
        setIsLoading(false);
        if (response.data.length > 0) {
          setEspacios(response.data);
          setValue(response.data[0].id);
        }
      } else {
        setIsLoading(false);
      }
    });
  }, [idComplejo]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickRegistroReserva = () => {
    setShowRegistroReserva((old) => !showRegistroReserva);
  };

  if (isLoading) {
    return (
      <Grid container justify="center">
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      {espacios && value ? (
        <>
          <AppBar position="static">
            <Tabs
              aria-label="simple tabs example"
              onChange={handleChange}
              value={value}
            >
              {espacios.map((espacio) => (
                <Tab
                  label={espacio.nombre}
                  value={espacio.id}
                  key={espacio.id}
                />
              ))}
            </Tabs>
          </AppBar>
          {espacios.map((espacio) => (
            <TabPanel value={value} index={espacio.id} key={espacio.id}>
              {!showRegistroReserva ? (
                // COMPONENTE
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
                  defaultDate={moment().toDate()}
                  events={reservas.filter(
                    (reserva) => reserva.espacio === espacio.id
                  )}
                  min={moment().hour(5).minutes(0).toDate()}
                  formats={{
                    timeGutterFormat: "HH:mm",
                    eventTimeRangeFormat: (dates) => {
                      return `${moment(dates.start).format("HH:mm")} - ${moment(
                        dates.end
                      ).format("HH:mm")}`;
                    },
                  }}
                />
              ) : (
                //COMPONENTE
                <RegisterReserva espacio={espacio} />
              )}
            </TabPanel>
          ))}
        </>
      ) : null}

      <Fab
        color={!showRegistroReserva ? "primary":"secondary"}
        aria-label="add"
        title="Registrar una reserva"
        className={classes.addButton}
        variant="extended"
        onClick={handleClickRegistroReserva}
      >
        {!showRegistroReserva ? (
          <>
            <AddIcon />
            Reserva
          </>
        ) : (
          <>
            <ArrowBackIcon />
            Calendario
          </>
        )}
      </Fab>
    </>
  );
};

export default ReservasByEspacio;
