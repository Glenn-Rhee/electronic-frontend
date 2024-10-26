import TableOrders from "@/components/dashboard/TableOrders";
import TableShell from "@/components/dashboard/TableShell";
import { Input } from "@/components/ui/input";

export default function OrdersPage() {
  return (
    <TableShell title="Orders Table">
      <div className="mt-4">
        <Input
          type="search"
          placeholder="Search item here..."
          className="w-[50%] md:w-[40%] xl:w-[30%]"
        />
        <TableOrders />
      </div>
    </TableShell>
  );
}
