"use client";
import { usePrimaryColor } from "@/app/stores/PrimaryColorProvider";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
const data = [
  { name: "Group C", value: 17, title: "Excellent" },
  { name: "Group B", value: 55, title: "Satisfactory" },
  { name: "Group A", value: 28, title: "Need attention" },
];

export const SchoolPerfomance = () => {
  const { getShade } = usePrimaryColor();
  const COLORS = ["#BC00DD", getShade(500), "#FFB700"];
  return (
    <div className="rounded-xl font-bold text-lg sm:text-xl border">
      <h3 className="border-b p-5">Class Perfomance</h3>
      <div className="px-6 grid grid-cols-1 min-[476px]:grid-cols-[1fr_auto] items-center">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart width={500} height={300}>
            <Pie
              data={data}
              cx={"50%"}
              cy={"50%"}
              innerRadius={"50%"}
              outerRadius={"80%"}
              fill="#8884d8"
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/*  */}
        <div className="flex flex-col gap-2">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
              {/* Text content */}
              <div>
                <h2 className="text-sm text-gray-500">{entry.title}</h2>
                <p className="text-lg font-bold">
                  {(
                    (entry.value /
                      data.reduce((sum, item) => sum + item.value, 0)) *
                    100
                  ).toFixed(1)}
                  %
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
