import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import {Link} from "react-router-dom";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hidden: { display: "none" },
  title: {
    flexGrow: 1,
  },
  navBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  link : {
    color: "white",
    textDecoration: 'none'
  }
}));

function Navbar(props) {
  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      color="secondary"
      className={clsx(classes.navBar, {
        [classes.navBarShift]: props.isSideBarOpen,
      })}
    >
      <Toolbar>
        <IconButton
          edge="start"
          onClick={props.sideBarOpenHandler}
          className={clsx(classes.menuButton, {
            [classes.hidden]: props.isSideBarOpen,
          })}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          rent now
        </Typography>
        <Link to='/login' className={classes.link}>
        <Button color="inherit">Login</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
