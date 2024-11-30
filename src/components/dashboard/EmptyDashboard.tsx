import Image from "next/image";

export default function EmptyDashboard() {
  return (
    <div className="flex items-center justify-center w-full pt-40 md:pt-20">
      <div className="space-y-4 flex flex-col items-center">
        <Image
          src={"/img/Dashboard.png"}
          alt="Empty Dashboard"
          height={225}
          width={400}
          className="aspect-auto w-auto"
        />
        <h3 className="font-bold text-xl text-center md:text-2xl">
          Your Dashboard is Empty!
        </h3>
      </div>
    </div>
  );
}
