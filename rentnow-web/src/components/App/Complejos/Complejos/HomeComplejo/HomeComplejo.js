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
import EventNoteIcon from "@material-ui/icons/EventNote";

//NIVO CHART
import ResponsiveBarChart from "./ResponsiveBarChart";
import ResponsivePieChart from "./ResponsivePieChart";

const dataPie = [
  {
    id: "Cliente de complejo",
    value: 50,
  },
  { id: "Cliente de aplicación", value: 100 },
];

export default function HomeComplejo() {
  const { idComplejo } = useParams();
  const [date, setDate] = useState(moment().add(-1, "months").toDate());
  const [data, setData] = useState({
    cantidadConcretadas: 0,
    cantidadInconclusas: 0,
    data: [],
  });

  useEffect(() => {
    getDatosHome(idComplejo, date).then((response) => {
      if (response.status === "OK") {
        setData(response.data);
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
          <ButtonGroup color="primary" variant="contained">
            <Button
              onClick={() => {
                setDate(moment().add(-12, "months").toDate());
              }}
            >
              Un año
            </Button>
            <Button
              onClick={() => {
                setDate(moment().add(-3, "months").toDate());
              }}
            >
              Tres meses
            </Button>
            <Button
              onClick={() => {
                setDate(moment().add(-1, "months").toDate());
              }}
            >
              Un mes
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Paper elevation={3}>
            <Card>
              <CardHeader color="rose" icon stats>
                <CardIcon color="rose">
                  <TodayIcon />
                </CardIcon>
              </CardHeader>
              <CardBody>
                <Typography variant="h4">
                  {moment().format("dddd DD [de] MMMM [de] YYYY")}
                </Typography>
              </CardBody>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Paper elevation={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <EventNoteIcon />
                </CardIcon>
              </CardHeader>
              <CardBody>
                <Typography variant="h4">
                  Reservas totales concretadas: {data.cantidadConcretadas}
                </Typography>
              </CardBody>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Paper elevation={3}>
            <Card>
              <CardHeader color="danger" icon stats>
                <CardIcon color="danger">
                  <EventNoteIcon />
                </CardIcon>
              </CardHeader>
              <CardBody>
                <Typography variant="h4">
                  Reservas inconclusas: {data.cantidadInconclusas}
                </Typography>
              </CardBody>
            </Card>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12} md={6}>
          <Paper elevation={3}>
            <Card>
              <CardHeader color="info">
                <Typography variant="h5">
                  Cantidad de reservas por espacio
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
                  <ResponsiveBarChart data={data.data} />
                </div>
              </CardBody>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <Paper elevation={3}>
            <Card>
              <CardHeader color="info">
                <Typography variant="h5">
                  Reservas por tipo de cliente{" "}
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
