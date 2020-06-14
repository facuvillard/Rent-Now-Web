import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const AlertCustom = (props) => {
  const handleClose = () => {
    props.setOpen(false);
  };
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={props.open}
      autoHideDuration={props.duration ? props.duration : 2500}
      onClose={handleClose}
      key={"top" + "center"}
    >
      <Alert
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={handleClose}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        severity={props.type}
      >
        {props.text}
      </Alert>
    </Snackbar>
  );
};

export default AlertCustom;
