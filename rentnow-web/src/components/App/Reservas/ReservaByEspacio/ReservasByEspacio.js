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
import RegisterReserva from "components/App/Reservas/RegisterReserva/RegisterReserva";
import EspacioCalendar from "./EspacioCalendar/EspacioCalendar";

const useStyles = makeStyles((theme) => ({
  addButton: {
    position: "fixed",
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
}));


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
                <EspacioCalendar espacio={espacio} />
              ) : (
                <RegisterReserva espacio={espacio} />
              )}
            </TabPanel>
          ))}
        </>
      ) : null}

      <Fab
        color="primary"
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
