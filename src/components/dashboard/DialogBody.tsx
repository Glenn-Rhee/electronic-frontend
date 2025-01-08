"use client";
import { KeyboardEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import UploadImage from "./products/UploadImage";
import { addProductSchema } from "@/lib/schema";
import { ZodError } from "zod";
import { useXtr } from "@/lib/store/xtrStore";
import { ResponseDefault } from "@/types";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function TitleDialog(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <span className="font-medium text-sm mt-3 text-gray-400">{children}</span>
  );
}

export interface DataProduct {
  productName?: string;
  category?: "laptop" | "accessories" | "";
  brand?: string;
  description?: string;
  id?: string;
  price?: string;
  discount?: string;
  stock?: string;
  tag?: Tag;
  urlImage?: string;
}

interface Tag {
  id: string | undefined;
  tagName: string;
}

interface DialogBodyProps {
  data?: DataProduct;
  isEdit?: boolean;
}

export default function DialogBody(props: DialogBodyProps) {
  const { data, isEdit } = props;
  const { xtr } = useXtr();
  const router = useRouter();
  const [product, setProduct] = useState<DataProduct>({
    brand: data?.brand || "",
    category: (data && data.category
      ? data.category.toLowerCase()
      : "") as DataProduct["category"],
    description: data?.description || "",
    id: data?.id || "",
    productName: data?.productName || "",
    price: data?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") || "0",
    discount: data?.discount?.toString() || "0",
    stock: data?.stock?.toString() || "0",
    tag: {
      id: data?.tag?.id || "",
      tagName: data?.tag?.tagName || "",
    },
    urlImage: data?.urlImage || "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const regex = /[^0-9.]/g;
    if (product.price) {
      if (regex.test(product.price)) {
        setProduct((prev) => ({
          ...prev,
          price: product.price?.replace(regex, ""),
        }));
      }
    }

    if (product.price?.startsWith("0")) {
      setProduct((prev) => ({
        ...prev,
        price: product.price?.replace(/^0+/, ""),
      }));
    }
  }, [product.price]);

  useEffect(() => {
    const regex = /[^0-9.]/g;
    if (product.stock) {
      if (regex.test(product.stock)) {
        setProduct((prev) => ({
          ...prev,
          stock: product.stock?.replace(regex, ""),
        }));
      }

      if (product.stock?.startsWith("0")) {
        setProduct((prev) => ({
          ...prev,
          stock: product.stock?.replace(/^0+/, ""),
        }));
      }
    }
  }, [product.stock]);

  useEffect(() => {
    const regex = /[^0-9.]/g;
    if (product.discount) {
      if (regex.test(product.discount)) {
        setProduct((prev) => ({
          ...prev,
          discount: product.discount?.replace(regex, ""),
        }));
      }

      if (+product.discount > 100) {
        toast("Error add discount", {
          description: "Discount must be less than 100%",
        });
      }
    }
  }, [product.discount]);

  function handleKeyUp(e: KeyboardEvent<HTMLInputElement>) {
    const filteredValue = e.currentTarget.value.replace(/[^0-9]/g, "");
    const formatted = filteredValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formatted;
  }

  async function handleSubmit() {
    setLoading(true);
    try {
      const price = +product.price!.replace(/\./g, "");
      const stock = +product.stock!.replace(/\./g, "");
      const tag = product.tag!.tagName!.replace(/,(?=\s*$)/, "");
      const data = {
        productName: product.productName,
        category: product.category!.toUpperCase(),
        brand: product.brand,
        description: product.description,
        urlImage: product.urlImage,
        price,
        stock,
        discount: +product.discount!,
        tag,
      };
      addProductSchema.parse(data);
      const query = isEdit ? `?id=${product.id}&idTag=${product.tag?.id}` : "";

      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/product" + query,
        {
          method: isEdit ? "PUT" : "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: xtr || "",
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const dataResponse = (await response.json()) as ResponseDefault;
      if (dataResponse.status === "failed") {
        throw new Error(dataResponse.message);
      }

      toast.success("Success!", {
        richColors: true,
        duration: 1000,
        description: `Product ${isEdit ? "edited" : "added"} successfully`,
      });

      setLoading(false);
      router.refresh();
      setProduct({
        brand: "",
        category: "",
        description: "",
        id: "",
        productName: "",
        price: "0",
        discount: "0",
        stock: "0",
        tag: {
          id: "",
          tagName: "",
        },
        urlImage: "",
      });
    } catch (error) {
      if (error instanceof ZodError) {
        toast.error("Error", {
          richColors: true,
          duration: 1000,
          description: error.errors[0].message,
        });
      } else if (error instanceof Error) {
        toast.error("Error", {
          richColors: true,
          duration: 1000,
          description: error.message,
        });
      } else {
        toast.error("Error", {
          richColors: true,
          duration: 1000,
          description: "An error occurred",
        });
      }
      setLoading(false);
    }
  }

  console.log(product);

  return (
    <div className="flex px-1 flex-col overflow-auto">
      <div className="flex flex-col gap-2">
        <TitleDialog>Product Information</TitleDialog>
        <Separator className="my-1 bg-slate-400" />
        <div className="mt-1 grid grid-cols-2 gap-x-2">
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="productName">Product name</Label>
            <Input
              id="productName"
              type="text"
              placeholder="Product Name"
              value={product.productName}
              onChange={(e) =>
                setProduct({ ...product, productName: e.target.value })
              }
            />
            <Label htmlFor="category" className="mt-3">
              Category
            </Label>
            <Select
              defaultValue={"category"}
              value={product.category === "" ? "category" : product.category}
              onValueChange={(e) =>
                setProduct({
                  ...product,
                  category: e as DataProduct["category"],
                })
              }
            >
              <SelectTrigger className="" id="category">
                <SelectValue
                  placeholder="Category"
                  className="text-gray-500 placeholder:text-gray-500"
                />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem
                  value="category"
                  className="text-gray-400 hover:text-gray-400"
                >
                  Category
                </SelectItem>
                <SelectItem value="laptop">Laptop</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
              </SelectContent>
            </Select>
            <Label htmlFor="brand" className="mt-3">
              Brand
            </Label>

            <Input
              id="brand"
              type="text"
              placeholder="Brand"
              className="placeholder:text-gray-600"
              value={product.brand}
              onChange={(e) =>
                setProduct({ ...product, brand: e.target.value })
              }
            />
          </div>
          <div className=" gap-y-2">
            <Label htmlFor="description" className="">
              Description
            </Label>

            <Textarea
              id="description"
              className="shadow shadow-black/15 h-3/4"
              placeholder="Description"
              value={product.description}
              onChange={(e) =>
                setProduct({ ...product, description: e.target.value })
              }
            />
          </div>
        </div>
        <UploadImage
          setLoading={setLoading}
          imageUrl={product.urlImage!}
          setImageUrl={setProduct}
        />
      </div>
      <div className="flex flex-col gap-y-1 mt-6">
        <TitleDialog>Product Price</TitleDialog>
        <Separator className="my-1 bg-slate-400" />
        <div className="grid grid-cols-2 gap-2">
          <Label htmlFor="price" className="mt-3">
            Price (Rp)
          </Label>

          <Input
            id="price"
            type="text"
            placeholder="Price"
            value={product.price ? product.price : ""}
            onKeyUp={(e) => {
              const formatted = handleKeyUp(e);
              setProduct({ ...product, price: formatted });
            }}
            onChange={(e) => {
              setProduct({ ...product, price: e.target.value });
            }}
            className="placeholder:text-gray-600"
          />
          <Label htmlFor="stock" className="mt-3">
            Stock
          </Label>

          <Input
            id="stock"
            type="text"
            placeholder="Stock"
            className="placeholder:text-gray-600"
            value={product.stock}
            onKeyUp={(e) => {
              setProduct({ ...product, stock: handleKeyUp(e) });
            }}
            onChange={(e) => setProduct({ ...product, stock: e.target.value })}
          />
          <Label htmlFor="discount" className="mt-3">
            Discount (%)
          </Label>

          <Input
            id="discount"
            type="text"
            placeholder="Discount"
            className="placeholder:text-gray-600"
            value={product.discount}
            onChange={(e) => {
              const val = e.target.value;
              const regex = /^[1-9]\d*$/;

              if (val === "" || regex.test(val) || val === "0") {
                setProduct({ ...product, discount: val });
              }
            }}
            maxLength={3}
          />

          <Label htmlFor="tag" className="mt-3">
            Tag
          </Label>
          <div className="flex flex-col gap-y-2">
            <Input
              id="tag"
              type="text"
              placeholder="Tag"
              className="placeholder:text-gray-600"
              value={product.tag?.tagName}
              onChange={(e) => {
                setProduct((prev) => ({
                  ...prev,
                  tag: { id: prev.tag?.id, tagName: e.target.value },
                }));
              }}
            />
          </div>
        </div>
      </div>
      <Button
        className="mt-6"
        disabled={loading}
        type="submit"
        onClick={handleSubmit}
      >
        {loading ? <Loader2 className="animate-spin text-white" /> : "Submit"}
      </Button>
    </div>
  );
}
