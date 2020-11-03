import React from "react";
import {
  Dialog as DialogMaterial,
  DialogTitle,
  DialogContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    textAlign: "center",
  },
  divider: {
    borderTop: "1px solid #BDBDBD",
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    marginTop: theme.spacing(3),
    borderRadius: "0.5px",
  },
}));

export default function Modal(props) {
  const classes = useStyles();
  const { children, title, open, setOpen, size } = props;
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DialogMaterial fullWidth maxWidth={size} open={open} onClose={handleClose}>
      <DialogTitle disableTypography className={classes.dialogTitle}>
        <Typography variant="h5">{title}</Typography>
        <hr className={classes.divider} />
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </DialogMaterial>
  );
}
