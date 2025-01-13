import DialogBody from "@/components/dashboard/DialogBody";
import ErrorUi from "@/components/dashboard/ErrorUi";
import ImageEmpty from "@/components/dashboard/ImageEmpty";
import TableEmpty from "@/components/dashboard/TableEmpty";
import TableProduct from "@/components/dashboard/TableProduct";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ResponseDefault } from "@/types";
import { Metadata } from "next";
import { cookies } from "next/headers";

export interface DataProducts {
  id: string;
  storeId: string;
  productName: string;
  category: "LAPTOP" | "ACCESSORIES";
  brand: string;
  description: string;
  urlImage: string;
  price: number;
  stock: number;
  discount: number;
  createdAt: Date;
  updatedAt: Date;
}

export const metadata: Metadata = {
  title: "Products Page",
  description: "Show all products page",
};

export default async function ProductPage() {
  const xtr = cookies().get("xtr")?.value;
  let dataProducts: DataProducts[] | [] = [];
  let errorMsg: string | null = null;

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/product",
      {
        method: "GET",
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

    dataProducts = dataResponse.data;
  } catch (error) {
    if (error instanceof Error) {
      errorMsg = error.message;
    } else {
      errorMsg = "Internal server error!";
    }
  }

  return errorMsg ? (
    <ErrorUi>{errorMsg}</ErrorUi>
  ) : dataProducts.length > 0 ? (
    <div className="w-full">
      <h1 className="text-3xl font-bold">Products Table</h1>
      <div className="flex justify-between gap-2 items-center mt-4">
        <Dialog>
          <DialogTrigger>
            <span className="bg-blue-500 text-white px-3 py-2 rounded-md">
              Add Product
            </span>
          </DialogTrigger>
          <DialogContent aria-describedby="Content of product dialog">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-center">
                Add product
              </DialogTitle>
            </DialogHeader>
            <DialogBody />
          </DialogContent>
        </Dialog>
      </div>
      <TableProduct dataProduct={dataProducts} />
    </div>
  ) : (
    <TableEmpty title="Your product is empty" isProduct>
      <ImageEmpty src="/img/table-product.png" alt="Product empty" />
    </TableEmpty>
  );
}
