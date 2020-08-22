import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import GroupIcon from "@material-ui/icons/Group";
import Settings from "@material-ui/icons/Settings";
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer';
import clsx from "clsx";
import { Link } from "react-router-dom";
import { Can } from "Auth/can";
import logoSinLetraAmarillo from "../../assets/img/logos/logo-amarillo-sin-letra.png";
import logoConLetraAmarillo from "../../assets/img/logos/logo-horizontal-blanco.png";
import * as Routes from "../../constants/routes";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  logoSBClosed: {
    padding: "10px",
    height: "43px",
    background: `url(${logoSinLetraAmarillo}) no-repeat`,
    backgroundSize: "60%",
    backgroundPosition: "center",
  },
  logoSBOpen: {
    padding: "10px",
    height: "43px",
    background: `url(${logoConLetraAmarillo}) no-repeat`,
    backgroundSize: "80%",
    backgroundPosition: "center",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    zIndex: theme.zIndex.drawer + 2,
  },
  drawerOpen: {
    width: drawerWidth,
    boxShadow: "6px 10px 5px 0px rgba(0,0,0,0.2)",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),

    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.down("xs")]: {
      width: theme.spacing(7) + 1,
      display: "none",
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  paper: {
    backgroundColor: theme.palette.secondary.dark,
  },
  link: {
    color: theme.palette.grey[50],
    textDecoration: "none",
  },
  listContainer: {
    //display: "flex",
    flexDirection: "column",
    height: "100%",
  },
}));

const SideBarButton = (props) => {
  const classes = useStyles();
  return (
    <Can I={props.permiso} a={props.elemento}>
      <Link to={props.ruta} className={classes.link}>
        <ListItem button>
          <ListItemIcon>{props.icon}</ListItemIcon>
          <ListItemText primary={props.text} />
        </ListItem>
      </Link>
    </Can>
  );
};

const Sidebar = (props) => {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: props.isSideBarOpen,
        [classes.drawerClose]: !props.isSideBarOpen,
      })}
      classes={{
        paper: clsx({
          [classes.paper]: true,
          [classes.drawerOpen]: props.isSideBarOpen,
          [classes.drawerClose]: !props.isSideBarOpen,
        }),
      }}
    >
      {/* <img className={classes.logoSBClosed}  src={props.isSideBarOpen ? logoConLetraAmarillo : logoSinLetraAmarillo} /> */}
      <div
        className={clsx({
          [classes.logoSBClosed]: !props.isSideBarOpen,
          [classes.logoSBOpen]: props.isSideBarOpen,
        })}
      />
      <Divider />
      <div className={classes.listContainer}>
        <List style={{ flexGrow: "1" }}>
          <SideBarButton
            permiso="admin"
            elemento="complejo"
            ruta={Routes.ADMIN_COMPLEJOS}
            icon={<HomeIcon className={classes.link} />}
            text="Complejos"
          />
          <SideBarButton
            permiso="admin"
            elemento="usuario"
            ruta={Routes.USUARIOS}
            icon={<GroupIcon className={classes.link} />}
            text="Usuarios"
          />
        </List>
        <List>
          <Can I="create" a="espacio">
            <SideBarButton
              permiso="create"
              elemento="espacio"
              ruta={`/app/complejos/${props.params.idComplejo}/registrar-espacios`}
              icon={<SportsSoccerIcon className={classes.link} />}
              text="Registrar Espacios"
            />
          </Can>
        </List>
        <List>
          <Can I="update" a="complejo">
            <SideBarButton
              permiso="update"
              elemento="complejo"
              ruta={`/app/complejos/${props.params.idComplejo}/modificar`}
              icon={<Settings className={classes.link} />}
              text="Configuracion"
            />
          </Can>
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
