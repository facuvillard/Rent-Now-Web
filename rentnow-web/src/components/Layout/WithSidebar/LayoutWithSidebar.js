import React, { useState } from "react";
import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
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
    width: "auto",
    height: "100vh",
    flexGrow: 1,
    marginLeft: theme.spacing(8),
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      marginLeft: theme.spacing(1),
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer - 1,
    color: "#fff",
  },
}));

const LayoutWithSidebar = (props) => {
  const classes = useStyles();
  const [isSBOpen, setIsSBOpen] = useState(false);

  const sideBarOpenHandler = () => {
    setIsSBOpen((oldIsOpen) => !oldIsOpen);
  };
  return (
    <div>
      <Navbar
        sideBarOpenHandler={sideBarOpenHandler}
        isSideBarOpen={isSBOpen}
      />
      <Sidebar
        sideBarOpenHandler={sideBarOpenHandler}
        isSideBarOpen={isSBOpen}
        params = {props.computedMatch ? props.computedMatch.params : {}}
      />
      <Backdrop
        className={classes.backdrop}
        open={isSBOpen}
        onClick={sideBarOpenHandler}
      />
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

export default LayoutWithSidebar;
