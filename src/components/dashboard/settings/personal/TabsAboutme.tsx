import { DataUser } from "@/app/settings/personal/page";
import ProfileInfo from "./ProfileInfo";
import ShellProfile from "./ShellProfile";

interface TabsAboutmeProps {
  dataUser: DataUser;
}

export default function TabsAboutme(props: TabsAboutmeProps) {
  const { dataUser } = props;
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
        <ProfileInfo label="Store Name" value="Digital Point" />
        <ProfileInfo
          label="Store description"
          value="Digital Point Store on Indonesia"
        />
        <ProfileInfo label="Store Category" value="laptop" />
        <ProfileInfo label="Operational Hours" value="08.00 - 18.00" />
      </ShellProfile>
      <ShellProfile title="Bank Account">
        <ProfileInfo label="Bank Name" value="BCA" />
        <ProfileInfo label="Account Number" value="123456789" />
      </ShellProfile>
    </div>
  );
}
