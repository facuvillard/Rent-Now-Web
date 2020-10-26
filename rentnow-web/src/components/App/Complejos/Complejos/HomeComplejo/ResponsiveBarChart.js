import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const ResponsiveBarChart = ({ data }) => (
  <ResponsiveBar
    data={data}
    keys={["cantReservasConfirmadas", "cantReservasCanceladas"]}
    indexBy="nombre"
    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
    padding={0.8}
    colors={{ scheme: "nivo" }}
    borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
    borderWidth={3}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Espacios",
      legendPosition: "middle",
      legendOffset: 60,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Reservas",
      legendPosition: "middle",
      legendOffset: -40,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{ from: "color", modifiers: [["darker", 2]] }}
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
        itemDirection: "right-to-left",
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
    enableGridY={true}
    motionStiffness={90}
    motionDamping={15}
  />
);

export default ResponsiveBarChart;