"use client";
import { useRevenue } from "@/lib/store/revenueStore";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart as BarGraph,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
} from "recharts";

export default function BarCart() {
  const { valueOrder } = useRevenue();

  const [data, setData] = useState<[] | { name: string; total: number }[]>([]);

  useEffect(() => {
    const dataByYear = [
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

    const dataByMonth = [
      { name: "W1", total: Math.floor(Math.random() * 10000) + 20000 },
      { name: "W2", total: Math.floor(Math.random() * 10000) + 20000 },
      { name: "W3", total: Math.floor(Math.random() * 10000) + 20000 },
      { name: "W4", total: Math.floor(Math.random() * 10000) + 20000 },
    ];

    const dataByWeek = [
      { name: "D1", total: Math.floor(Math.random() * 20000) + 10000 },
      { name: "D2", total: Math.floor(Math.random() * 20000) + 10000 },
      { name: "D3", total: Math.floor(Math.random() * 20000) + 10000 },
      { name: "D4", total: Math.floor(Math.random() * 20000) + 10000 },
      { name: "D5", total: Math.floor(Math.random() * 20000) + 10000 },
      { name: "D6", total: Math.floor(Math.random() * 20000) + 10000 },
      { name: "D7", total: Math.floor(Math.random() * 20000) + 10000 },
    ];

    const dataByDay = [
      { name: "9AM", total: Math.floor(Math.random() * 20000) + 10000 },
      { name: "10AM", total: Math.floor(Math.random() * 20000) + 10000 },
      { name: "11AM", total: Math.floor(Math.random() * 20000) + 10000 },
      { name: "12PM", total: Math.floor(Math.random() * 20000) + 10000 },
      { name: "1PM", total: Math.floor(Math.random() * 20000) + 10000 },
      { name: "2PM", total: Math.floor(Math.random() * 20000) + 10000 },
      { name: "3PM", total: Math.floor(Math.random() * 20000) + 10000 },
      { name: "4PM", total: Math.floor(Math.random() * 20000) + 10000 },
      { name: "5PM", total: Math.floor(Math.random() * 20000) + 10000 },
      { name: "6PM", total: Math.floor(Math.random() * 20000) + 10000 },
      { name: "7PM", total: Math.floor(Math.random() * 20000) + 10000 },
    ];

    switch (valueOrder) {
      case "today":
        setData(dataByDay);
        break;
      case "lastWeek":
        setData(dataByWeek);
        break;
      case "lastMonth":
        setData(dataByMonth);
        break;
      default:
        setData(dataByYear);
        break;
    }
  }, [valueOrder]);

  return (
    <ResponsiveContainer width={"100%"} height={400}>
      <BarGraph data={data}>
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
