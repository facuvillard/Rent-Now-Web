import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { ImageUploader } from "components/App/Complejos/RegisterComplejo/Steps/Fotos/ImageUploader";
import { useFormikContext } from "formik";

const Fotos = (props) => {
  const { setFieldValue } = useFormikContext();

  const getUrls = React.useCallback((urls) => {
    setFieldValue("fotos", urls);
  }, [setFieldValue]);

  return (
    <Grid container spacing={5} justify="center">
      <Grid item xs={12}>
        <Typography variant="h4" marked="center" align="center" component="h2">
          FOTOS
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <ImageUploader url={`complejos/${props.docRef.id}/imagenes-complejo`} getUrls={getUrls} />
      </Grid>
    </Grid>
  );
};
export default Fotos;
