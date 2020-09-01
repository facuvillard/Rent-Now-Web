import React, { useState, useEffect } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import firebase from "firebase";
import { Button, Typography, CircularProgress, Grid } from "@material-ui/core";
import DoneAllOutlinedIcon from "@material-ui/icons/DoneAllOutlined";
import { makeStyles } from "@material-ui/core/styles";
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

registerPlugin(FilePondPluginImagePreview);
registerPlugin(FilePondPluginFileValidateType);

const useStyles = makeStyles((theme) => ({
  uploader: {
    marginTop: theme.spacing(3),
  },
}));

export const ImageUploader = React.memo(function ({maxFiles, url, getUrls}) {
  const filesQuantity = maxFiles || 5;
  const classes = useStyles();
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
        .child(`${url}/${foto.name}`)
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
      setImgs([])
    });
  };

  useEffect(() => {
    if (imgsUrls.length === imgsRefs.length && imgsUrls.length > 0) {
      getUrls(imgsUrls);
    }
  }, [imgsUrls, imgsRefs.length, getUrls]);

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
            {nroImagen} de {imgsRefs.length} imágenes subidas con éxito.
          </Typography>
        </Grid>
      </Grid>
    );

  return (
    <>
      <FilePond
        className={classes.uploader}
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
        maxFiles={filesQuantity}
        dropValidation={true}
        onaddfile={async (error, fileAdded) => {
          if (error) {
            return
          }
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
      {imgsRefs.length === 0 ? null : (
        <Button
          onClick={handleFileUpload}
          color="primary"
          variant="contained"
          fullWidth
        >
          Subir Imágenes
        </Button>
      )}
    </>
  );
});
