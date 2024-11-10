import DetailProduct from "@/components/dashboard/products/DetailProduct";
import ReviewProduct from "@/components/dashboard/products/ReviewProduct";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function ProductDetail({ params }: { params: { id: string } }) {
  console.log(params.id);
  return (
    <>
      <Link href={"/products"} className="mt-2">
        <ChevronLeft className="h-9 w-9 shadow shadow-black/25 rounded-full" />
      </Link>

      <div className="mt-4 md:grid grid-cols-2 gap-x-5">
        <DetailProduct />
        <ReviewProduct />
      </div>
    </>
  );
}
