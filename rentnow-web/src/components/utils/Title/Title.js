import React from "react";
import {
  makeStyles,
  Typography,
  Breadcrumbs,
  Link,
} from "@material-ui/core";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

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
}));

const breadcrumbs = [
  {
    id: "1",
    nombre: "Complejos",
    color: "inherit"
  },
  {
    id: "2",
    nombre: "Registrar",
    color: "inherit"
  },
  {
    id: "3",
    nombre: "Hola",
    color: "textPrimary"
  },
]


const Title = (props) => {
  const classes = useStyles();
  return (
    <section className={classes.root}>
      <Typography variant="h4" color="secondary">{props.titulo}</Typography>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} maxItems={2} className={classes.breadcrumbs}>
        {breadcrumbs.map((breadcrumbs) => (
          <Link color={breadcrumbs.color} key={breadcrumbs.id}>{breadcrumbs.nombre}</Link>
        ))}
      </Breadcrumbs>

    </section>
  );
};

export default Title;
