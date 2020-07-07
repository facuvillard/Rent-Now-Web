import React, { useState, useContext, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import firebaseApp from "../../firebase";
import { withRouter } from "react-router-dom";
import MuiAlert from "@material-ui/lab/Alert";
import clsx from "clsx";
import { useFormik } from "formik";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {AuthContext} from "../../Auth/Auth"
import * as Roles from "../../constants/auth/roles"
import * as Routes from "../../constants/routes"
import { OutlinedInput, InputLabel, FormControl } from "@material-ui/core";
import loginImg from "../../assets/img/login-img.jpg";
import { recoverAndResetPassword } from "../../api/auth";
import { Alert } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import Collapse from "@material-ui/core/Collapse";
import {CircularProgress} from "@material-ui/core"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {/* Cambiar por Link  del react-router-dom */}
      <Link color="inherit" href="http://localhost:3000/">
        Rent now
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${loginImg})`,
    backgroundRepeat: "repeat",
    backgroundColor: theme.palette.secondary.light,
    backgroundSize: "cover",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  hideLoginError: {
    display: "none",
  },
  margin: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
}));

const Login = (props) => {
  const [loginError, setLoginError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {userRoles} = useContext(AuthContext);

  const [alertConst, setAlertConst] = useState({
    severity: "success",
    text: "",
    open: false,
  });
  

  const classes = useStyles();

  useEffect(() => {
    switch (userRoles[0]) {
      case Roles.ADMIN_APP : {
        props.history.push(Routes.USUARIOS);
        break;
      }
      case Roles.ADMIN_COMPLEJO : {
        props.history.push(Routes.COMPLEJOS);
        break;
      }
      default : {
        break;
      }
      
    }
  }, [userRoles])

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      handleSubmit(values.email, values.password);
    },
  });

  const handleSubmit = (email, password) => {
    setIsLoading(true)
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        
      })
      .catch((result) => {
        setIsLoading(false)
        setLoginError(true);
      });
  };

  const handleClickShowPassword = () => {
    setShowPassword((oldShowPass) => !oldShowPass);
  };

  const handleClickRecoverAndResetPassword = async (email) => {
    console.log(email);

    const result = await recoverAndResetPassword(email);

    if (result.status === "OK") {
      setAlertConst({...alertConst, open: true, text: "Se ha enviado un mail para recuperar contraseña, por favor revise su correo electronico.", severity: "success"})
      console.log(result.message);
    } else {
      setAlertConst({...alertConst, open: true, text: "No se puede recuperar contraseña, por favor ingrese un email válido.", severity: "error"})
      console.log(result.message);
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false}  md={8} className={classes.image} />
      <Grid item xs={12}  md={4} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <form className={classes.form} onSubmitCapture={formik.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <FormControl
              variant="outlined"
              fullWidth
              className={clsx(classes.margin, classes.textField)}
            >
              <InputLabel htmlFor="standard-adornment-password">
                Contraseña
              </InputLabel>

              <OutlinedInput
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type={showPassword ? "text" : "password"}
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                autoComplete="current-password"
                endAdornment={
                  <InputAdornment>
                    <IconButton
                      aria-label="Mostrar/Ocultar Contraseña"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <MuiAlert
              severity="error"
              className={clsx({ [classes.hideLoginError]: !loginError })}
            >
              Usuario y/o contraseña incorrectos.
            </MuiAlert>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isLoading}
            >
              {!isLoading ? "Ingresar" : <CircularProgress />}
            </Button>
            <Grid container>
              <Grid item xs>
                {/* Cambiar por Link de react-router-dom */}
                <Link
                  href="#"
                  variant="body2"
                  onClick={() =>
                    handleClickRecoverAndResetPassword(formik.values.email)
                  }
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                {/* Cambiar por Link to="/contacto del react-router-dom */}
                <Link href="/contacto" variant="body2">
                  {"¿No tienes una cuenta? Contactanos"}
                </Link>
              </Grid>
            </Grid>
            <Collapse in={alertConst.open}>
              <Alert
                severity={alertConst.severity}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setAlertConst({ ...alertConst, open: false });
                    }}
                  >
                    <CloseIcon fontSize="inherit" />
                  </IconButton>
                }
              >
                {alertConst.text}
              </Alert>
            </Collapse>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default withRouter(Login);
