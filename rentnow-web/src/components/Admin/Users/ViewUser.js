import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Grid,
} from "@material-ui/core";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import AccountBoxOutlinedIcon from "@material-ui/icons/AccountBoxOutlined";
import LocationCityOutlinedIcon from "@material-ui/icons/LocationCityOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    alignContent: "justify",
  },
}));

export default function ViewUser(props) {
  const { setOpen, user } = props;
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <List className={classes.root}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccountCircleOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Nombres" secondary={user.nombres ? user.nombres : "..."} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <MailOutlineOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Email" secondary={user.email ? user.email : "..."} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <LocationCityOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Provincia" secondary={user.provincia ? user.provincia : "..."} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <LocationOnOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Direccion" secondary={user.direccion ? user.direccion : "..."} />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={6}>
        <List className={classes.root}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccountCircleOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Apellidos" secondary={user.apellidos ? user.apellidos : "..."} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccountBoxOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Rol" secondary={user.roles[0]? user.roles : "..."} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <LocationCityOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Ciudad" secondary={user.ciudad ? user.ciudad : "..."} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PhoneOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Telefono" secondary={user.nroTelefono ? user.nroTelefono : "..."} />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}
