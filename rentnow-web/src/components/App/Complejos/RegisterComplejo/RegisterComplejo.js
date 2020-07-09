import React from "react";
import { Container, Paper } from "@material-ui/core";
import Title from "../../../utils/Title/Title";
import RegisterComplejoStepper from "./RegisterComplejoStepper";
const RegistrarComplejo = () => {
  const data = [
    { stepLabel: "Datos basicos", stepContent: <Title titulo="AAAAA" /> },
    { stepLabel: "Ubicacion", stepContent: <Title titulo="BBBBB" /> },
    { stepLabel: "Fotos", stepContent: <Title titulo="CCCCC" /> },
    { stepLabel: "Dias y Horarios", stepContent: <Title titulo="DDDDDD" /> },
  ];
  return (
    <Paper variant="outlined">
      <RegisterComplejoStepper data={data} />
    </Paper>
  );
};

export default RegistrarComplejo;
