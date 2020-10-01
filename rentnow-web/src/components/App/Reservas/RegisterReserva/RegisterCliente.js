import React, { useState, useEffect } from "react";
import { Grid, TextField, Checkbox, FormControlLabel } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";

const clientes = [
  { nombre: "Facundo", apellido: "Villard", numeroContacto: 3825438378 },
  { nombre: "Juan Pablo", apellido: "Bergues", numeroContacto: 3829492339 },
  { nombre: "Sebastian", apellido: "Magnaldi", numeroContacto: 32132 },
];

export default function RegisterCliente(props) {
  const { esClienteNuevo, setEsClienteNuevo, cliente, setCliente } = props;

  const onChangeOption = (selection) => {
    setCliente(selection);
  };

  useEffect(() => {
    setCliente({});
  }, [esClienteNuevo]);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item md={12} xs={12}>
          <h3>Datos del cliente: </h3>
        </Grid>
        <Grid item md={6} xs={12}>
          <Autocomplete
            freeSolo
            disabled={esClienteNuevo}
            options={clientes}
            getOptionLabel={(option) => option.nombre + " " + option.apellido}
            onChange={(e, option) => {
              onChangeOption(option);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Buscar cliente..."
                variant="outlined"
              />
            )}
          />
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
        style={esClienteNuevo ? {} : { display: "none" }}
        container
        spacing={4}
      >
        <Grid item md={12}>
          <span>
            Ingrese los datos del nuevo <b>cliente</b>:
          </span>
        </Grid>
        <Grid item md={4}>
          <TextField
            fullWidth
            required
            label="Nombre"
            variant="outlined"
            onChange={(e) => {
              setCliente({ ...cliente, nombre: e.target.value });
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
              setCliente({ ...cliente, apellido: e.target.value });
            }}
          />
        </Grid>
        <Grid item md={4}>
          <TextField
            fullWidth
            required
            label="Numero contacto"
            variant="outlined"
            onChange={(e) => {
              setCliente({ ...cliente, numeroContacto: e.target.value });
            }}
          />
        </Grid>
      </Grid>
    </>
  );
}
