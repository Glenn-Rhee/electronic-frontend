"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Button } from "../ui/button";
import { DataTable } from "./DataTable";

export default function TableProduct() {
  const dataProduct: Product[] = [
    {
      id: "ORD271829",
      name: "Laptop Acer",
      category: "laptop",
      brand: "ACER",
      price: 20000000,
      stock: 10,
      picture: "/img/prof.jpg",
    },
    {
      id: "ORD271829",
      name: "Laptop Acer",
      category: "laptop",
      brand: "ACER",
      price: 20000000,
      stock: 10,
      picture: "/img/prof.jpg",
    },
    {
      id: "ORD271829",
      name: "Laptop Acer",
      category: "laptop",
      brand: "ACER",
      price: 20000000,
      stock: 10,
      picture: "/img/prof.jpg",
    },
    {
      id: "ORD271829",
      name: "Laptop Acer",
      category: "laptop",
      brand: "ACER",
      price: 20000000,
      stock: 10,
      picture: "/img/prof.jpg",
    },
    {
      id: "ORD271829",
      name: "Laptop Acer",
      category: "laptop",
      brand: "ACER",
      price: 20000000,
      stock: 10,
      picture: "/img/prof.jpg",
    },
    {
      id: "ORD271829",
      name: "Laptop Acer",
      category: "laptop",
      brand: "ACER",
      price: 20000000,
      stock: 10,
      picture: "/img/prof.jpg",
    },
  ];

  return <DataTable className="mt-4" columns={columns} data={dataProduct} />;
}

type Product = {
  id: string;
  name: string;
  category: "laptop" | "accessory";
  brand: string;
  price: number;
  stock: number;
  picture: string;
  action?: "edit" | "delete";
};

const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "picture",
    header: "Picture",
    cell: () => {
      return (
        <div className="flex gap-2 items-center">
          <Image
            width={40}
            height={40}
            alt="Avatar"
            src="/img/prof.jpg"
            className="rounded-full"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <span>Rp {row.original.price.toLocaleString("id-ID")}</span>
    ),
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: () => {
      return (
        <div className="flex gap-3">
          <Button variant={"default"} size={"sm"}>
            Edit
          </Button>
          <Button variant={"destructive"} size={"sm"}>
            Delete
          </Button>
        </div>
      );
    },
  },
];
