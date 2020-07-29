import React, { useState, useEffect } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import firebase from "firebase";
import { Button, Typography, CircularProgress, Grid } from "@material-ui/core";
import DoneAllOutlinedIcon from "@material-ui/icons/DoneAllOutlined";

registerPlugin(FilePondPluginImagePreview);

export const ImageUploader = React.memo(function (props) {
  const [imgsRefs, setImgs] = useState([]);
  const [imgsUrls, setImgsUrls] = useState([]);
  const [uploaded, setUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [nroImagen, setNroImagen] = useState(0);

  const handleFileUpload = async () => {
    setUploaded(true);
    const returnPromise = (foto) => {
      setUploading(true);
      return firebase
        .storage()
        .ref()
        .child(`complejos/${props.docRef.id}/imagenes-complejo/${foto.name}`)
        .put(foto)
        .then((snapshot) => {
          setNroImagen((old) => old + 1);
          return snapshot.ref.getDownloadURL();
        })
        .then((downloadUrl) => {
          setImgsUrls((old) => [...old, downloadUrl]);
        });
    };
    Promise.all(imgsRefs.map((img) => returnPromise(img))).then(() => {
      setUploading(false);
      setUploaded(true);
    });
  };

  useEffect(() => {
    if (imgsUrls.length === imgsRefs.length && imgsUrls.length > 0) {
      props.getUrls(imgsUrls);
    }
  }, [imgsUrls, imgsRefs.length, props]);

  if (uploading)
    return (
      <Grid
        container
        direction="column"
        alignContent="center"
        alignItems="center"
        justify="center"
      >
        <Grid item>
          <CircularProgress size={60} />
        </Grid>
        <Grid item>
          <Typography variant="subtitle1">
            Subidas <b>{nroImagen}</b> de <b>{imgsRefs.length}</b> imágenes
          </Typography>
        </Grid>
      </Grid>
    );

  if (uploaded)
    return (
      <Grid
        container
        direction="column"
        alignContent="center"
        alignItems="center"
        justify="center"
      >
        <Grid item>
          <DoneAllOutlinedIcon color="primary" fontSize="large" />
        </Grid>
        <Grid item>
          <Typography variant="h4">
            {nroImagen} de {imgsRefs.length} imagenes subidas con éxito.
          </Typography>
        </Grid>
      </Grid>
    );

  return (
    <>
      <FilePond
        allowMultiple={true}
        maxFileSize="5MB"
        labelMaxFileSizeExceeded="La imágen es demasiado grande"
        labelMaxFileSize="El máximo tamaño permitido es {filesize}"
        labelIdle={
          'Suelte las imágenes aqui o <span class="filepond--label-action"> búsquelas </span>'
        }
        acceptedFileTypes={["image/png", "image/jpeg"]}
        labelFileTypeNotAllowed="Formato de imágen inválido"
        fileValidateTypeLabelExpectedTypes="Se espera imágenes en formato .png y .jpeg"
        maxFiles={5}
        onaddfile={async (error, fileAdded) => {
          setImgs((oldImgs) => [...oldImgs, fileAdded.file]);
        }}
        onremovefile={async (error, fileRemoved) => {
          setImgs((oldImgs) => {
            const array = oldImgs.filter(
              (el) => el.name !== fileRemoved.file.name
            );
            return array;
          });
        }}
      />
      <Button
        onClick={handleFileUpload}
        color="primary"
        variant="contained"
        fullWidth
      >
        Subir Imágenes
      </Button>
    </>
  );
});
