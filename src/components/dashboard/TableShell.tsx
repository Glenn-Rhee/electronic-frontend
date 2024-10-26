import TitleTable from "./TitleTable";

export default function TableShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="w-full">
      <TitleTable>{title}</TitleTable>
      {children}
    </div>
  );
}
