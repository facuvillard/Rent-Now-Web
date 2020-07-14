import React, { useState } from "react";
import { Container, Paper } from "@material-ui/core";
import Title from "../../../utils/Title/Title";
import RegisterComplejoStepper from "./RegisterComplejoStepper";
import BasicData from "./Steps/BasicData";
import * as yup from "yup";
const phoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
const RegistrarComplejo = () => {
  const [isStepValid, setIsStepValid] = useState(false);
  const [complejo, setComplejo] = useState({});

  const addStepDataToComplejo = (stepData) => {
    setComplejo((oldComplejo) => ({ ...oldComplejo, ...stepData }));
    setIsStepValid(true);
  };

  const BasicDataValidationSchema = yup.object({
    nombre: yup
      .string()
      .required("Porfavor, complete el campo Nombre")
      .max(30, "Como maximo puede tener 30 caracteres")
      .min(3, "Como minimo debe tener 3 caracteres"),
    telefono: yup
      .string()
      .max(11, "Como maximo 11 digitos")
      .min(8, "Como minimo 8 digitos")
      .matches(phoneRegex, "Numero de telefono invalido")
      .required("Porfavor, complete el campo Telefono"),
    email: yup
      .string()
      .email("El formato del email no es valido")
      .required("Porfavor, complete el campo Email"),
  });
  return (
    <Paper
      variant="outlined"
      style={{
        height: "70vh",
        overflow: "scroll",
      }}
    >
      <RegisterComplejoStepper
        initialValues={{
          nombre: "Sebastian",
          email: "",
          telefono: "",
          redes: {
            instagram: "",
            facebook: "",
            twitter: "",
          },
        }}
        onSubmit={(values) => {
          alert("SUBMITTING");
        }}
      >
        <ComplejoStep
          label="Datos básicos"
          validationSchema={BasicDataValidationSchema}
        >
          <BasicData />
        </ComplejoStep>
        <ComplejoStep label="Datos 2 ">
          <div>STEP 2</div>
        </ComplejoStep>
      </RegisterComplejoStepper>
    </Paper>
  );
};

const ComplejoStep = ({ children, errors, touched }) => {
  return <>{React.cloneElement(children, { errors, touched })}</>;
};

export default RegistrarComplejo;
