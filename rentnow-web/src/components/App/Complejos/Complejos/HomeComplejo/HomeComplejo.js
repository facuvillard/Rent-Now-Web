import React, { useState, useEffect } from "react";

//react-router
import { useParams } from "react-router-dom";

//Material UI
import { Typography, Grid, Paper } from "@material-ui/core";

//API
import { getCantReservasByIdComplejoYMes, getReservas } from "api/reservas";
import { getEspaciosByIdComplejo } from "api/espacios";
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

const HomeComplejo = () => {
  const { idComplejo } = useParams();
  const [date, setDate] = useState();
  const [cantidadReservas, setCantidadReservas] = useState(0);
  const [data, setData] = useState([]);
  const [cantUltMes, setCantUltMes] = useState(0);

  const dataPie = [
    {
      id: "Cliente de complejo",
      value: 50,
    },
    { id: "Cliente de aplicación", value: 100 },
  ];

  useEffect(() => {
    getReservas(idComplejo).then((resp) => {
      if (resp.status === "OK") {
        const reservas = resp.data;
        setCantidadReservas(reservas.length);
        const array = [];
        getEspaciosByIdComplejo(idComplejo).then((resp) => {
          if (resp.status === "OK") {
            const espacios = resp.data;
            espacios.map((espacio) => {
              var obj = { nombre: espacio.nombre, cantReservas: 0 };
              for (let i = 0; i < reservas.length; i++) {
                if (espacio.id === reservas[i].espacio.id) {
                  obj.cantReservas += 1;
                }
              }
              console.log(obj);
              array.push(obj);
            });
          }
          setData(array);
        });
      }
    });

    getCantReservasByIdComplejoYMes(idComplejo, moment().month() - 1).then(
      (resp) => {
        if (resp.status === "OK") {
          setCantUltMes(resp.data);
        } else {
          alert(resp.error);
        }
      }
    );
    setDate(moment().format("dddd DD [de] MMMM [de] YYYY"));
  }, []);

  return (
    <div>
      <Grid container spacing={4}>
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
                  Reservas totales: {cantidadReservas}
                </Typography>
              </CardBody>
            </Card>
          </Paper>
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
                <Typography variant="h4">{date}</Typography>
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
                  Reservas ultimo mes: {cantUltMes}
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
                  }}
                >
                  <ResponsiveBarChart data={data} />
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
};

export default HomeComplejo;
