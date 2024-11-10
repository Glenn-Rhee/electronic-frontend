"use client";
import { useRevenue } from "@/lib/store/revenueStore";
import PopoverClient from "./PopooverClient";

const ordersBy = [
  {
    value: "today",
    label: "Today",
  },
  {
    value: "lastWeek",
    label: "Last Week",
  },
  {
    value: "lastMonth",
    label: "Last Month",
  },
  {
    value: "lastYear",
    label: "Last Year",
  },
];

export default function OrderRevenue() {
  const { valueOrder, setValueorder } = useRevenue();

  return (
    <PopoverClient
      value={valueOrder}
      setValue={setValueorder}
      options={ordersBy}
    />
  );
}
