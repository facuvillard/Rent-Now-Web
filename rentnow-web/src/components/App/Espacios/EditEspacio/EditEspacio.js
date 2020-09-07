import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
  Button,
  CircularProgress,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import BasicData from "components/App/Espacios/EditEspacio/Sections/BasicData";
import LinkCustom from "components/utils/LinkCustom/LinkCustom";

import { getEspacioById } from "api/espacios";
import { useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  expansionPanel: {
    width: "100%",
    border: "1px solid rgba(0, 0, 0, .125)",
    backgroundColor: "#FAFAFA",
    marginBottom: theme.spacing(3),
  },
  heading: {
    position: "center",
  },
  boton: {
    marginTop: theme.spacing(3),
  },
  divider: {
    borderTop: "1px solid #BDBDBD",
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    marginBottom: theme.spacing(3),
    borderRadius: "0.5px",
  },
  circularProgress: {
    marginTop: theme.spacing(25),
  },
  paragraph: {
    marginBottom: theme.spacing(2),
  },
}));

export default function EditEspacio() {
  const classes = useStyles();
  const { idEspacio, idComplejo } = useParams();
  const [espacio, setEspacio] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getEspacioById(idEspacio).then((response) => {
      if (response.status === "OK") {
        setEspacio(response.data);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    });
  }, [idEspacio]);
  return (
    <>
      {isLoading ? (
        <Grid container justify="center" className={classes.circularProgress}>
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : (
        <>
          <ExpansionPanel className={classes.expansionPanel}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h5" className={classes.heading}>
                Datos Básicos
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid item xs={12}>
                <hr className={classes.divider} />
                <BasicData espacio={espacio} />
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <ExpansionPanel className={classes.expansionPanel}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography variant="h5" className={classes.heading}>
                Foto
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid item xs={12}>
                <hr className={classes.divider} />
                <div>FOTOS DE COMPLEJO</div>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <Grid
            container
            spacing={10}
            justify="center"
            className={classes.boton}
          >
            <Grid item xs={2}>
              <LinkCustom to={"/app/complejos/" + idComplejo + "/espacios"}>
                <Button variant="contained" fullWidth color="secondary">
                  Volver
                </Button>
              </LinkCustom>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
}
