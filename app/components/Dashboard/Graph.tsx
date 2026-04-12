import { useMediaQuery } from 'react-responsive';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { name: "Monday", Gaming: 18, "UI/UX Design": 98 , Pathway: 0},
  { name: "Tuesday", Gaming: 80, "UI/UX Design": 80 , Pathway: 0 },
  { name: "Wednesday", Gaming: 10, "UI/UX Design": 62 , Pathway: 0 },
  { name: "Thursday", Gaming: 23, "UI/UX Design": 58 , Pathway: 0 },
  { name: "Friday", Gaming: 42, "UI/UX Design": 61 , Pathway: 0 },
  { name: "Saturday", Gaming: 42, "UI/UX Design": 60 , Pathway: 0 },
  { name: "Sunday", Gaming: 21, "UI/UX Design": 40 , Pathway: 0 },
];

const getStrokeColor = (age: number): string => {
  if (age >= 1 && age <= 3) return "#BC00DD";
  if (age >= 4 && age <= 6) return "#FFB700";
  if (age >= 7 && age <= 12) return "#6BCAFA";
  if (age >= 13 && age <= 18) return  "#0784C3";
  return "#BC00DD"
};

const SimpleLineChart = ({userAge}: {userAge: number}) => {
  const is2xlScreen = useMediaQuery({ minWidth: 1536 });
  const chartWidth = is2xlScreen ? 1000 : 700;
  const strokeColor = getStrokeColor(userAge)
  return (
    <LineChart
      width={chartWidth}
      height={360}
      data={data}
      margin={{ top: 45, right: 30, left: 15, bottom: 5 }}
      className="w-full object-cover"
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      
      <Line
        type="monotone"
        dataKey="Pathway"
        // stroke="#BC00DD"
        stroke= { strokeColor }
        activeDot={{ r: 8 }}
      />
      {/* <Line type="monotone" dataKey="Gaming" stroke="#BC00DD" /> */}
    </LineChart>
  );
}

export default SimpleLineChart;
