import {
  ResponsiveContainer,
  BarChart as BarGraph,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
} from "recharts";

export default function BarCart() {
  const chartData = [
    { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Mei", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Jul", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Aug", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Sep", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Oct", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Nov", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Dec", total: Math.floor(Math.random() * 5000) + 1000 },
  ];

  return (
    <ResponsiveContainer width={"100%"} height={400}>
      <BarGraph data={chartData}>
        <XAxis
          dataKey={"name"}
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={"12"}
        />
        <YAxis
          dataKey={"total"}
          tickLine={false}
          axisLine={false}
          stroke="#888888"
          fontSize={"12"}
          domain={[0, "dataMax + 2000"]}
          tickFormatter={(val) => `${val.toLocaleString()}`}
        />
        <Tooltip />
        <Bar dataKey={"total"} radius={[6, 6, 0, 0]} />
      </BarGraph>
    </ResponsiveContainer>
  );
}
