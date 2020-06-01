import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import clsx from "clsx";
import {Link, withRouter} from "react-router-dom";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft"
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import logo from "../../assets/img/logos/logo-horizontal.png"
import firebaseApp from "../../firebase"
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  navBar: {
    zIndex: theme.zIndex.drawer + 3,
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
  icon: {
    flexGrow: 0
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
  },
  logo: {
    maxWidth: 170,
    marginTop: 10
  },
}));

function Navbar(props) {
  const classes = useStyles();
  const handleLogout = ()=>{
    firebaseApp.auth().signOut().then(()=>{
      props.history.push("/login")
    }).catch(() => console.log("Error al desloguearse"))
  }
  return (
    <AppBar
      position="fixed"
      color="primary"

      className={clsx(classes.navBar, {
        [classes.navBarShift]: false,
      })}
    >
      <Toolbar>
        <IconButton
          edge="start"
          onClick={props.sideBarOpenHandler}
          className={clsx(classes.menuButton, {
            [classes.hidden]: false,
          })}
          color="inherit"
          aria-label="menu"
        >
          {
             props.isSideBarOpen ? <ChevronLeftIcon /> :  
            <MenuIcon />
          }
        </IconButton>
        
        <Typography  align='center'  className={classes.title}>
            <img src={logo}  alt="logo" className={classes.logo} />
        </Typography>

        <Link to='/login' className={classes.link}>
        <Button  startIcon={<AccountCircleSharpIcon/>} onClick={handleLogout}>Cerrar sesión</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(Navbar);
