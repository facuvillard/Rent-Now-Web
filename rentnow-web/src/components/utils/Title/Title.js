import React from "react";
import {
  makeStyles,
  Typography,
  Breadcrumbs,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Chip from '@material-ui/core/Chip';
import { emphasize, withStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    overflow: "hidden",
    backgroundColor: "#f3f3f3",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    height: "100px",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  breadcrumbs: {
    [theme.breakpoints.down("sm")]: { display: "none" },
  },
  link: {
    textDecoration: "none",
  },
}));

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.primary.light,
    height: theme.spacing(4),
    color: theme.palette.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
    '&:active': {
      boxShadow: theme.shadows[5],
      backgroundColor: emphasize(theme.palette.primary.main, 0.50),
    },
  },
}))(Chip);

const elementos = [
  {
    nombre: "Complejos",
    ruta: "/app/complejos"
  },
  {
    nombre: "Registrar",
    ruta: "/admin/usuarios"
  },
  {
    nombre: "Hola",
    ruta: ""
  },
]


const Title = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <section className={classes.root}>
      {matches ? (
        <Typography variant="h4" color="secondary" >{props.titulo}</Typography>
      ) : (
          <Typography variant="h6" color="secondary" >{props.titulo}</Typography>
        )}
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} maxItems={2} className={classes.breadcrumbs}>
        {elementos.map((elementos) => (
          <Link key={elementos.nombre} to={elementos.ruta} className={classes.link}>
            <StyledBreadcrumb label={elementos.nombre} />
          </Link>
        ))}
      </Breadcrumbs>
    </section>
  );
};

export default Title;
