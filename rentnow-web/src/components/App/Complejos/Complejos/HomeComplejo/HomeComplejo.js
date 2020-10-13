import React, { useState, useEffect } from "react";

//react-router

import { useParams } from "react-router-dom";

//Material UI
import { Typography, Grid, Paper } from "@material-ui/core";

//API
import { getCantReservasByIdComplejo } from "api/reservas";

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

import ResponsiveBarChart from "./ResponsiveBarChart";

const data = [
  {
    country: "AD",
    "hot dog": 87,
  },
  {
    country: "AE",
    "hot dog": 93,
  },
  {
    country: "AF",
    "hot dog": 9,
  },
  {
    country: "AG",
    "hot dog": 70,
  },
  {
    country: "AI",
    "hot dog": 100,
  },
  {
    country: "AL",
    "hot dog": 11,
  },
  {
    country: "AM",
    "hot dog": 71,
  },
];

const HomeComplejo = () => {
  const { idComplejo } = useParams();
  const [date, setDate] = useState();
  const [cantidadReservas, setCantidadReservas] = useState(0);

  useEffect(() => {
    getCantReservasByIdComplejo(idComplejo).then((resp) => {
      console.log(resp.data);
      if (resp.status === "OK") {
        setCantidadReservas(resp.data);
      }
    });
    setDate(moment().format("dddd DD [de] MMMM [de] YYYY"));
  }, []);

  return (
    <div>
      <Grid container spacing={4}>
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
              <CardHeader color="danger" icon stats>
                <CardIcon color="danger">
                  <EventNoteIcon />
                </CardIcon>
              </CardHeader>
              <CardBody>
                <Typography variant="h4">
                  Reservas sin asistencia: 10
                </Typography>
              </CardBody>
            </Card>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <div style={{ height: "20px", width: "200px" }}>
            <ResponsiveBarChart data={data} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default HomeComplejo;
