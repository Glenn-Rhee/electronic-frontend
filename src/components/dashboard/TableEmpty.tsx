import DialogBody from "./DialogBody";
import EmptyShell from "./EmptyShell";
import EmptyTitle from "./EmptyTitle";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function TableEmpty({
  title,
  children,
  isProduct,
}: {
  title: string;
  isProduct?: boolean;
  children: React.ReactNode;
}) {
  return (
    <EmptyShell className="md:pt-44">
      {children}
      <EmptyTitle>{title}</EmptyTitle>
      {isProduct ? (
        <Dialog>
          <DialogTrigger>
            <span className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Add Product
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
      ) : null}
    </EmptyShell>
  );
}
