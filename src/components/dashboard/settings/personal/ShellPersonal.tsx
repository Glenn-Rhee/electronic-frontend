import { cn } from "@/lib/utils";

export default function ShellPersonal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("px-6 py-4 bg-white shadow-md mt-5 rounded-md", className)}
    >
      {children}
    </div>
  );
}
