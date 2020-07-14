import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImagePreview);
const Fotos = () => {

 
  return (
    <Grid container spacing={5} justify="center">
      <Grid item xs={12}>
        <Typography variant="h4" marked="center" align="center" component="h2">
          FOTOS
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FilePond
          allowMultiple={true}
          maxFileSize="5MB"
          labelMaxFileSizeExceeded="La imágen es demasiado grande"
          labelMaxFileSize="El máximo tamaño permitido es {filesize}"
          labelIdle={
            'Suelte los archivos aqui o <span class="filepond--label-action"> búsquelos </span>'
          }
          acceptedFileTypes={["image/png", "image/jpeg"]}
          labelFileTypeNotAllowed="Formato de archivo inválido"
          fileValidateTypeLabelExpectedTypes="Se espera imágenes en formato .png y .jpeg"
          maxFiles={5}
          onaddfile={(error, fileItem) => {
            if (!error) {
              alert("Falta subir fotos a la BD")
            } else {
              alert("Error al agregar la foto")
            }
          }}
        />
      </Grid>
    </Grid>
  );
};
export default Fotos;
