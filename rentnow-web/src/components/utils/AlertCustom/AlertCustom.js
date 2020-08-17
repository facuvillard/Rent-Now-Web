import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const AlertCustom = (props) => {
  const duration = props.duration || 2500;
  const handleClose = () => {
    props.setOpen(false);
  };
  const verticalPosition = props.vertical || "top";
  const horizontalPosition = props.horizontal || "center";
  return (
    <Snackbar
      anchorOrigin={{
        vertical: verticalPosition,
        horizontal: horizontalPosition,
      }}
      open={props.open}
      autoHideDuration={props.infinite ? null : duration}
      onClose={handleClose}
      key={verticalPosition + horizontalPosition}
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
