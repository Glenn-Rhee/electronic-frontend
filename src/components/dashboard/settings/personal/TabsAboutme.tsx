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

  return (
    <div className="mt-4">
      <ShellProfile title="Personal Identity">
        <ProfileInfo label="Username" value={dataUser.username} />
        <ProfileInfo label="Fullname" value={dataUser.fullname} />
        <ProfileInfo label="Gender" value={gender} />
        <ProfileInfo label="Date of birth" value={formattedDate} />
      </ShellProfile>
      <ShellProfile title="Store Information">
        <ProfileInfo
          label="Store Name"
          value={
            Object.keys(dataStore).length === 0 ? "-" : dataStore.storeName
          }
        />
        <ProfileInfo
          label="Store description"
          value={
            Object.keys(dataStore).length === 0
              ? "-"
              : dataStore.storeDescription
          }
        />
        <ProfileInfo
          label="Store Category"
          value={
            Object.keys(dataStore).length === 0 ? "-" : dataStore.storeCategory
          }
        />
        <ProfileInfo
          label="Operational Hours"
          value={
            Object.keys(dataStore).length === 0
              ? "-"
              : `${dataStore.openStore} - ${dataStore.closeStore}`
          }
        />
      </ShellProfile>
      <ShellProfile title="Bank Account">
        <ProfileInfo
          label="Bank Name"
          value={Object.keys(dataStore).length === 0 ? "-" : dataStore.bankName}
        />
        <ProfileInfo
          label="Account Number"
          value={
            Object.keys(dataStore).length === 0 ? "-" : dataStore.accountNumber
          }
        />
      </ShellProfile>
    </div>
  );
}
