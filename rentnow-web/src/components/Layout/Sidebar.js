import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import clsx from 'clsx'
import zIndex from "@material-ui/core/styles/zIndex";
import {Link} from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(7) + 1,
      display:  "none"
     
    }
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
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
          [classes.drawerOpen]: props.isSideBarOpen,
          [classes.drawerClose]: !props.isSideBarOpen,
        })
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={props.sideBarOpenHandler}>
          
            <ChevronLeftIcon />
          
        </IconButton>
      </div>
      <Divider />
      <List>
        <Link to='/login'>
        <ListItem button>
          <ListItemIcon>{<MailIcon />}</ListItemIcon>
          <ListItemText primary="Login" />
        </ListItem>
        </Link>
        <Link to='/complejos'>
        <ListItem button>
          <ListItemIcon>{<MailIcon />}</ListItemIcon>
          <ListItemText primary="Complejos" />
        </ListItem>
        </Link>
      </List>
    </Drawer>
  );
};

export default Sidebar;
