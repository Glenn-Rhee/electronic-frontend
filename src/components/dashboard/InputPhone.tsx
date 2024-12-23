import { cn } from "@/lib/utils";

export default function InputPhone({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string
}) {
  return (
    <div className={cn("max-h-9 flex items-center border border-gray-400 rounded overflow-hidden focus-within:ring-1 focus-within:ring-ring focus-within:outline-none", className)}>
      <span className="text-gray-500 text-sm bg-gray-200 py-2 px-2">+62</span>
      {children}
    </div>
  );
}
