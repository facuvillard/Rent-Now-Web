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
  const [userData, setUserData] = useState({
    nombres: "...",
    apellidos: "...",
    email: "...",
    roles: ["..."],
    provincia: "...",
    nroTelefono: "...",
    ciudad: "...",
    direccion: "...",
  });

  useEffect(() => {
    setUserData({ ...user });
  }, [user]);

  console.log(userData);

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
            <ListItemText primary="Nombres" secondary={userData.nombres} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <MailOutlineOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Email" secondary={userData.email} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <LocationCityOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Provincia" secondary={userData.provincia} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <LocationOnOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Direccion" secondary={userData.direccion} />
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
            <ListItemText primary="Apellidos" secondary={userData.apellidos} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccountBoxOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Rol" secondary={userData.roles[0]} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <LocationCityOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Ciudad" secondary={userData.ciudad} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PhoneOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Telefono" secondary={userData.nroTelefono} />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}
