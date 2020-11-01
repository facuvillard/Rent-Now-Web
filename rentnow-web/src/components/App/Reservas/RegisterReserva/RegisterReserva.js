import { Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  TextField,
  InputAdornment,
  Grid,
  FormControlLabel,
  Checkbox,
  Button,
  ExpansionPanelDetails,
  ExpansionPanel,
  ExpansionPanelSummary,
} from "@material-ui/core";
import DateRangeIcon from "@material-ui/icons/DateRange";
import moment from "moment";
import AlarmIcon from "@material-ui/icons/Alarm";
import AlarmOffIcon from "@material-ui/icons/AlarmOff";
import { useParams } from "react-router-dom";
import { registerReservaApi, getReservasByWeekAndEspacio } from "api/reservas";
import { addClienteToComplejo } from "api/complejos";
import RegisterCliente from "components/App/Reservas/RegisterReserva/RegisterCliente";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from '@material-ui/lab';
import AlertCustom from "components/utils/AlertCustom/AlertCustom"


const useStyles = makeStyles((theme) => ({
  divider: {
    borderTop: "1px solid #BDBDBD",
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
    borderRadius: "0.5px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  expansionPanel: {
    width: "100%",
    border: "1px solid rgba(0, 0, 0, .125)",
    backgroundColor: "#FAFAFA",
    marginBottom: theme.spacing(3),
  },
}))

const RegisterReserva = ({ espacio }) => {
  const classes = useStyles();
  const [esClienteNuevo, setEsClienteNuevo] = useState(false);
  const [fechaInicio, setFechaInicio] = useState(moment().toDate());
  const [fechaFin, setFechaFin] = useState(moment().add(1, "hour").toDate());
  const [duracion, setDuracion] = useState(1);
  const [esFijo, setEsFijo] = useState(false);
  const [estaPagado, setEstaPagado] = useState(false);
  const [timesToExclude, setTimesToExclude] = useState([]);
  const [numeroSemana, setNumeroSemana] = useState(0);

  const [alertCustomOpen, setAlertCustomOpen] = useState(false);
  const [alertCustomType, setAlertCustomType] = useState();
  const [alertCustomText, setAlertCustomText] = useState();

  const [reserva, setReserva] = useState({
    fechaInicio: moment().toDate(),
    fechaFin: moment().add(1, "hour").toDate(),
    duracion: 1,
    monto: 0,
    esFijo: false,
    estaPagado: false,
    complejo: {
      id: "",
      descripcion: "",
    },
    espacio: {
      id: "",
      descripcion: "",
    },
    estados: [],
    cliente: {
      nombre: "",
      apellido: "",
      numTelefono: "",
    },
  });

  const { idComplejo } = useParams();

  useEffect(() => {
    setReserva((old) => ({
      ...old,
      duracion: espacio.duracion || 0,
      complejo: {
        id: idComplejo,
      },
      espacio: {
        id: espacio.id,
        descripcion: espacio.nombre,
        tipoEspacio: espacio.tipoEspacio
      },
    }));
  }, [espacio, idComplejo]);

  useEffect(() => {
    setReserva((old) => ({
      ...old,
      fechaFin,
      fechaInicio,
      duracion,
      esFijo,
      estaPagado,
      monto:
        Math.floor(duracion) * espacio.precioTurno +
        (duracion - Math.floor(duracion)) * 2 * espacio.precioMedioTurno,
    }));
  }, [duracion, fechaFin, fechaInicio, esFijo, estaPagado]);

  //REDONDEAR HORA AL 30min MAS CERCANO
  useEffect(() => {
    const fechaHoy = moment();
    const diferencia = 30 - (fechaHoy.minute() % 30);
    const fechaInicio = fechaHoy.add(diferencia, "minutes").toDate();

    setFechaInicio(fechaInicio);
    setFechaFin(moment(fechaInicio).add(1, "hour").toDate());
  }, [timesToExclude]);

  useEffect(() => {
    setFechaFin(moment(fechaInicio).add(1, "hour").toDate());

    if (moment(fechaInicio).week() === numeroSemana) {
      return;
    }

    setNumeroSemana(moment(fechaInicio).week());

    async function getReservasFirstWeek() {
      const reservas = await getReservasByWeekAndEspacio(
        fechaInicio,
        espacio.id
      );
      return reservas;
    }

    getReservasFirstWeek().then((reservas) => {
      let hoursToBlock = [];
      reservas.forEach((reserva) => {
        let duracion = reserva.duracion;
        let lastFecha = moment(reserva.fechaInicio);

        while (duracion > 0) {
          lastFecha = lastFecha.add(30, "minutes");
          hoursToBlock.push(lastFecha.toDate());
          duracion -= 0.5;
        }

        hoursToBlock.push(reserva.fechaInicio);
      });

      setTimesToExclude(hoursToBlock);
    });
  }, [fechaInicio]);

  //Calcular la duracion y monto cada vez que cambia alguna de las fechas
  useEffect(() => {
    const diferencia = moment(fechaFin).diff(fechaInicio, "hours", true);
    const duracion = Math.round(diferencia * 2) / 2;

    setDuracion(duracion);
  }, [fechaFin, fechaInicio]);

  const handleFechaInicioChange = (date) => {
    setFechaInicio(date);
    setFechaFin(moment(date).add(1, "hour").toDate());
  };

  const handleCheckboxChange = (e) => {
    const name = e.target.name;
    if (name === "esFijo") {
      setEsFijo(e.target.checked);
    } else {
      setEstaPagado(e.target.checked);
    }
  };

  const handleRegistroReserva = async () => {
    if (
      reserva.cliente.nombre === "" ||
      reserva.cliente.apellido === "" ||
      reserva.cliente.numTelefono === ""
    ) {
      setAlertCustomText("No hay un Cliente asociado a la Reserva, por favor, busque uno existente o registre uno nuevo");
      setAlertCustomType("error");
      setAlertCustomOpen(true);
    } else {
      if (esClienteNuevo) {
        const clienteRegistrado = await addClienteToComplejo(idComplejo, reserva.cliente);
        if (clienteRegistrado.status === "OK") {
          reserva.cliente = clienteRegistrado.data
          const result = await registerReservaApi(reserva);
          if (result.status === "OK") {
            setAlertCustomText("Cliente y Reserva registrados con éxito");
            setAlertCustomType("success");
            setAlertCustomOpen(true);
          } else {
            setAlertCustomText("Error al crear la Reserva");
            setAlertCustomType("error");
            setAlertCustomOpen(true);
          }
        } else {
          setAlertCustomText(clienteRegistrado.message);
          setAlertCustomType("success");
          setAlertCustomOpen(true);
        }
      } else {
        const result = await registerReservaApi(reserva);
        if (result.status === "OK") {
          setAlertCustomText(result.message);
          setAlertCustomType("success");
          setAlertCustomOpen(true);
        }
      }
    }
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Typography variant={"h5"}>
          Nueva reserva en el espacio <b>{espacio.nombre}</b>
          {/* el{" "}
          <b>{moment(fechaInicio).format("DD/MM/YYYY").toString()}</b> desde las{" "}
          <b>{moment(fechaInicio).format("HH:mm").toString()} </b> */}
        </Typography>
      </Grid>
      <hr className={classes.divider} />
      {/* FECHA DE RESERVA */}
      <ExpansionPanel className={classes.expansionPanel} expanded="true">
        <ExpansionPanelSummary
          aria-controls="turnoPanel"
          id="turnoPanel"
        >
          <Typography className={classes.heading}><b>DATOS DEL TURNO</b></Typography>
          <Typography className={classes.secondaryHeading}>Complete los datos del turno</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={5}
          >
            <Grid item md={3} xs={6}>
              <Datepicker
                selected={fechaInicio}
                onChange={(date) => setFechaInicio(date)}
                dateFormat="dd/MM/yyyy"
                minDate={moment().toDate()}
                customInput={
                  <TextField
                    label="Fecha"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <DateRangeIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                }
              />
            </Grid>
            <Grid item md={3} xs={6}>
              {/* HORA INICIO */}
              <Datepicker
                selected={fechaInicio}
                onChange={handleFechaInicioChange}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Inicio"
                dateFormat="HH:mm"
                timeFormat="HH:mm"
                excludeTimes={timesToExclude.filter((date) =>
                  moment(fechaInicio).isSame(date, "day")
                )}
                minTime={
                  moment(fechaInicio).isSame(moment(), "day")
                    ? moment().toDate()
                    : moment(fechaInicio).hour("00").toDate()
                }
                maxTime={moment(fechaInicio).hour("23").toDate()}
                customInput={
                  <TextField
                    fullWidth
                    label="Hora Inicio"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <AlarmIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                }
              />
            </Grid>
            <Grid item md={3} xs={6}>
              {/* HORA FIN */}
              <Datepicker
                selected={fechaFin}
                onChange={(date) => setFechaFin(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                timeCaption="Fin"
                minTime={moment(fechaInicio).add(30, "minutes").toDate()}
                maxTime={moment(fechaInicio).hour("23").toDate()}
                dateFormat="HH:mm"
                timeFormat="HH:mm"
                excludeTimes={timesToExclude.filter((date) =>
                  moment(fechaInicio).isSame(date, "day")
                )}
                customInput={
                  <TextField
                    fullWidth
                    label="Hora Fin"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <AlarmOffIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                }
              />
            </Grid>
            <Grid item md={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={estaPagado}
                    name="estaPagado"
                    onChange={handleCheckboxChange}
                  />
                }
                label="Pagado"
              />
            </Grid>
            <Grid item md={1}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={esFijo}
                    name="esFijo"
                    onChange={handleCheckboxChange}
                  />
                }
                label="¿Es fijo?"
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Alert severity="info">
                <AlertTitle>El monto a abonar es de <b>${reserva.monto}</b></AlertTitle>
              </Alert>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel className={classes.expansionPanel} expanded="true">
        <ExpansionPanelSummary
          aria-controls="turnoPanel"
          id="turnoPanel"
        >
          <Typography className={classes.heading}><b>DATOS DEL CLIENTE</b></Typography>
          <Typography className={classes.secondaryHeading}>Busque un cliente por su numero telefonico o registre uno nuevo</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <RegisterCliente
              esClienteNuevo={esClienteNuevo}
              setEsClienteNuevo={setEsClienteNuevo}
              idComplejo={idComplejo}
              reserva={reserva}
              setReserva={setReserva}
            />
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Button
          onClick={handleRegistroReserva}
          variant="contained"
          color="primary"
        >
          Confirmar
            </Button>
      </Grid>
      <AlertCustom
        type={alertCustomType}
        text={alertCustomText}
        open={alertCustomOpen}
        setOpen={setAlertCustomOpen}
      />
    </>
  );
};

export default RegisterReserva;
