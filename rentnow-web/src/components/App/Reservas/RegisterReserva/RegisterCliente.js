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
import AlertCustom from "components/utils/AlertCustom/AlertCustom"

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

  const [alertCustomOpen, setAlertCustomOpen] = useState(false);
  const [alertCustomType, setAlertCustomType] = useState();
  const [alertCustomText, setAlertCustomText] = useState();

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
            id: cliente.id,
          },
        });
        setIsSearching(false);
        setEncontroCliente(true);
        setAlertCustomText("¡Cliente encontrado!");
        setAlertCustomType("success");
        setAlertCustomOpen(true);
      } else {
        setIsSearching(false);
        setEncontroCliente(false);
        setAlertCustomText("No se encontró al Cliente con ese número telefonico, por favor, registrelo.");
        setAlertCustomType("error");
        setAlertCustomOpen(true);
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
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={5}
        >
        <Grid item md={2}>
          <FormControlLabel
            control={
              <Checkbox
              checked={esClienteNuevo}
              onChange={() => setEsClienteNuevo(!esClienteNuevo)}
              />
            }
            label="Nuevo Cliente"
            />
        </Grid>
        </Grid>
        {!esClienteNuevo ? (
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={5}>
            <Grid item md={3} xs={10}>
              <TextField
                style={{ marginTop: "23px" }}
                disabled={isSearching || esClienteNuevo}
                fullWidth
                required
                label="Número de Telefono"
                type="number"
                helperText="Todo junto, sin 0 y sin el 15"
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
            </Grid>
            <Grid item md={3} xs={10}>
              <TextField
                fullWidth
                required
                label="Nombre"
                value={reserva.cliente.nombre}
              />
            </Grid>
            <Grid item md={3} xs={10}>
              <TextField
                fullWidth
                required
                label="Apellido"
                value={reserva.cliente.apellido}
              />
            </Grid>
          </Grid>
        ) : (
            ""
          )}
      <Grid
        style={esClienteNuevo ? {} : { display: "none" }}
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={5}
      >
        <Grid item md={3} xs={10}>
          <TextField
            style={{ marginTop: "23px" }}
            fullWidth
            required
            type="number"
            label="Número de Telefono"
            helperText="Todo junto, sin 0 y sin el 15"
            onChange={(e) => {
              setReserva({
                ...reserva,
                cliente: { ...reserva.cliente, numTelefono: e.target.value },
              });
            }}
          />
        </Grid>
        <Grid item md={3} xs={10}>
          <TextField
            fullWidth
            required
            label="Nombre"
            onChange={(e) => {
              setReserva({
                ...reserva,
                cliente: { ...reserva.cliente, nombre: e.target.value },
              });
            }}
          />
        </Grid>
        <Grid item md={3} xs={10}>
          <TextField
            fullWidth
            required
            label="Apellido"
            onChange={(e) => {
              setReserva({
                ...reserva,
                cliente: { ...reserva.cliente, apellido: e.target.value },
              });
            }}
          />
        </Grid>
      </Grid>
      <AlertCustom
        type={alertCustomType}
        text={alertCustomText}
        open={alertCustomOpen}
        setOpen={setAlertCustomOpen}
      />
    </>
  );
}
