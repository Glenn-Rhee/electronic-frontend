"use client";
import React from "react";
import CardContent from "./CardContent";
import { LucideIcon } from "lucide-react";

interface CardProps {
  label: string;
  icon: LucideIcon;
  amount: string;
  description: string;
}

export default function Card(props: CardProps) {
  const { label, amount, description } = props;
  return (
    <CardContent>
      <section className="flex justify-between gap-2">
        {/* label */}
        <p className="text-sm">{label}</p>

        {/* icon */}
        <props.icon className="h-4 w-4 text-gray-400" />
      </section>
      <section className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">{amount}</h2>
        <p className="text-xs text-gray-500">{description}</p>
      </section>
    </CardContent>
  );
}
