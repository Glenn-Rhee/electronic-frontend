import ShellProfile from "./ShellProfile";
import ProfileInfo from "./ProfileInfo";
import { Button } from "@/components/ui/button";
import { DataStore } from "@/app/settings/personal/page";

interface TabsSetProfileProps {
  dataStore: DataStore;
}

export default function TabsSetProfile(props: TabsSetProfileProps) {
  const { dataStore } = props;
  return (
    <div className="mt-4">
      <ShellProfile title="Contact">
        <ProfileInfo label="Phone" value="08123456789" isSet />
        <ProfileInfo label="Email" value="glennviktor5@gmail.com" isSet />
        <ProfileInfo label="Address" value="Depok" isSet />
        <ProfileInfo label="Instagram" value="@glennviktor5" isSet />
      </ShellProfile>
      <ShellProfile title="Personal Identity">
        <ProfileInfo label="Username" value="Arielrizki" isSet />
        <ProfileInfo label="Fullname" value="Ariel Rizki" isSet />
      </ShellProfile>
      <ShellProfile title="Store Information">
        <ProfileInfo label="Store Name" value="Digital Point" isSet />
        <ProfileInfo
          label="Store description"
          value="Digital Point Store on Indonesia"
          isSet
        />
        <ProfileInfo label="Store Category" value="laptop" isSet />
        <ProfileInfo label="Operational Hours" value="08.00 - 18.00" isSet />
      </ShellProfile>
      <ShellProfile title="Bank Account">
        <ProfileInfo label="Bank Name" value="BCA" isSet />
        <ProfileInfo label="Account Number" value="123456789" isSet />
      </ShellProfile>
      <div className="flex items-center px-2 justify-center">
        <Button className="w-full">Save</Button>
      </div>
    </div>
  );
}
