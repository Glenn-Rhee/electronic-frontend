import ErrorUi from "@/components/dashboard/ErrorUi";
import ImageEmpty from "@/components/dashboard/ImageEmpty";
import TableEmpty from "@/components/dashboard/TableEmpty";
import TableOrders from "@/components/dashboard/TableOrders";
import TableShell from "@/components/dashboard/TableShell";
import { Input } from "@/components/ui/input";
import { ResponseDefault } from "@/types";
import { cookies } from "next/headers";

export interface DataOrder {
  id: string;
  userId: string;
  storeId: string;
  productId: string;
  status: "PROCESSING" | "COMPLETED" | "CANCELED";
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export default async function OrdersPage() {
  const xtr = cookies().get("xtr")?.value;

  let errorMsg: string | null = null;
  let dataOrder: DataOrder[] | [] = [];

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/order", {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: xtr || "",
      },
    });

    const data = (await response.json()) as ResponseDefault;
    if (data.status === "failed") {
      throw new Error(data.message);
    }

    dataOrder = data.data;
  } catch (error) {
    if (error instanceof Error) {
      errorMsg = error.message;
    } else {
      errorMsg = "Internal Server Error";
    }
  }

  return errorMsg ? (
    <ErrorUi>{errorMsg}</ErrorUi>
  ) : dataOrder.length > 0 ? (
    <TableShell title="Orders Table">
      <div className="mt-4">
        <Input
          type="search"
          placeholder="Search item here..."
          className="w-[50%] md:w-[40%] xl:w-[30%]"
        />
        <TableOrders />
      </div>
    </TableShell>
  ) : (
    <TableEmpty title="Your table order is empty!">
      <ImageEmpty src="/img/table-order.png" alt="Empty Table Order" />
    </TableEmpty>
  );
}
