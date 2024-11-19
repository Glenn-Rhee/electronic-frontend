import { cn } from "@/lib/utils";

export default function AuthShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bg-gray-100 px-3 py-3 shadow rounded-lg",
        className
      )}
    >
      {children}
    </div>
  );
}
