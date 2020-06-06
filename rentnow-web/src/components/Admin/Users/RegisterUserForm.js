import React from "react";
import { Grid, TextField, MenuItem, Button, Input } from "@material-ui/core";

export default function RegisterUserForm(props) {
  const { setOpen } = props;
  const handleAddUser = (e) => {
    e.preventDefault();

    console.log("TODO BAJO CONTROL AMIGO JEJEJE");
  };

  return (
    <form onSubmitCapture={handleAddUser}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField variant="outlined" fullWidth label="Nombres" />
        </Grid>
        <Grid item xs={6}>
          <TextField variant="outlined" fullWidth label="Apellidos" />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField variant="outlined" fullWidth label="Email" />
        </Grid>
        <Grid item xs={6}>
          <TextField variant="outlined" fullWidth label="Rol" select>
            <MenuItem value="10">Administrador</MenuItem>
            <MenuItem value="20">Adm. Complejos</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField variant="outlined" fullWidth label="Provincia" select>
            <MenuItem value="10">La Rioja</MenuItem>
            <MenuItem value="20">Cordoba</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField variant="outlined" fullWidth label="Ciudad" select>
            <MenuItem value="10">Administrador</MenuItem>
            <MenuItem value="20">Adm. Complejos</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField variant="outlined" fullWidth label="Dirección" />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button fullWidth type="submit" color="primary">
            Agregar
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            color="secondary"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancelar
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
