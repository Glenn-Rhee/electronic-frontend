import Dashboard from "@/components/dashboard/Dashboard";
import EmptyDashboard from "@/components/dashboard/EmptyDashboard";
import ErrorUi from "@/components/dashboard/ErrorUi";
import { ResponseDefault } from "@/types";
import { cookies } from "next/headers";

export interface DataTransaction {
  id: string;
  userId: string;
  storeId: string;
  orderId: string;
  status: "PROCESSING" | "COMPLETED" | "CANCELED";
  createdAt: Date;
  updatedAt: Date;
}

export default async function HomePage() {
  const xtr = cookies().get("xtr")?.value;
  let dataTransactions: DataTransaction[] | [] = [];
  let errorMsg: string | null = null;
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/transaction",
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

    dataTransactions = dataResponse.data;
  } catch (error) {
    if (error instanceof Error) {
      errorMsg = error.message;
    } else {
      errorMsg = "Internal Server Error";
    }
  }

  return (
    <>
      {errorMsg ? (
        <ErrorUi>Error!</ErrorUi>
      ) : dataTransactions.length > 0 ? (
        <Dashboard dataTransaction={dataTransactions} />
      ) : (
        <EmptyDashboard />
      )}
    </>
  );
}
