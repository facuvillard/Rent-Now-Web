import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Grid,
  Button,
  Card,
  CardActionArea,
  CardMedia,
} from "@material-ui/core";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import PhoneOutlinedIcon from "@material-ui/icons/PhoneOutlined";
import MapIcon from "@material-ui/icons/Map";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import PhotoCameraIcon from "@material-ui/icons/PhotoCamera";
import PhotoIcon from "@material-ui/icons/Photo";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    alignContent: "justify",
  },
}));

export default function ViewComplejo(props) {
  const { complejo, setOpenDrawer, setDrawerContent } = props;
  const classes = useStyles();
  const verFotosHandler = () => {
    setDrawerContent(
      <Grid container spacing={1}>
        {complejo.fotos.map((foto) => (
          <Grid item xs={12} sm={6} key={foto}>
            <Card>
              <CardActionArea href={foto} target="_blank">
                <CardMedia component="img" height={200} image={foto} />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
    setOpenDrawer(true);
  };
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
            <ListItemText
              primary="Dueño"
              secondary={complejo.usuarios[0].nombre}
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <MailOutlineOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Email" secondary={complejo.email} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FacebookIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Facebook"
              secondary={complejo.redes.facebook || "..."}
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <LocationOnOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Direccion"
              secondary={
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  startIcon={<MapIcon />}
                >
                  Ver mapa
                </Button>
              }
            />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={6}>
        <List className={classes.root}>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PhoneOutlinedIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Telefono" secondary={complejo.telefono} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <InstagramIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Instagram"
              secondary={complejo.redes.instagram || "..."}
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <TwitterIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Twitter"
              secondary={complejo.redes.twitter || "..."}
            />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <PhotoCameraIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Fotos"
              secondary={
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  startIcon={<PhotoIcon />}
                  onClick={verFotosHandler}
                >
                  Ver fotos
                </Button>
              }
            />
          </ListItem>
        </List>
      </Grid>
    </Grid>
  );
}
