import ErrorUi from "@/components/dashboard/ErrorUi";
import TableEmpty from "@/components/dashboard/TableEmpty";
import TableShell from "@/components/dashboard/TableShell";
import TableUsers from "@/components/dashboard/TableUsers";
import { Input } from "@/components/ui/input";
import { ResponseDefault } from "@/types";
import { cookies } from "next/headers";

interface DataUserOrder {
  id: string;
  userId: string;
  storeId: string;
  productId: string;
  status: "PROCESSING" | "COMPLETED" | "CANCELED";
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

export default async function UserPage() {
  const xtr = cookies().get("xtr")?.value;
  let dataUserOrder: DataUserOrder[] | [] = [];
  let errorMsg: string | null = null;

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/user/order",
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

    dataUserOrder = dataResponse.data;
  } catch (error) {
    if (error instanceof Error) {
      errorMsg = error.message;
    } else {
      errorMsg = "Internal Server error!";
    }
  }

  return errorMsg ? (
    <ErrorUi>{errorMsg}</ErrorUi>
  ) : dataUserOrder.length > 0 ? (
    <TableShell title="Users Table">
      <div className="mt-4">
        <Input
          type="search"
          placeholder="Search any user here..."
          className="w-[50%] md:w-[40%] xl:w-[30%]"
        />
        <TableUsers />
      </div>
    </TableShell>
  ) : (
    <TableEmpty />
  );
}
