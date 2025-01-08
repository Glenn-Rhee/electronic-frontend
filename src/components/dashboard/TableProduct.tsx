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
import { useXtr } from "@/lib/store/xtrStore";
import { ResponseDefault } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Sorting from "@/lib/Sorting";
import { useSorting } from "@/lib/store/sortingStore";

interface TableProductProps {
  dataProduct: DataProducts[] | [];
}

export default function TableProduct(props: TableProductProps) {
  const { dataProduct } = props;
  const [data, setData] = useState<DataProduct>();
  const {
    productName,
    setProductName,
    category,
    setCategory,
    brand,
    setBrand,
    price,
    setPrice,
    setStock,
    stock,
  } = useSorting();
  const [open, setOpen] = useState(false);
  const [dataSorted, setDataSorted] = useState<DataProducts[] | []>(
    dataProduct
  );
  const { xtr } = useXtr();
  const router = useRouter();

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
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error", {
          richColors: true,
          duration: 1000,
          description: error.message,
        });
      } else {
        toast.error("Error", {
          richColors: true,
          duration: 1000,
          description: "Something went wrong",
        });
      }
    }
  }

  async function handleDelete(id: string) {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/product?id=" + id,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            Authorization: xtr || "",
          },
        }
      );

      const dataResponse = (await response.json()) as ResponseDefault;
      if (dataResponse.status === "failed") {
        throw new Error(dataResponse.message);
      }

      toast.success("Success!", {
        richColors: true,
        duration: 1000,
        description: dataResponse.message,
      });

      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error", {
          richColors: true,
          duration: 1000,
          description: error.message,
        });
      } else {
        toast.error("Error", {
          richColors: true,
          duration: 1000,
          description: "An error occurred",
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
      header: () => (
        <button
          onClick={async () => {
            const response = await Sorting.sorted(
              xtr,
              productName,
              "productName"
            );
            setProductName(!productName);
            setDataSorted(response || []);
          }}
        >
          Product name
        </button>
      ),
    },
    {
      accessorKey: "category",
      header: () => (
        <button
          onClick={async () => {
            setDataSorted(
              (await Sorting.sorted(xtr, category, "category")) || []
            );
            setCategory(!category);
          }}
        >
          Category
        </button>
      ),
    },
    {
      accessorKey: "brand",
      header: () => (
        <button
          onClick={async () => {
            setDataSorted((await Sorting.sorted(xtr, brand, "brand")) || []);
            setBrand(!brand);
          }}
        >
          Brand
        </button>
      ),
    },
    {
      accessorKey: "price",
      header: () => (
        <button
          onClick={async () => {
            setDataSorted((await Sorting.sorted(xtr, price, "price")) || []);
            setPrice(!price);
          }}
        >
          Price
        </button>
      ),
      cell: ({ row }) => (
        <span>Rp {row.original.price.toLocaleString("id-ID")}</span>
      ),
    },
    {
      accessorKey: "stock",
      header: () => (
        <button
          onClick={async () => {
            setDataSorted((await Sorting.sorted(xtr, stock, "stock")) || []);
            setStock(!stock);
          }}
        >
          Stock
        </button>
      ),
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
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(row.original.id)}
                    >
                      Yes
                    </AlertDialogAction>
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
      <DataTable className="mt-4" columns={columns} data={dataSorted} />
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
