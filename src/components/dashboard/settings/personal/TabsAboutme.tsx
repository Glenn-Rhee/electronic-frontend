import { DataStore, DataUser } from "@/app/settings/personal/page";
import ProfileInfo from "./ProfileInfo";
import ShellProfile from "./ShellProfile";

interface TabsAboutmeProps {
  dataUser: DataUser;
  dataStore: DataStore;
}

export default function TabsAboutme(props: TabsAboutmeProps) {
  const { dataUser, dataStore } = props;
  const date = new Date(dataUser.dataOfBirth);
  const formattedDate = date.toISOString().slice(0, 10);
  const gender =
    dataUser.gender.charAt(0).toUpperCase() +
    dataUser.gender.slice(1).toLowerCase();
  console.log(dataStore.urlImage);

  return (
    <div className="mt-4">
      <ShellProfile title="Personal Identity">
        <ProfileInfo label="Username">{dataUser.username}</ProfileInfo>
        <ProfileInfo label="Fullname">{dataUser.fullname}</ProfileInfo>
        <ProfileInfo label="Gender">{gender}</ProfileInfo>
        <ProfileInfo label="Date of birth">{formattedDate}</ProfileInfo>
      </ShellProfile>
      <ShellProfile title="Store Information">
        <ProfileInfo label="Store Name">
          {Object.keys(dataStore).length === 0 ? "-" : dataStore.storeName}
        </ProfileInfo>
        <ProfileInfo label="Store description">
          {Object.keys(dataStore).length === 0
            ? "-"
            : dataStore.storeDescription}
        </ProfileInfo>
        <ProfileInfo label="Store Category">
          {Object.keys(dataStore).length === 0 ? "-" : dataStore.storeCategory}
        </ProfileInfo>
        <ProfileInfo label="Operational Hours">
          {Object.keys(dataStore).length === 0
            ? "-"
            : `${dataStore.openStore} - ${dataStore.closeStore}`}
        </ProfileInfo>
      </ShellProfile>
      <ShellProfile title="Bank Account">
        <ProfileInfo label="Bank Name">
          {Object.keys(dataStore).length === 0 ? "-" : dataStore.bankName}
        </ProfileInfo>
        <ProfileInfo label="Account Number">
          {Object.keys(dataStore).length === 0 ? "-" : dataStore.accountNumber}
        </ProfileInfo>
      </ShellProfile>
    </div>
  );
}
