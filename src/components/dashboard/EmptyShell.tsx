import { cn } from "@/lib/utils";

export default function EmptyShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-full pt-40 md:pt-20",
        className
      )}
    >
      <div className="space-y-4 flex flex-col items-center">{children}</div>
    </div>
  );
}
