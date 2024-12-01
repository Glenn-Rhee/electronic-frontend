import EmptyShell from "./EmptyShell";
import EmptyTitle from "./EmptyTitle";

export default function TableEmpty({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <EmptyShell className="md:pt-44">
      {children}
      <EmptyTitle>{title}</EmptyTitle>
    </EmptyShell>
  );
}
