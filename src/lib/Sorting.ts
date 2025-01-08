import { DataProducts } from "@/app/products/page";
import { ResponseDefault } from "@/types";

export default class Sorting {
  static async sorted(
    xtr: string | undefined,
    isAscending?: boolean,
    sortBy?: "productName" | "category" | "brand" | "price" | "stock"
  ): Promise<DataProducts[] | [] | undefined> {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL +
          `/product?orderBy=${sortBy}&asc=${isAscending}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: xtr || "",
          },
        }
      );

      const dataResponse = (await response.json()) as ResponseDefault;

      if (dataResponse.status === "failed") {
        throw new Error(dataResponse.message);
      }

      return dataResponse.data as DataProducts[];
    } catch (error) {
      if (error instanceof Error) {
        return [];
      }
    }
  }
}
