import TableShell from "@/components/dashboard/TableShell";
import TableUsers from "@/components/dashboard/TableUsers";
import { Input } from "@/components/ui/input";

export default function UserPage() {
  return (
    <TableShell title="Users Table">
      <div className="mt-4">
        <Input
          type="search"
          placeholder="Search any user here..."
          className="w-[50%] md:w-[40%] xl:w-[30%]"
        />
        <TableUsers />
      </div>
    </TableShell>
  );
}
