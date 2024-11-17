import AsideProfile from "@/components/dashboard/settings/personal/AsideProfile";
import MainProfile from "@/components/dashboard/settings/personal/MainProfile";
import ShellPersonal from "@/components/dashboard/settings/personal/ShellPersonal";

export default function SettingsPersonalPage() {
  return (
    <div className="grid grid-cols-[30%_1fr] gap-x-6">
      <ShellPersonal>
        <AsideProfile />
      </ShellPersonal>
      <ShellPersonal>
        <MainProfile />
      </ShellPersonal>
    </div>
  );
}
