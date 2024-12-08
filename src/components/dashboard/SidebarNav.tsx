import { DataStore } from "@/app/settings/personal/page";
import { ResponseDefault } from "@/types";
import { cookies } from "next/headers";
import Sidebar from "./Sidebar";
import ErrorUi from "./ErrorUi";

export default async function SidebarNav() {
  const xtr = cookies().get("xtr")?.value;
  if (xtr) {
    let dataStore: DataStore | null = null;
    let errorMsg: string | null = "";

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/store",
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

      dataStore = dataResponse.data;
    } catch (error) {
      if (error instanceof Error) {
        errorMsg = error.message;
      } else {
        errorMsg = "Internal Server erorr!";
      }
    }
    return errorMsg || !dataStore ? (
      <ErrorUi>{errorMsg}</ErrorUi>
    ) : (
      <Sidebar dataStore={dataStore} />
    );
  } else {
    return null;
  }
}
