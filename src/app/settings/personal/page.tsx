import ErrorUi from "@/components/dashboard/ErrorUi";
import AsideProfile from "@/components/dashboard/settings/personal/AsideProfile";
import MainProfile from "@/components/dashboard/settings/personal/MainProfile";
import ShellPersonal from "@/components/dashboard/settings/personal/ShellPersonal";
import { ResponseDefault } from "@/types";
import { cookies } from "next/headers";

export interface DataUser {
  id: string;
  username: string;
  email: string;
  fullname: string;
  gender: "MALE" | "FEMALE";
  dataOfBirth: Date;
  phone: string;
  address: string;
  sosmed: string;
  city: string;
  zipCode: string;
}

export interface DataStore {
  id: string;
  storeName: string;
  storeDescription: string;
  storeCategory: "LAPTOP" | "ACCESSORIES";
  openStore: string;
  closeStore: string;
  urlImage: string;
  bankId: string;
  bankName: string;
  accountNumber: string;
  city: string;
  zipCode: string;
}

export default async function SettingsPersonalPage() {
  const xtr = cookies().get("xtr")?.value;
  let dataUser: DataUser | null = null;
  let dataStore: DataStore | null = null;
  let errorMsg: string | null = "";
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/user", {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: xtr || "",
      },
    });

    const dataResponse = (await response.json()) as ResponseDefault;
    if (dataResponse.status === "failed") {
      throw new Error(dataResponse.message);
    }

    dataUser = dataResponse.data;

    const responseStore = await fetch(
      process.env.NEXT_PUBLIC_BASE_URL + "/store",
      {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: xtr || "",
        },
      }
    );

    const dataResStore = (await responseStore.json()) as ResponseDefault;

    if (dataResStore.status === "failed") {
      throw new Error(dataResStore.message);
    }

    dataStore = dataResStore.data;
  } catch (error) {
    if (error instanceof Error) {
      errorMsg = error.message;
    } else {
      errorMsg = "Internal Server Error";
    }
  }

  return errorMsg ? (
    <ErrorUi>{errorMsg}</ErrorUi>
  ) : dataUser && dataStore ? (
    <div className="grid grid-cols-1 lg:grid-cols-[30%_1fr] gap-x-6">
      <ShellPersonal>
        <AsideProfile dataUser={dataUser} dataStore={dataStore} />
      </ShellPersonal>
      <ShellPersonal>
        <MainProfile dataUser={dataUser} dataStore={dataStore} />
      </ShellPersonal>
    </div>
  ) : null;
}
