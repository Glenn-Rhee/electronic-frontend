import { Badge } from "@/components/ui/badge";
import { TableCell, TableRow } from "@/components/ui/table";

export default function ProcessedCard() {
  return (
    <TableRow>
      <TableCell>123456</TableCell>
      <TableCell>
        <Badge className="bg-amber-500  hover:bg-amber-600">Processed</Badge>
      </TableCell>
      <TableCell>1 Oct 2024</TableCell>
    </TableRow>
  );
}
