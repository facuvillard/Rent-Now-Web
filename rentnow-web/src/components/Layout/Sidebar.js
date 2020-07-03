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
import MailIcon from "@material-ui/icons/Mail";
import GroupIcon from "@material-ui/icons/Group";
import clsx from "clsx";
import { Link } from "react-router-dom";
import {Can} from '../../Auth/can'
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
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
}));

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
      <Divider />
      <List>
        <Link to="/login" className={classes.link}>
          <ListItem button>
            <ListItemIcon color="primary">
              {<MailIcon className={classes.link} />}
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        </Link>
        <Link to="/complejos" className={classes.link}>
          <ListItem button>
            <ListItemIcon>{<MailIcon className={classes.link} />}</ListItemIcon>
            <ListItemText primary="Complejos" />
          </ListItem>
        </Link>
        <Can I="read" a="usuario">
          <Link to="/usuarios" className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                {<GroupIcon className={classes.link} />}
              </ListItemIcon>
              <ListItemText primary="Usuarios" />
            </ListItem>
          </Link>
        </Can>
      </List>
    </Drawer>
  );
};

export default Sidebar;
