import { cn } from "@/lib/utils";

export default function CardContent(
  props: React.HtmlHTMLAttributes<HTMLDivElement>
) {
  return (
    <div
      {...props}
      className={cn(
        "flex w-full gap-3 flex-col rounded-xl border p-5 shadow-md",
        props.className
      )}
    />
  );
}
