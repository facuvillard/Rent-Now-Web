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
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const BackNextBtns = () => {
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
          <Button variant="contained" color="primary" type="submit">
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
        onSubmit={async (values) => {
          if (isLastStep()) {
            console.log("IS LAST");
            await props.onSubmit(values);
          } else {
            setActiveStep((step) => step + 1);
          }
        }}
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
            {React.cloneElement(currentChild, { errors, touched })}
            <BackNextBtns />
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default RegisterComplejoStepper;