"use client";
import { useState } from "react";
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
  price?: number;
  discount?: number;
  stock?: number;
  tag?: string;
}

interface DialogBodyProps {
  data?: DataProduct;
}

export default function DialogBody(props: DialogBodyProps) {
  const { data } = props;
  const [product, setProduct] = useState<DataProduct>({
    brand: data?.brand || "",
    category: data?.category || "",
    description: data?.description || "",
    id: data?.id || "",
    productName: data?.productName || "",
    price: data?.price || 0,
    discount: data?.discount || 0,
    stock: data?.stock || 0,
    tag: data?.tag || "",
  });

  return (
    <div className="flex flex-col">
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
        <Input
          type="file"
          placeholder="Upload Image"
          className="text-gray-600"
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
            className="placeholder:text-gray-600"
            value={product.price?.toLocaleString("id-ID")}
            onChange={(e) =>
              setProduct({ ...product, price: Number(e.target.value) })
            }
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
            onChange={(e) =>
              setProduct({ ...product, stock: Number(e.target.value) })
            }
          />
          <Label htmlFor="discount" className="mt-3">
            Discount
          </Label>

          <Input
            id="discount"
            type="text"
            placeholder="Discount"
            className="placeholder:text-gray-600"
            value={product.discount}
            onChange={(e) =>
              setProduct({ ...product, discount: Number(e.target.value) })
            }
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
      <Button className="mt-6">Submit</Button>
    </div>
  );
}
