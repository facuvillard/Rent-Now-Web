import React from "react";
import { Typography, Grid, Paper } from "@material-ui/core";

//MATERIAL UI DASHBOARD
import Card from "components/utils/Card/Card";
import CardHeader from "components/utils/Card/CardHeader";
import CardIcon from "components/utils/Card/CardIcon";
import CardBody from "components/utils/Card/CardBody";

//ICONS
import TodayIcon from "@material-ui/icons/Today";
import EventNoteIcon from "@material-ui/icons/EventNote";

const HomeComplejo = () => {
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
                <Typography variant="h4">Viernes 9 de Octubre</Typography>
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
                <Typography variant="h4">Reservas activas: 12</Typography>
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
      </Grid>
    </div>
  );
};

export default HomeComplejo;
