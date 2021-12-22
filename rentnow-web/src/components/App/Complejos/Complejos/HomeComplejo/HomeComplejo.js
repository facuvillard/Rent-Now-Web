import React, { useState, useEffect } from "react";

//react-router
import { useParams } from "react-router-dom";

//Material UI
import {
  Typography,
  Grid,
  Paper,
  Button,
  ButtonGroup,
  makeStyles
} from "@material-ui/core";

//API
import { getDatosHome } from "api/estadisticas";

//Moment
import moment from "moment";
import "moment/locale/es";

//MATERIAL UI DASHBOARD
import Card from "components/utils/Card/Card";
import CardHeader from "components/utils/Card/CardHeader";
import CardIcon from "components/utils/Card/CardIcon";
import CardBody from "components/utils/Card/CardBody";

//ICONS
import TodayIcon from "@material-ui/icons/Today";
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventBusyIcon from '@material-ui/icons/EventBusy';

//NIVO CHART
import ResponsiveBarChart from "./ResponsiveBarChart";
import ResponsivePieChart from "./ResponsivePieChart";

const useStyles = makeStyles((theme) => ({
  card: {
    paddingTop: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2)
  },
  color: {
    backgroundColor: "#FE2713"
  }
}));


export default function HomeComplejo() {
  const classes = useStyles();
  const { idComplejo } = useParams();
  const [date, setDate] = useState(moment().add(-1, "months").toDate());
  const [data, setData] = useState();
  const [dataPie, setDataPie] = useState([]);
  const [dateToShow, setDateToShow] = useState(1);

  useEffect(() => {
    getDatosHome(idComplejo, date).then((response) => {
      if (response.status === "OK") {
        setData(response.data);
        setDataPie([
          {
            id: "Cliente de Complejo",
            value: response.data.cantidadReservasWeb,
          },
          { 
            id: "Cliente de Aplicación",
            value: response.data.cantidadReservasApp, 
          },
        ])
      }
    });
  }, [date]);

  return (
    <div>
      <Grid container spacing={4}>
        <Grid
          item
          xs={12}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <ButtonGroup color="secondary">
            <Button
              onClick={() => {
                setDate(moment().add(-12, "months").toDate());
                setDateToShow(12);
              }}
              variant={dateToShow === 12 ? "contained" : "outlined"}
            >
              Un año
            </Button>
            <Button
              variant={dateToShow === 3 ? "contained" : "outlined"}
              onClick={() => {
                setDate(moment().add(-3, "months").toDate());
                setDateToShow(3);
              }}
            >
              Tres meses
            </Button>
            <Button
              variant={dateToShow === 1 ? "contained" : "outlined"}
              onClick={() => {
                setDate(moment().add(-1, "months").toDate());
                setDateToShow(1);
              }}
            >
              Un mes
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Paper elevation={3}>
            <Card>
              <CardHeader color="warning" icon stats>
                <CardIcon color="warning">
                  <TodayIcon />
                </CardIcon>
                <Grid className={classes.card}>
                  <Typography align='right' variant="body1" color='textSecondary'>
                    Día
                  </Typography>
                  <Typography align='right' variant="h6" color='textPrimary'>
                  {moment().format("dddd DD [de] MMMM [de] YYYY")}
                  </Typography>
                </Grid>
              </CardHeader>
              <CardBody>
              </CardBody>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Paper elevation={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <EventAvailableIcon />
                </CardIcon>
                <Grid className={classes.card}>
                  <Typography align='right' variant="body1" color='textSecondary'>
                    Reservas Totales Concretadas
                  </Typography>
                  <Typography align='right' variant="h5" color='textPrimary'>
                    {data ? data.cantidadConcretadas : ""}
                  </Typography>
                </Grid>
              </CardHeader>
              <CardBody>

              </CardBody>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Paper elevation={3}>
            <Card>
              <CardHeader icon stats>
                <CardIcon color="danger">
                  <EventBusyIcon />
                </CardIcon>
                <Grid className={classes.card}>
                  <Typography align='right' variant="body1" color='textSecondary'>
                    Reservas Inconclusas
                  </Typography>
                  <Typography align='right' variant="h5" color='textPrimary'>
                    {data ? data.cantidadInconclusas : "0"}
                  </Typography>
                </Grid>
              </CardHeader>
              <CardBody>

              </CardBody>
            </Card>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <Paper elevation={3}>
            <Card>
              <CardHeader color="primary">
                <Typography variant="h5" align='center'>
                  Cantidad de Reservas por Espacio
                </Typography>
              </CardHeader>
              <CardBody>
                <div
                  style={{
                    width: "100%",
                    height: "25em",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <ResponsiveBarChart data={data ? data.data : []} />
                </div>
              </CardBody>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Paper elevation={3}>
            <Card>
              <CardHeader color="primary">
                <Typography variant="h5" align='center'>
                  Reservas por Tipo de Cliente
                </Typography>
              </CardHeader>
              <CardBody>
                <div
                  style={{
                    width: "100%",
                    height: "25em",
                  }}
                >
                  <ResponsivePieChart data={dataPie} />
                </div>
              </CardBody>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
