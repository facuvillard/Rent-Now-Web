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
} from "@material-ui/core";
import DateRangeIcon from "@material-ui/icons/DateRange";
import moment from "moment";
import AlarmIcon from "@material-ui/icons/Alarm";
import AlarmOffIcon from "@material-ui/icons/AlarmOff";
import { useParams } from "react-router-dom";
import { registerReservaApi, getReservasByWeekAndEspacio } from "api/reservas";
import { addClienteToComplejo } from "api/complejos";
import * as constants from "constants/reservas/constants";
import RegisterCliente from "components/App/Reservas/RegisterReserva/RegisterCliente";

const RegisterReserva = ({ espacio }) => {
  const [esClienteNuevo, setEsClienteNuevo] = useState(false);
  const [fechaInicio, setFechaInicio] = useState(moment().toDate());
  const [fechaFin, setFechaFin] = useState(moment().add(1, "hour").toDate());
  const [duracion, setDuracion] = useState(1);
  const [esFijo, setEsFijo] = useState(false);
  const [estaPagado, setEstaPagado] = useState(false);
  const [timesToExclude, setTimesToExclude] = useState([]);
  const [numeroSemana, setNumeroSemana] = useState(0);

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
    estado: constants.estados.confirmada,
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
      console.log(reservas);
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
      alert(
        "Cliente no seleccionado, por favor seleccione un cliente o en caso de no existir cliente registrelo"
      );
    } else {
      if (esClienteNuevo) {
        const result = await addClienteToComplejo(idComplejo, reserva.cliente);
        if (result.status === "OK") {
          const result = await registerReservaApi(reserva);
          if (result.status === "OK") {
            alert("Reserva creada y cliente registrado.");
          } else {
            alert("Error al crear reserva");
          }
        } else {
          alert(result.message);
        }
      } else {
        const result = await registerReservaApi(reserva);
        if (result.status === "OK") {
          alert(result.message);
        }
      }
    }
  };

  return (
    <>
      <Typography variant={"h4"}>
        Reserva en <b>{espacio.nombre}</b> el{" "}
        <b>{moment(fechaInicio).format("DD/MM/YYYY").toString()}</b> desde las{" "}
        <b>{moment(fechaInicio).format("HH:mm").toString()} </b>
      </Typography>
      <br />
      {/* FECHA DE RESERVA */}
      <Grid container spacing={5}>
        <Grid item md={3}>
          <Datepicker
            selected={fechaInicio}
            onChange={(date) => setFechaInicio(date)}
            dateFormat="dd/MM/yyyy"
            minDate={moment().toDate()}
            customInput={
              <TextField
                variant="outlined"
                label="Fecha"
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
        <Grid item md={3}>
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
                variant="outlined"
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
        <Grid item md={3}>
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
                variant="outlined"
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
            label="Esta pagado?"
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
            label="Es fijo?"
          />
        </Grid>
        <Grid item md={12} xs={12}>
          <RegisterCliente
            esClienteNuevo={esClienteNuevo}
            setEsClienteNuevo={setEsClienteNuevo}
            idComplejo={idComplejo}
            reserva={reserva}
            setReserva={setReserva}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography>
            El monto a abonar es <b>${reserva.monto}</b>
          </Typography>
        </Grid>
        <Grid>
          <Button onClick={handleRegistroReserva}>Confirmar</Button>
        </Grid>
      </Grid>
    </>
  );
};

export default RegisterReserva;
