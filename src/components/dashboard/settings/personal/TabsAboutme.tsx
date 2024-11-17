import ProfileInfo from "./ProfileInfo";
import ShellProfile from "./ShellProfile";

export default function TabsAboutme() {
  return (
    <div className="mt-4">
      <ShellProfile title="Personal Identity">
        <ProfileInfo label="Username" value="Arielrizki" />
        <ProfileInfo label="Fullname" value="Ariel Rizki" />
        <ProfileInfo label="Gender" value="Male" />
        <ProfileInfo label="Date of birth" value="01/01/2001" />
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
