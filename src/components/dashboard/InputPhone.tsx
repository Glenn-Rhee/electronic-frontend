export default function InputPhone({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-h-9 flex items-center border border-gray-400 rounded overflow-hidden focus-within:ring-1 focus-within:ring-ring focus-within:outline-none">
      <span className="text-gray-500 text-sm bg-gray-200 py-2 px-2">+62</span>
      {children}
    </div>
  );
}
