export default function EmptyTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h1 className="font-bold text-xl text-center md:text-2xl">{children}</h1>
  );
}
