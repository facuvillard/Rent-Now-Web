import React from "react";
import { Button, ButtonGroup, Grid } from "@material-ui/core";
import BarChart from "./BarChart";
import MaterialTable from "material-table";

const data = [
  { id: "Tokyo", value: 3000000 },
  { id: "Osaka", value: 4000000 },
  { id: "Nara", value: 5000000 },
  { id: "Kyoto", value: 6000000 },
  { id: "Kobe", value: 7000000 },
  { id: "Sapporo", value: 8000000 },
  { id: "NY", value: 9000000 },
];

export default function RankingConcurrencia(props) {
  return (
    <Grid container spacing={3}>
      <Grid
        item
        xs={12}
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <ButtonGroup color="primary" variant="contained">
          <Button>Un año</Button>
          <Button>3 meses</Button>
          <Button>Mes actual</Button>
        </ButtonGroup>
      </Grid>
      <Grid item xs={12}>
        <div
          style={{
            width: "100%",
            height: "30em",
          }}
        >
          <BarChart data={data} />
        </div>
      </Grid>
      <Grid item xs={12}>
        <MaterialTable
          columns={[
            { title: "Ranking", field: "ranking" },
            { title: "Complejo", field: "complejo" },
            { title: "Cantidad reservas", field: "cantReservas" },
          ]}
          data={[{ ranking: 1, complejo: "La Gran 7", cantReservas: 20 }]}
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
      </Grid>
    </Grid>
  );
}
