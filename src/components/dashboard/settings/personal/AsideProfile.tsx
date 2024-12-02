import { DataUser } from "@/app/settings/personal/page";
import ItemContact from "@/components/dashboard/settings/personal/ItemContact";
import { Separator } from "@/components/ui/separator";
import { Instagram, LocateFixed, Mail, Phone } from "lucide-react";
import Image from "next/image";

interface AsideProfileProps {
  dataUser: DataUser;
}

export default function AsideProfile(props: AsideProfileProps) {
  const { dataUser } = props;
  return (
    <>
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
            value={dataUser.phone}
            icon={Phone}
            className="text-blue-500"
          />
          <ItemContact
            label="Email"
            value={dataUser.email}
            icon={Mail}
            className="text-red-400"
          />
          <ItemContact
            label="Address"
            value={dataUser.address === "" ? "-" : dataUser.address}
            className="text-red-600"
            icon={LocateFixed}
          />
          <ItemContact
            label="Instagram"
            value={dataUser.sosmed === "" ? "-" : dataUser.sosmed}
            className="bg-gradient-to-r text-pink-500"
            icon={Instagram}
          />
        </div>
      </div>
    </>
  );
}
