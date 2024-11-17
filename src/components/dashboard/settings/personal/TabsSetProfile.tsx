import ShellProfile from "./ShellProfile";
import ProfileInfo from "./ProfileInfo";

export default function TabsSetProfile() {
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
        <ProfileInfo label="Store description" value="Digital Point Store on Indonesia" isSet />
        
      </ShellProfile>
    </div>
  );
}
