import React, { useState, useEffect } from "react";
import {
  CardContent,
  CardMedia,
  Card,
  CardActions,
  Typography,
  Grid,
  CircularProgress,
  Button,
  Fab,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import LinkCustom from "components/utils/LinkCustom/LinkCustom";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import { useLocation, useParams } from "react-router-dom";
import { getEspaciosByIdComplejo } from "api/espacios";
import imgPlaceHolder from "assets/img/image-placeholder.png";
import Modal from "components/utils/Dialog/Dialog";
import AlertCustom from "components/utils/AlertCustom/AlertCustom";
import DeleteEspacio from "components/App/Espacios/DeleteEspacio";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  addButton: {
    position: "fixed",
    bottom: theme.spacing(3),
    right: theme.spacing(3),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function Espacios(props) {
  const [espacios, setEspacios] = useState([]);
  const [selectedEspacio, setSelectedEspacio] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { idComplejo } = useParams();
  const currentLocation = useLocation().pathname;
  const classes = useStyles();

  const [openModal, setOpenModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");
  const [alertType, setAlertType] = useState("");

  useEffect(() => {
    getEspaciosByIdComplejo(idComplejo).then((response) => {
      if (response.status === "OK") {
        setEspacios(response.data);
      }
      setIsLoading(false);
    });
  }, [isLoading, idComplejo]);

  return (
    <>
      {isLoading ? (
        <Grid container justify="center">
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : (
        <>
          {espacios.length === 0 ? (
            <Grid
              container
              justify="center"
              className={classes.circularProgress}
            >
              <Alert severity="info">
                <AlertTitle>No tienes espacios registrados</AlertTitle>
                ¡Haz click en el botón <strong>Nuevo espacio</strong> y
                registralos!
              </Alert>
            </Grid>
          ) : (
            <Grid container spacing={3}>
              {espacios.map((espacio) => (
                <Grid key={espacio.id} item xs={12} sm={3}>
                  <Card>

                    <CardMedia
                      component="img"
                      height="140"
                      width="140"
                      image={
                        espacio.foto.length === 0
                          ? imgPlaceHolder
                          : espacio.foto[0]
                      }
                      title={espacio.nombre}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {espacio.nombre}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {espacio.tipoEspacio} - {espacio.infraestructura}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          setSelectedEspacio(espacio);
                          setOpenModal(true);
                        }}
                      >
                        Eliminar
                      </Button>
                      <LinkCustom
                        to={currentLocation + "/" + espacio.id + "/modificar"}
                      >
                        <Button startIcon={<EditIcon />}>Editar</Button>
                      </LinkCustom>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
      <LinkCustom to={currentLocation + "/registrar"}>
        <Fab
          color="primary"
          aria-label="add"
          title="Registrar espacios"
          className={classes.addButton}
          variant="extended"
        >
          <AddIcon className={classes.extendedIcon} />
          Nuevo espacio
        </Fab>
      </LinkCustom>

      <Modal
        size="sm"
        title={
          "¿Seguro que desea eliminar el espacio '" +
          selectedEspacio.nombre +
          "'?"
        }
        open={openModal}
        setOpen={setOpenModal}
      >
        <DeleteEspacio
          setOpenAlert={setOpenAlert}
          setOpenModal={setOpenModal}
          setIsLoading={setIsLoading}
          espacio={selectedEspacio}
          setAlertContent={setAlertContent}
          setAlertType={setAlertType}
        />
      </Modal>

      <AlertCustom
        open={openAlert}
        setOpen={setOpenAlert}
        text={alertContent}
        type={alertType}
      />
    </>
  );
}
