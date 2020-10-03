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
  const { setEsClienteNuevo, esClienteNuevo, idComplejo } = props;
  const [numTelefono, setNumTelefono] = useState();
  const [isSearching, setIsSearching] = useState(false);
  const [encontroCliente, setEncontroCliente] = useState(false);
  const [cliente, setCliente] = useState({});

  useEffect(() => {
    setEncontroCliente(false);
    setCliente({ ...cliente, numTelefono: null });
  }, [esClienteNuevo]);

  const buscarCliente = () => {
    setIsSearching(true);
    getClienteByNumeroTelefono(idComplejo, numTelefono).then((resp) => {
      if (resp.status === "OK") {
        setCliente(resp.data[0]);
        setIsSearching(false);
        setEncontroCliente(true);
      } else {
        setIsSearching(false);
        setEncontroCliente(false);
        alert(resp.error);
      }
    });
  };
  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={12} xs={12}>
          <h3>Datos del cliente: </h3>
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
                setNumTelefono(e.target.value);
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
            <p>
              Ingrese los datos del nuevo <b>cliente:</b>
            </p>
          )}
        </Grid>
        <Grid item md={6}>
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
      </Grid>
      <Grid
        container
        spacing={4}
        style={encontroCliente ? {} : { display: "none" }}
      >
        <Grid item md={3}>
          <b>Nombre: </b> {cliente.nombre}
        </Grid>
        <Grid item md={3}>
          <b>Apellido: </b> {cliente.apellido}
        </Grid>
      </Grid>

      <Grid
        style={esClienteNuevo ? {} : { display: "none" }}
        container
        spacing={4}
      >
        <Grid item md={4}>
          <TextField
            fullWidth
            required
            label="Nombre"
            variant="outlined"
            onChange={(e) => {}}
          />
        </Grid>
        <Grid item md={4}>
          <TextField
            fullWidth
            required
            label="Apellido"
            variant="outlined"
            onChange={(e) => {}}
          />
        </Grid>
        <Grid item md={4}>
          <TextField
            fullWidth
            required
            label="Numero contacto"
            variant="outlined"
            onChange={(e) => {}}
          />
        </Grid>
      </Grid>
    </>
  );
}
