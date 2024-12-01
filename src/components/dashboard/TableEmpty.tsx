import EmptyShell from "./EmptyShell";
import ImageEmpty from "./ImageEmpty";
import EmptyTitle from "./EmptyTitle";

export default function TableEmpty() {
  return (
    <EmptyShell className="md:pt-44">
      <ImageEmpty src="/img/table-user.png" alt="Empty Table user" />
      <EmptyTitle>Your table user is empty!</EmptyTitle>
    </EmptyShell>
  );
}
