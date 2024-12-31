"use client";
import { ColumnDef, Row } from "@tanstack/react-table";
import Image from "next/image";
import { Button } from "../ui/button";
import { DataTable } from "./DataTable";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
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
import DialogBody, { DataProduct } from "./DialogBody";
import Link from "next/link";
import { DataProducts } from "@/app/products/page";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useXtr } from "@/lib/store/xtrStore";
import { ResponseDefault } from "@/types";

interface TableProductProps {
  dataProduct: DataProducts[] | [];
}

export default function TableProduct(props: TableProductProps) {
  const { dataProduct } = props;
  const [data, setData] = useState<DataProduct>();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { xtr } = useXtr();

  async function handleEdit(row: Row<Product>) {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/product?id=" + row.original.id,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: xtr || "",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const responseData = (await response.json()) as ResponseDefault;

      if (responseData.status === "failed") {
        throw new Error(responseData.message);
      }

      setData({
        ...responseData.data,
      });
      setOpen(true);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    }
  }

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
      accessorKey: "urlImage",
      header: "Image",
      cell: ({ row }) => {
        return (
          <div className="flex gap-2 items-center">
            <Image
              width={40}
              height={40}
              alt="Avatar"
              src={row.original.urlImage}
              className="rounded-full aspect-square"
            />
          </div>
        );
      },
    },
    {
      accessorKey: "productName",
      header: "Product Name",
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
      cell: ({ row }) => {
        return (
          <>
            <div className="flex gap-3">
              <span
                className="flex items-center cursor-pointer bg-slate-900 text-white h-8 rounded-md px-3 text-xs"
                onClick={() => handleEdit(row)}
              >
                Edit
              </span>

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
                    <AlertDialogCancel
                      onClick={async () => {
                        const response = await fetch(
                          process.env.NEXT_PUBLIC_BASE_URL + "/user",
                          { method: "GET", credentials: "include" }
                        );
                        const dataresponse = await response.json();
                        console.log(dataresponse);
                      }}
                    >
                      Cancel
                    </AlertDialogCancel>
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

  return (
    <>
      <DataTable className="mt-4" columns={columns} data={dataProduct} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent aria-describedby="Dialog edit product">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-center">
              Edit product
            </DialogTitle>
          </DialogHeader>
          <DialogBody data={data} isEdit />
        </DialogContent>
      </Dialog>
    </>
  );
}

interface Product extends DataProducts {
  action?: "edit" | "delete";
}
