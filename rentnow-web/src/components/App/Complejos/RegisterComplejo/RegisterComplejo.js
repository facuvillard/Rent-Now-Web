import React, { useState, useContext, useEffect } from "react";
import { Paper } from "@material-ui/core";
import RegisterComplejoStepper from "./RegisterComplejoStepper";
import BasicData from "./Steps/BasicData/BasicData";
import Fotos from "./Steps/Fotos/Fotos";
import * as yup from "yup";
import { AuthContext } from "../../../../Auth/Auth";
import { createComplejoApi } from "../../../../api/complejos";
import { RegisterSuccessComplejo } from "./RegisterSuccessComplejo";
import AlertCustom from "components/utils/AlertCustom/AlertCustom";
import firebase from "firebase";

const phoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);

const RegistrarComplejo = () => {
  const { currentUser } = useContext(AuthContext);
  const [created, setCreated] = useState(false);
  const [complejo, setComplejo] = useState({});
  const [docRef, setDocRef] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [alertProps, setAlertProps] = useState({});
  useEffect(() => {
    setDocRef(firebase.firestore().collection("/complejos").doc());
  }, []);

  const registerComplejo = (values) => {
    let complejoToSave = { ...values, usuarios: [currentUser.uid] };

    createComplejoApi(docRef, complejoToSave).then((response) => {
      if (response.status === "OK") {
        setCreated(true);
        setComplejo(complejoToSave);
        setAlertProps({
          type: "success",
          text: response.message,
        });
        setShowAlert(true);
      } else {
        setAlertProps({
          type: "error",
          text: response.message,
        });
        setShowAlert(true);
      }
    });
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
    <>
      <Paper
        variant="outlined"
        style={{
          height: "70vh",
          overflow: "scroll",
        }}
      >
        {" "}
        {!created ? (
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
              fotos: [],
            }}
            onSubmit={(values) => {
              registerComplejo(values);
            }}
          >
            <ComplejoStep
              label="Datos básicos"
              validationSchema={BasicDataValidationSchema}
            >
              <BasicData />
            </ComplejoStep>
            <ComplejoStep label="Fotos ">
              <Fotos docRef={docRef} />
            </ComplejoStep>
          </RegisterComplejoStepper>
        ) : (
          <RegisterSuccessComplejo complejo={complejo} />
        )}
      </Paper>
      <AlertCustom
        type={alertProps.type}
        text={alertProps.text}
        open={showAlert}
        setOpen={setShowAlert}
      />
    </>
  );
};

const ComplejoStep = ({ children, errors, touched }) => {
  return <>{React.cloneElement(children, { errors, touched })}</>;
};

export default RegistrarComplejo;
