import { cn } from "@/lib/utils";

export default function Auth({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex w-full justify-center items-center", className)}>
      {children}
    </div>
  );
}
