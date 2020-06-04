import React from "react";
import { Dialog as DialogMaterial } from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

export default function Modal(props) {
  const { children, title, open, setOpen } = props;
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <DialogMaterial open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
    </DialogMaterial>
  );
}
