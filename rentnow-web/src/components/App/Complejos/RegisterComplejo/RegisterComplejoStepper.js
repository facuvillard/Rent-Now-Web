import React, { useState, useEffect } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Grid,
  Container,
} from "@material-ui/core";
const RegisterComplejoStepper = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [canNext, setCanNext] = useState(true);
  const [canBack, setCanBack] = useState(false);
  useEffect(() => {
    const numberOfSteps = props.data.length - 1;
    if (activeStep === numberOfSteps) {
      setCanNext(false);
    } else {
      setCanNext(true);
    }
    if (activeStep === 0) {
      setCanBack(false);
    } else {
      setCanBack(true);
    }
  }, [activeStep]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (stepIndex) => {
    return <div>{props.data[stepIndex].stepContent}</div>;
  };
  return (
    <>
      <Stepper activeStep={activeStep}>
        {props.data.map((step) => (
          <Step>
            <StepLabel>{step.stepLabel}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Container>{getStepContent(activeStep)}</Container>
      <Grid container justify="space-evenly">
        <Grid item>
          <Button
            disabled={!canBack}
            variant="contained"
            color="primary"
            onClick={handleBack}
          >
            Volver
          </Button>
        </Grid>
        <Grid item>
          <Button
            disabled={!canNext}
            variant="contained"
            color="primary"
            onClick={handleNext}
          >
            Siguiente
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
export default RegisterComplejoStepper;
