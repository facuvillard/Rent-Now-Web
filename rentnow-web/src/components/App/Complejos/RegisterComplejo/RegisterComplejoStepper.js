import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Grid,
  Container,
} from "@material-ui/core";
import { Formik, Form } from "formik";


const RegisterComplejoStepper = ({ children, ...props }) => {
  const childrenArray = React.Children.toArray(children);
  const [activeStep, setActiveStep] = useState(0);
  const currentChild = childrenArray[activeStep];

  const isLastStep = () => {
    return activeStep === childrenArray.length - 1;
  };

  const isFotosStep = () => {
    return activeStep === 1; // 1 : fotos
  };

  const isHorariosStep = () => {
    return activeStep === 3
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleFormSubmit = async (values) => {
    if (isLastStep()) {
      await props.onSubmit(values);
      return;
    }
    setActiveStep((step) => step + 1);
  };

  const BackNextBtns = (props) => {
    return (
      <Grid
        container
        style={{ marginTop: "auto", marginBottom: "1%" }}
        justify="space-evenly"
      >
        <Grid item>
          <Button
            disabled={!activeStep > 0}
            variant="contained"
            color="primary"
            onClick={handleBack}
          >
            Volver
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" disabled={props.disabled} color="primary" type="submit">
            {isLastStep() ? "Registrar" : "Siguiente"}
          </Button>
        </Grid>
      </Grid>
    );
  };

  return (
    <Container
      style={{
        height: "100%",
        display: "flex",
        flexGrow: "1",
        flexDirection: "column",
      }}
    >
      <Stepper activeStep={activeStep}>
        {childrenArray.map((step) => (
          <Step key={step.props.label}>
            <StepLabel>{step.props.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Formik
        {...props}
        onSubmit={handleFormSubmit}
        validationSchema={currentChild.props.validationSchema}
      >
        {({ errors, values, touched }) => (
          <Form
            style={{
              height: "100%",
              display: "flex",
              flexGrow: "1",
              flexDirection: "column",
            }}
          >
            {React.cloneElement(currentChild, {
              errors,
              touched
            })}
            {isFotosStep() && values.fotos.length === 0 ? null : <BackNextBtns disabled={isHorariosStep() && Object.keys(values.horarios).length < 8 } />}
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default RegisterComplejoStepper;
