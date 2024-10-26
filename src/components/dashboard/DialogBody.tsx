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

function TitleDialog(props: { children: React.ReactNode }) {
  const { children } = props;
  return (
    <span className="font-medium text-sm mt-3 text-gray-400">{children}</span>
  );
}

export default function DialogBody() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2">
        <TitleDialog>Product Information</TitleDialog>
        <Separator className="my-1 bg-slate-400" />
        <div className="mt-1 grid grid-cols-2 gap-x-2">
          <div className="flex flex-col gap-y-2">
            <Input type="text" placeholder="Product Name" />
            <Select>
              <SelectTrigger className="text-gray-600">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="text-gray-600">
                <SelectItem value="laptop">Laptop</SelectItem>
                <SelectItem value="accessory">Accsessory</SelectItem>
              </SelectContent>
            </Select>
            <Input
              type="text"
              placeholder="Brand"
              className="placeholder:text-gray-600"
            />
          </div>
          <Textarea
            className="shadow shadow-black/15"
            placeholder="Description"
          />
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
          <Input
            type="text"
            placeholder="Price"
            className="placeholder:text-gray-600"
          />
          <Input
            type="text"
            placeholder="Stock"
            className="placeholder:text-gray-600"
          />
          <Input
            type="text"
            placeholder="Discount"
            className="placeholder:text-gray-600"
          />
          <Input
            type="text"
            placeholder="Tag"
            className="placeholder:text-gray-600"
          />
        </div>
      </div>
      <Button className="mt-6">Submit</Button>
    </div>
  );
}
