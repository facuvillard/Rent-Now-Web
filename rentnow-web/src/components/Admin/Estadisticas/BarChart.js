import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const BarComponent = (props) => {
  return (
    <g transform={`translate(${props.x},${props.y})`}>
      <rect
        x={-3}
        y={7}
        width={props.width}
        height={props.height}
        fill="rgba(0, 0, 0, .07)"
      />
      <rect width={props.width} height={props.height} fill={props.color} />
      <rect
        x={props.width - 5}
        width={5}
        height={props.height}
        fill={props.borderColor}
        fillOpacity={0.2}
      />
      <text
        x={props.width - 16}
        y={props.height / 2 - 8}
        textAnchor="end"
        dominantBaseline="central"
        fill="black"
        style={{
          fontWeight: 900,
          fontSize: 15,
        }}
      >
        {props.data.indexValue}
      </text>
      <text
        x={props.width - 16}
        y={props.height / 2 + 10}
        textAnchor="end"
        dominantBaseline="central"
        fill={props.borderColor}
        style={{
          fontWeight: 400,
          fontSize: 13,
        }}
      >
        {props.data.value}
      </text>
    </g>
  );
};

export default function BarChart({ data }) {
  return (
    <ResponsiveBar
      layout="horizontal"
      margin={{ top: 26, right: 120, bottom: 26, left: 60 }}
      data={data}
      indexBy="id"
      keys={["value"]}
      colors={{ scheme: "spectral" }}
      colorBy="indexValue"
      borderColor={{ from: "color", modifiers: [["darker", 2.6]] }}
      enableGridX
      enableGridY={false}
      axisTop={{
        format: "~s",
      }}
      axisBottom={{
        format: "~s",
      }}
      axisLeft={null}
      padding={0.3}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.4]] }}
      isInteractive={false}
      barComponent={BarComponent}
      motionStiffness={170}
      motionDamping={26}
    />
  );
}
