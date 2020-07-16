import React from "react";
import Navbar from "../Navbar";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Title from "../../utils/Title/Title";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer - 1,
    color: "#fff",
  },
}));

const LayoutWithoutSidebar = (props) => {
  const classes = useStyles();
  return (
    <div>
      <Navbar withoutSidebar={true} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Container maxWidth="xl">
          <Title titulo={props.children.props.title} breadcrumbs={props.children.props.breadcrumbs} />
          {props.children}
        </Container>
      </main>
    </div>
  );
};

export default LayoutWithoutSidebar;
