"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./DataTable";

import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import Link from "next/link";

interface Order {
  id: string;
  username: string;
  status: "processing" | "completed" | "cancelled";
  date: string;
}

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return <Link href={"/orders/" + row.original.id}>{row.original.id}</Link>;
    },
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status =
        row.original.status[0].toUpperCase() + row.original.status.slice(1);

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-fit h-fit focus:outline-none">
              <Badge
                className={cn("cursor-pointer", {
                  "bg-amber-500 hover:bg-amber-600":
                    row.original.status === "processing",
                  "bg-red-500 hover:bg-red-600":
                    row.original.status === "cancelled",
                  "bg-green-500 hover:bg-green-600":
                    row.original.status === "completed",
                })}
              >
                {status}
              </Badge>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-slate-900 text-white">
            <DropdownMenuItem>Processing</DropdownMenuItem>
            <DropdownMenuItem>Completed</DropdownMenuItem>
            <DropdownMenuItem>Cancelled</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
  },
];

export default function TableOrders() {
  const dataOrders: Order[] = [
    {
      id: "ORD271829",
      username: "John Doe",
      status: "processing",
      date: "1 Oct 2024",
    },
    {
      id: "ORD271829",
      username: "John Doe",
      status: "processing",
      date: "1 Oct 2024",
    },
    {
      id: "ORD271829",
      username: "John Doe",
      status: "cancelled",
      date: "1 Oct 2024",
    },
    {
      id: "ORD271829",
      username: "John Doe",
      status: "completed",
      date: "1 Oct 2024",
    },
  ];

  return <DataTable className="mt-4" columns={columns} data={dataOrders} />;
}
