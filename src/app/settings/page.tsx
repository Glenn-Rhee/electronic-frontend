import ErrorUi from "@/components/dashboard/ErrorUi";
import Settings from "@/components/dashboard/settings/Settings";
import { ResponseDefault } from "@/types";
import { cookies } from "next/headers";

export type SettingsState = "ABLE" | "DISABLE";

export interface DataSettings {
  id: string;
  userId: string;
  revenue: SettingsState;
  users: SettingsState;
  sales: SettingsState;
  orders: SettingsState;
}

export default async function SettingsPage() {
  const xtr = cookies().get("xtr")?.value;
  let dataSettings: DataSettings | null = null;
  let errorMsg: string | null = null;

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/settings",
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

    dataSettings = dataResponse.data;
  } catch (error) {
    if (error instanceof Error) {
      errorMsg = error.message;
    } else {
      errorMsg = "Internal Server Error";
    }
  }

  return errorMsg ? (
    <ErrorUi>{errorMsg}</ErrorUi>
  ) : (
    <Settings data={dataSettings} />
  );
}
