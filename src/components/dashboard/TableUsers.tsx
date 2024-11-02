"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./DataTable";

interface User {
  id: string;
  username: string;
  email: string;
  totalOrders: number;
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Id User",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "totalOrders",
    header: "Total Orders",
  },
];

export default function TableUsers() {
  const dataUser: User[] = [
    {
      id: "1",
      username: "John Doe",
      email: "rSd0v@example.com",
      totalOrders: 10,
    },
    {
      id: "2",
      username: "John Doe",
      email: "rSd0v@example.com",
      totalOrders: 10,
    },
    {
      id: "3",
      username: "John Doe",
      email: "rSd0v@example.com",
      totalOrders: 10,
    },
    {
      id: "4",
      username: "John Doe",
      email: "rSd0v@example.com",
      totalOrders: 10,
    },
    {
      id: "5",
      username: "John Doe",
      email: "rSd0v@example.com",
      totalOrders: 10,
    },
  ];

  return <DataTable className="mt-4" columns={columns} data={dataUser} />;
}
