import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Grid } from "@material-ui/core";
import BarChart from "./BarChart";
import MaterialTable from "material-table";
import moment from "moment";
import { getRankingConcurrenciaApi } from "api/estadisticas";
import { CircularProgress, Paper } from "@material-ui/core";
export default function RankingConcurrencia(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [ranking, setRanking] = useState([]);
  const [date, setDate] = useState(moment().add(-1, "months").toDate());
  const [dateToShow, setDateToShow] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    getRankingConcurrenciaApi(date).then((resp) => {
      setRanking(resp.data);
      setIsLoading(false);
    });
  }, [date]);

  return (
    <Grid container spacing={3}>
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
      <Grid item xs={12}>
        <Paper elevation={3}>
          <div
            style={{
              width: "100%",
              height: "30em",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {isLoading ? <CircularProgress /> : <BarChart data={ranking} />}
          </div>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3}>
          <MaterialTable
            isLoading={isLoading}
            title={null}
            columns={[
              {
                title: "Ranking",
                render: (rowData) => rowData.tableData.id + 1,
              },
              { title: "Complejo", field: "nombreComplejo" },
              { title: "Cantidad reservas", field: "cantidadReservas" },
            ]}
            data={ranking}
            options={{
              actionsColumnIndex: -1,
              pageSize: 10,
              pageSizeOptions: [10],
              rowStyle: {
                backgroundColor: "#FAFAFA",
              },
              headerStyle: {
                backgroundColor: "#656b74",
                color: "#FFF",
              },
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
