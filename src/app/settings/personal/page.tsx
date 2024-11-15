import ItemContact from "@/components/dashboard/settings/personal/ItemContact";
import ShellPersonal from "@/components/dashboard/settings/personal/ShellPersonal";
import { Separator } from "@/components/ui/separator";
import { LocateFixed, Mail, Phone } from "lucide-react";
import Image from "next/image";

export default function SettingsPersonalPage() {
  return (
    <div className="grid grid-cols-[30%_1fr] gap-x-6">
      <ShellPersonal>
        <div className="flex flex-col gap-y-1 items-center">
          <Image
            src="/img/prof.jpg"
            width={120}
            height={120}
            alt="Profile store"
            className="rounded-full w-auto"
          />
          <h4 className="text-2xl font-bold mt-2">Digital Point</h4>
          <span className="text-sm text-gray-700">ST241178</span>
        </div>
        <Separator className="my-3 h-[1px] bg-gray-400" />
        <div className="mt-4">
          <h5 className="text-lg font-semibold">Contact</h5>
          <div className="flex flex-col gap-y-4 mt-4">
            <ItemContact
              label="Phone"
              value="08123456789"
              icon={Phone}
              className="text-blue-500"
            />
            <ItemContact
              label="Email"
              value="glennviktor5@gmail.com"
              icon={Mail}
              className="text-red-400"
            />
            <ItemContact
              label="Address"
              value="Depok"
              className="text-red-600"
              icon={LocateFixed}
            />
          </div>
        </div>
      </ShellPersonal>
      <div></div>
    </div>
  );
}
