import React from "react";
import {
  Dialog as DialogMaterial,
  DialogTitle,
  DialogContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  dialogTitle: {
    textAlign: "center",
  },
});

export default function Modal(props) {
  const classes = useStyles();
  const { children, title, open, setOpen, size } = props;
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DialogMaterial fullWidth maxWidth={size} open={open} onClose={handleClose}>
      <DialogTitle disableTypography className={classes.dialogTitle}>
        <Typography variant="h4">{title}</Typography>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </DialogMaterial>
  );
}
