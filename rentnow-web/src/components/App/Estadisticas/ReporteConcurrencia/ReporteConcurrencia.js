import React, { useState, useEffect } from "react";
import { ResponsiveHeatMap } from "@nivo/heatmap";
import { ResponsiveRadar } from "@nivo/radar";
import { ResponsiveBar } from "@nivo/bar";
import { getReservasComplejoHistorico } from "api/reservas";
import { useParams } from "react-router-dom";
import { tiposEspacio } from "constants/espacios/constants";
import {
  Typography,
  ButtonGroup,
  Button,
  Paper,
  Grid,
  TextField,
  InputAdornment,
  ExpansionPanelDetails,
  ExpansionPanel,
  ExpansionPanelSummary,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DateRangeIcon from "@material-ui/icons/DateRange";
import moment from "moment";
import Datepicker from "react-datepicker";
import es from "date-fns/locale/es";

const useStyles = makeStyles((theme) => ({
  grilla: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(3),
  },
  titulo: {
    marginLeft: theme.spacing(3),
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  expansionPanel: {
    width: "100%",
    border: "1px solid rgba(0, 0, 0, .125)",
    backgroundColor: "#FAFAFA",
    marginBottom: theme.spacing(3),
  },
}));

const ReporteConcurrencia = () => {
  const classes = useStyles();
  const [reservas, setReservas] = useState([]);
  const [daySelected, setDaySelected] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [reservasByDay, setReservasByDay] = useState([]);
  const [reservasByFranja, setReservasByFranja] = useState([]);
  const [fechaDesde, setFechaDesde] = useState(moment().add(-2, "M").toDate());
  const [fechaHasta, setFechaHasta] = useState(moment().toDate());

  const { idComplejo } = useParams();

  useEffect(() => {
    setIsLoading(true);
    getReservasComplejoHistorico(idComplejo, fechaDesde, fechaHasta).then(
      (response) => {
        if (response.status === "OK") {
          setReservas(response.data);
          formatReservasByDay(response.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      }
    );
  }, [idComplejo]);

  useEffect(() => {
    if (moment(fechaDesde).isAfter(moment(fechaHasta))) {
      setFechaDesde(moment(fechaHasta).add(-1, "M").toDate());
    }
  }, [fechaHasta]);

  const formatReservasByDay = (reservasToFormat) => {
    let reservasByDay = [];
    reservasToFormat.forEach((reservaToFormat) => {
      const index = reservasByDay.findIndex(
        (reserva) => reserva.tipoEspacio === reservaToFormat.espacio.tipoEspacio
      );
      const diastring = reservaToFormat.diaString
        .normalize("NFD")
        .replace(
          /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
          "$1"
        )
        .normalize();
      if (index !== -1) {
        reservasByDay[index][diastring] = reservasByDay[index][diastring] + 1;
      } else {
        const newTipoEspacio = {
          tipoEspacio: reservaToFormat.espacio.tipoEspacio,
          Lunes: reservaToFormat.diaString === "Lunes" ? 1 : 0,
          Martes: reservaToFormat.diaString === "Martes" ? 1 : 0,
          Miercoles: diastring === "Miercoles" ? 1 : 0,
          Jueves: reservaToFormat.diaString === "Jueves" ? 1 : 0,
          Viernes: reservaToFormat.diaString === "Viernes" ? 1 : 0,
          Sabado: diastring === "Sabado" ? 1 : 0,
          Domingo: reservaToFormat.diaString === "Domingo" ? 1 : 0,
        };
        reservasByDay.push(newTipoEspacio);
      }
    });

    setReservasByDay(reservasByDay);
  };

  useEffect(() => {
    function formatReservasByFranja(reservasToFormat) {
      const reservasByFranjaArray = [
        {
          franjaHoraria: "Mañana",
          "Cancha Futbol": 0,
          "Cancha Basquet": 0,
          "Cancha Handball": 0,
          "Cancha Tenis": 0,
          "Cancha Paddle": 0,
          "Cancha Hockey": 0,
          Quincho: 0,
          Asador: 0,
        },
        {
          franjaHoraria: "Siesta",
          "Cancha Futbol": 0,
          "Cancha Basquet": 0,
          "Cancha Handball": 0,
          "Cancha Tenis": 0,
          "Cancha Paddle": 0,
          "Cancha Hockey": 0,
          Quincho: 0,
          Asador: 0,
        },
        {
          franjaHoraria: "Tarde",
          "Cancha Futbol": 0,
          "Cancha Basquet": 0,
          "Cancha Handball": 0,
          "Cancha Tenis": 0,
          "Cancha Paddle": 0,
          "Cancha Hockey": 0,
          Quincho: 0,
          Asador: 0,
        },
        {
          franjaHoraria: "Noche",
          "Cancha Futbol": 0,
          "Cancha Basquet": 0,
          "Cancha Handball": 0,
          "Cancha Tenis": 0,
          "Cancha Paddle": 0,
          "Cancha Hockey": 0,
          Quincho: 0,
          Asador: 0,
        },
      ];
      reservasToFormat.forEach((reservaToFormat) => {
        const diastring = reservaToFormat.diaString
          .normalize("NFD")
          .replace(
            /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
            "$1"
          )
          .normalize();

        if (diastring !== daySelected) {
          return;
        }
        const index = reservasByFranjaArray.findIndex(
          (item) => item.franjaHoraria === reservaToFormat.franjaHoraria
        );
        if (index !== -1) {
          reservasByFranjaArray[index][reservaToFormat.espacio.tipoEspacio] =
            reservasByFranjaArray[index][reservaToFormat.espacio.tipoEspacio]
              ? reservasByFranjaArray[index][
                  reservaToFormat.espacio.tipoEspacio
                ] + 1
              : 1;
        }
      });
      setReservasByFranja(reservasByFranjaArray);
    }
    formatReservasByFranja(reservas);
  }, [daySelected, reservas]);

  const handleApplyFilters = () => {
    setIsLoading(true);
    getReservasComplejoHistorico(idComplejo, fechaDesde, fechaHasta).then(
      (response) => {
        if (response.status === "OK") {
          setReservas(response.data);
          formatReservasByDay(response.data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      }
    );
  };

  const byFranjaChart = () => {
    return (
      <ResponsiveBar
        theme={{
          background: "transparent",
          fontSize: 15,
          fontFamily: "sans-serif",
          grid: {},
          labels: {
            text: {
              fontSize: 18,
            },
          },
        }}
        data={reservasByFranja}
        keys={tiposEspacio}
        indexBy="franjaHoraria"
        margin={{ top: 50, right: 160, bottom: 50, left: 40 }}
        padding={0.3}
        innerPadding={0}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        borderRadius={10}
      />
    );
  };

  return (
    <>
      <ExpansionPanel className={classes.expansionPanel} expanded={true}>
        <ExpansionPanelSummary aria-controls="filtros" id="filtros">
          <Typography className={classes.heading}>
            <b>FILTROS</b>
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ margin: 10 }}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={5}
            style={{ paddingLeft: 50 }}
          >
            <Grid item md={2} xs={4}>
              <Datepicker
                selected={fechaDesde}
                onChange={(date) => setFechaDesde(date)}
                dateFormat="MM/yyyy"
                locale={es}
                showMonthYearPicker
                maxDate={fechaHasta}
                customInput={
                  <TextField
                    label="Desde"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <DateRangeIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                }
              />
            </Grid>
            <Grid item md={2} xs={4}>
              <Datepicker
                selected={fechaHasta}
                onChange={(date) => setFechaHasta(date)}
                dateFormat="MM/yyyy"
                locale={es}
                maxDate={moment().toDate()}
                showMonthYearPicker
                customInput={
                  <TextField
                    label="Hasta"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <DateRangeIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                }
              />
            </Grid>
            <Grid item md={2} xs={4}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={handleApplyFilters}
              >
                Aplicar
              </Button>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <Paper elevation={6} style={{ height: "40vh" }}>
        <ResponsiveHeatMap
          theme={{
            background: "transparent",
            fontSize: 15,
            fontFamily: "sans-serif",
            grid: {},
            labels: {
              text: {
                fontSize: 18,
              },
            },
          }}
          padding={2}
          data={reservasByDay}
          keys={[
            "Lunes",
            "Martes",
            "Miercoles",
            "Jueves",
            "Viernes",
            "Sabado",
            "Domingo",
          ]}
          indexBy="tipoEspacio"
          margin={{ top: 50, right: 40, bottom: 40, left: 80 }}
          forceSquare={false}
          axisTop={{
            orient: "top",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendOffset: 36,
          }}
          axisRight={null}
          axisBottom={null}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -55,
            legendPosition: "middle",
            legendOffset: -40,
          }}
          colors="YlOrRd"
          cellOpacity={0.8}
          cellBorderWidth={2}
          cellBorderColor={{ from: "color", modifiers: [["darker", 0.7]] }}
          labelTextColor={{ from: "color", modifiers: [["darker", 3]] }}
          defs={[
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "rgba(0, 0, 0, 0.1)",
              rotation: -45,
              lineWidth: 4,
              spacing: 7,
            },
          ]}
          fill={[{ id: "lines" }]}
          animate={false}
          hoverTarget="column"
          cellHoverOthersOpacity={0.25}
          onClick={(cell, event) => {
            setDaySelected(cell.xKey);
          }}
        />
      </Paper>

      {daySelected ? (
        <>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.grilla}
          >
            <Grid item md={10}>
              <Typography variant="h5" className={classes.titulo}>
                DÍA SELECCIONADO: {daySelected}
              </Typography>
            </Grid>
            <Grid item md={12} className={classes.paper}>
              <Paper elevation={6} style={{ height: "40vh" }}>
                {byFranjaChart()}
              </Paper>
            </Grid>
          </Grid>
        </>
      ) : null}
    </>
  );
};

export default ReporteConcurrencia;
