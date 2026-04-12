"use client";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data2 = [
  { name: "Coding fundamental 1", value: 75, color: "#f4a900" },
  { name: "Mobile App Development", value: 25, color: "#007acc" },
];

const RADIAN = Math.PI / 180;

// Custom label function to position text inside slices
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5; // Center the label
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="right"
      dominantBaseline="central"
      fontSize="12"
      fontWeight="bold"
    >
      {`${name} ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export const CourseProgressChart = ({
  data,
}: {
  data?: { name: string; value: number; color: string }[];
}) => {
  return (
    <div style={{ width: "100%", height: 300, overflow: "hidden" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius="80%"
            dataKey="value"
          >
            {data?.map((entry: any, index: any) => (
              <Cell key={`cell-${index}`} fill={entry?.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ fontSize: "12px" }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
