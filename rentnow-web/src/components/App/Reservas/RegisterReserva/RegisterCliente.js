import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { getClienteByNumeroTelefono } from "api/complejos";

export default function RegisterCliente(props) {
  const {
    setEsClienteNuevo,
    esClienteNuevo,
    idComplejo,
    setReserva,
    reserva,
  } = props;
  const [numTelefono, setNumTelefono] = useState();
  const [isSearching, setIsSearching] = useState(false);
  const [encontroCliente, setEncontroCliente] = useState(false);

  useEffect(() => {
    setEncontroCliente(false);
    setNumTelefono("");
    setReserva({
      ...reserva,
      cliente: { nombre: "", apellido: "", numTelefono: "" },
    });
  }, [esClienteNuevo]);

  const buscarCliente = () => {
    setIsSearching(true);
    getClienteByNumeroTelefono(idComplejo, numTelefono).then((resp) => {
      if (resp.status === "OK") {
        const cliente = resp.data[0];
        setReserva({
          ...reserva,
          cliente: {
            nombre: cliente.nombre,
            apellido: cliente.apellido,
            numTelefono: cliente.numTelefono,
          },
        });
        setIsSearching(false);
        setEncontroCliente(true);
      } else {
        setIsSearching(false);
        setEncontroCliente(false);
        alert("No se encontró cliente, registrelo.");
      }
    });
  };

  const onChangeNumTelefono = (e) => {
    if (encontroCliente) {
      setEncontroCliente(false);
      setReserva({
        ...reserva,
        cliente: { nombre: "", apellido: "", numTelefono: "" },
      });
    }
    setNumTelefono(e.target.value);
  };
  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={12} xs={12}>
          <h3>Datos del cliente: </h3>
        </Grid>
        <Grid item md={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={esClienteNuevo}
                onChange={() => setEsClienteNuevo(!esClienteNuevo)}
              />
            }
            label="¿Es cliente nuevo?"
          />
        </Grid>
        <Grid item md={6} xs={12}>
          {!esClienteNuevo ? (
            <TextField
              disabled={isSearching || esClienteNuevo}
              fullWidth
              required
              label="Ingresar numero de telefono sin 0 y 15"
              type="number"
              variant="outlined"
              onChange={(e) => {
                onChangeNumTelefono(e);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      disabled={isSearching || esClienteNuevo}
                      onClick={buscarCliente}
                    >
                      {isSearching ? <CircularProgress /> : <SearchIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          ) : (
            ""
          )}
        </Grid>
      </Grid>
      <Grid
        container
        spacing={4}
        style={encontroCliente ? {} : { display: "none" }}
      >
        <Grid item md={3}>
          <b>Nombre: </b> {reserva.cliente.nombre}
        </Grid>
        <Grid item md={3}>
          <b>Apellido: </b> {reserva.cliente.apellido}
        </Grid>
      </Grid>

      <Grid
        style={esClienteNuevo ? {} : { display: "none" }}
        container
        spacing={4}
      >
        <Grid item md={12}>
          <p>
            Ingrese los datos del nuevo <b>cliente</b>
          </p>
        </Grid>
        <Grid item md={4}>
          <TextField
            fullWidth
            required
            label="Nombre"
            variant="outlined"
            onChange={(e) => {
              setReserva({
                ...reserva,
                cliente: { ...reserva.cliente, nombre: e.target.value },
              });
            }}
          />
        </Grid>
        <Grid item md={4}>
          <TextField
            fullWidth
            required
            label="Apellido"
            variant="outlined"
            onChange={(e) => {
              setReserva({
                ...reserva,
                cliente: { ...reserva.cliente, apellido: e.target.value },
              });
            }}
          />
        </Grid>
        <Grid item md={4}>
          <TextField
            fullWidth
            required
            label="Numero Telefono"
            variant="outlined"
            onChange={(e) => {
              setReserva({
                ...reserva,
                cliente: { ...reserva.cliente, numTelefono: e.target.value },
              });
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
