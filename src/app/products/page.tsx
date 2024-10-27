import DialogBody from "@/components/dashboard/DialogBody";
import TableProduct from "@/components/dashboard/TableProduct";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function ProductPage() {
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold">Products Table</h1>
      <div className="flex justify-between gap-2 items-center mt-4">
        <Input
          type="search"
          placeholder="Search item here..."
          className="w-[50%] md:w-[40%] xl:w-[30%]"
        />
        <Dialog>
          <DialogTrigger>
            <span className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Add
            </span>
          </DialogTrigger>
          <DialogContent aria-describedby="Content of product dialog">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-center">
                Add product
              </DialogTitle>
            </DialogHeader>
            <DialogBody />
          </DialogContent>
        </Dialog>
      </div>
      <TableProduct />
    </div>
  );
}
