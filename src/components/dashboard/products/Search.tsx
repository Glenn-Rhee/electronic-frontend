"use client";
import { DataProducts } from "@/app/products/page";
import { Input } from "@/components/ui/input";
import { useXtr } from "@/lib/store/xtrStore";
import { ResponseDefault } from "@/types";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

interface SearchProps {
  setDataSorted: Dispatch<SetStateAction<[] | DataProducts[]>>;
}

export default function Search(props: SearchProps) {
  const { setDataSorted } = props;
  const { xtr } = useXtr();
  const [value, setValue] = useState<string>("");

  async function handleSearch() {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/product/filter?search=${value}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: xtr || "",
          },
        }
      );

      const data = (await response.json()) as ResponseDefault;

      if (data.status === "failed") throw new Error(data.message);
      setDataSorted(data.data)
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error!", {
          description: error.message,
          richColors: true,
        });
      } else {
        toast.error("Error!", {
          description: "An unknown occured!",
          richColors: true,
        });
      }
    }
  }

  return (
    <Input
      type="search"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Search item here..."
      className="w-[50%] md:w-[40%] xl:w-[30%] mt-6"
      onKeyUp={handleSearch}
    />
  );
}
