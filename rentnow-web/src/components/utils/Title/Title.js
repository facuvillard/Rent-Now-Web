import React from "react";
import {
  Container,
  makeStyles,
  Typography,
  Breadcrumbs,
  Link,
} from "@material-ui/core";

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
}));

const Title = (props) => {
  const classes = useStyles();
  return (
    <section className={classes.root}>
      <Typography variant="h4">{props.titulo}</Typography>
      <Breadcrumbs>
        <Link color="secondary">Complejos</Link>
        <Link color="secondary">Registrar</Link>
      </Breadcrumbs>
    </section>
  );
};

export default Title;
