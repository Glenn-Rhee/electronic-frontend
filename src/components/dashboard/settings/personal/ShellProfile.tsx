import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function ShellProfile({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-y-1 px-2 mb-8", className)}>
      <h6 className="font-semibold">{title}</h6>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 mt-1 gap-5">{children}</div>
    </div>
  );
}
