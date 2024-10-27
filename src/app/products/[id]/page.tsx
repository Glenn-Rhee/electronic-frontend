import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductDetail({ params }: { params: { id: string } }) {
  console.log(params.id);
  return (
    <>
      <Link href={"/products"} className="mt-2">
        <ChevronLeft className="h-9 w-9 shadow shadow-black/25 rounded-full" />
      </Link>
      <div className="mt-4 flex gap-y-2">
        <div className="flex items-center justify-center">
          <Image
            src={"/img/lenovo-ideapad.avif"}
            width={500}
            height={500}
            alt="Product Image"
            className="w-aut h-auto"
          />
        </div>
        <div></div>
      </div>
    </>
  );
}
