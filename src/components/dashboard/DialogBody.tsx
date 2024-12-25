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
import { useToast } from "@/hooks/use-toast";
import { addProductSchema } from "@/lib/schema";
import { ZodError } from "zod";

function TitleDialog(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <span className="font-medium text-sm mt-3 text-gray-400">{children}</span>
  );
}

interface DataProduct {
  productName?: string;
  category?: "laptop" | "accessory" | "";
  brand?: string;
  description?: string;
  id?: string;
  price?: string;
  discount?: string;
  stock?: string;
  tag?: string;
}

interface DialogBodyProps {
  data?: DataProduct;
}

export default function DialogBody(props: DialogBodyProps) {
  const { data } = props;
  const { toast } = useToast();
  const [product, setProduct] = useState<DataProduct>({
    brand: data?.brand || "",
    category: data?.category || "",
    description: data?.description || "",
    id: data?.id || "",
    productName: data?.productName || "",
    price: data?.price || "0",
    discount: data?.discount || "0",
    stock: data?.stock || "0",
    tag: data?.tag || "",
  });
  const [imageUrl, setImageUrl] = useState<string>("");

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
        toast({
          title: "Error!",
          description: "Discount must be less than 100%",
          variant: "destructive",
        });
      }
    }
  }, [product.discount, toast]);

  function handleKeyUp(e: KeyboardEvent<HTMLInputElement>) {
    const filteredValue = e.currentTarget.value.replace(/[^0-9]/g, "");
    const formatted = filteredValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formatted;
  }

  async function handleSubmit() {
    try {
      const price = +product.price!.replace(/\./g, "");
      const stock = +product.stock!.replace(/\./g, "");
      const data = {
        productName: product.productName,
        category: product.category!.toUpperCase(),
        brand: product.brand,
        description: product.description,
        imageUrl,
        price,
        stock,
        discount: +product.discount!,
        tag: product.tag, 
      };
      addProductSchema.parse(data);

      console.log(data);
    } catch (error) {
      if (error instanceof ZodError) {
        let message = "";
        error.errors.map((err) => {
          message += err.message + ", ";
        });

        toast({
          title: "Error!",
          description: message,
          variant: "destructive",
        });
      } else if (error instanceof Error) {
        toast({
          title: "Error!",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error!",
          description: "Please fill all fields properly",
          variant: "destructive",
        });
      }
    }
  }

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
              defaultValue={product.category}
              onValueChange={(e) =>
                setProduct({
                  ...product,
                  category: e as DataProduct["category"],
                })
              }
            >
              <SelectTrigger className="" id="category">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="">
                <SelectItem value="laptop">Laptop</SelectItem>
                <SelectItem value="accessory">Accsessory</SelectItem>
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
        <UploadImage imageUrl={imageUrl} setImageUrl={setImageUrl} />
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
            value={product.price}
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
              setProduct({ ...product, discount: e.target.value });
            }}
            maxLength={3}
          />
          <Label htmlFor="tag" className="mt-3">
            Tag
          </Label>

          <Input
            id="tag"
            type="text"
            placeholder="Tag"
            className="placeholder:text-gray-600"
            value={product.tag}
            onChange={(e) => setProduct({ ...product, tag: e.target.value })}
          />
        </div>
      </div>
      <Button className="mt-6" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}
