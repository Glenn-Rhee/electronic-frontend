"use client";
import ShellProfile from "./ShellProfile";
import ProfileInfo from "./ProfileInfo";
import { Button } from "@/components/ui/button";
import { DataStore, DataUser } from "@/app/settings/personal/page";
import { useState } from "react";

interface TabsSetProfileProps {
  dataStore: DataStore;
  dataUser: DataUser;
}

export interface DataUserState {
  phone: string;
  email: string;
  address: string;
  sosmed: string;
  username: string;
  fullname: string;
  storeName: string;
  storeDescription: string;
  storeCategory: string;
  openStore: string;
  closeStore: string;
  bankName: string;
  accountNumber: string;
}

export default function TabsSetProfile(props: TabsSetProfileProps) {
  const { dataStore, dataUser } = props;
  const [dataUserState, setDataUserState] = useState({
    phone: dataUser.phone,
    email: dataUser.email,
    address: dataUser.address,
    sosmed: dataUser.sosmed,
    username: dataUser.username,
    fullname: dataUser.fullname,
    storeName: Object.keys(dataStore).length > 0 ? dataStore.storeName : "",
    storeDescription:
      Object.keys(dataStore).length > 0 ? dataStore.storeDescription : "",
    storeCategory:
      Object.keys(dataStore).length > 0 ? dataStore.storeCategory : "",
    openStore: Object.keys(dataStore).length > 0 ? dataStore.openStore : "",
    closeStore: Object.keys(dataStore).length > 0 ? dataStore.closeStore : "",
    bankName: Object.keys(dataStore).length > 0 ? dataStore.bankName : "",
    accountNumber:
      Object.keys(dataStore).length > 0 ? dataStore.accountNumber : "",
  });

  return (
    <div className="mt-4">
      <ShellProfile title="Contact">
        <ProfileInfo
          label="Phone"
          value={dataUserState}
          setValue={setDataUserState}
          isSet
        />
        <ProfileInfo
          label="Email"
          value={dataUserState}
          setValue={setDataUserState}
          isSet
        />
        <ProfileInfo
          label="Address"
          value={dataUserState}
          setValue={setDataUserState}
          isSet
        />
        <ProfileInfo
          label="Sosmed"
          value={dataUserState}
          setValue={setDataUserState}
          isSet
        />
      </ShellProfile>
      <ShellProfile title="Personal Identity">
        <ProfileInfo
          label="Username"
          value={dataUserState}
          isSet
          setValue={setDataUserState}
        />
        <ProfileInfo
          label="Fullname"
          value={dataUserState}
          isSet
          setValue={setDataUserState}
        />
      </ShellProfile>
      <ShellProfile title="Store Information">
        <ProfileInfo
          setValue={setDataUserState}
          label="Store Name"
          value={dataUserState}
          isSet
        />
        <ProfileInfo
          label="Store description"
          value={dataUserState}
          isSet
          setValue={setDataUserState}
        />
        <ProfileInfo
          setValue={setDataUserState}
          label="Store Category"
          value={dataUserState}
          isSet
        />
        <ProfileInfo
          setValue={setDataUserState}
          label="Operational Hours"
          value={dataUserState}
          isSet
        />
      </ShellProfile>
      <ShellProfile title="Bank Account">
        <ProfileInfo
          setValue={setDataUserState}
          label="Bank Name"
          value={dataUserState}
          isSet
        />
        <ProfileInfo
          setValue={setDataUserState}
          label="Account Number"
          value={dataUserState}
          isSet
        />
      </ShellProfile>
      <div className="flex items-center px-2 justify-center">
        <Button className="w-full">Save</Button>
      </div>
    </div>
  );
}
