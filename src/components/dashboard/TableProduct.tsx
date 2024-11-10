"use client";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Button } from "../ui/button";
import { DataTable } from "./DataTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DialogBody from "./DialogBody";
import Link from "next/link";

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
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <Link href={`/products/${row.original.id}`}>{row.original.id}</Link>
    ),
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
    cell: ({}) => {
      return (
        <>
          <div className="flex gap-3">
            <Dialog>
              <DialogTrigger>
                <span className="flex items-center bg-slate-900 text-white h-8 rounded-md px-3 text-xs">
                  Edit
                </span>
              </DialogTrigger>
              <DialogContent aria-describedby="Dialog edit product">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold text-center">
                    Edit product
                  </DialogTitle>
                </DialogHeader>
                <DialogBody
                  data={{
                    brand: "ACER",
                    category: "laptop",
                    id: "1",
                    productName: "Laptop ACER",
                    description: "Laptop ACER",
                    price: 20000000,
                    stock: 15,
                    tag: "laptop",
                  }}
                />
              </DialogContent>
            </Dialog>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant={"destructive"} size={"sm"}>
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </>
      );
    },
  },
];
