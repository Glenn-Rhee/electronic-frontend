import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";

interface AuthActionProps {
  children: React.ReactNode;
  textGoTo: string;
  href: string;
  isLoading: boolean;
}

export default function AuthAction(props: AuthActionProps) {
  const { children, textGoTo, href, isLoading } = props;

  return (
    <div className="flex flex-col justify-center mt-8 items-center gap-y-4">
      <Button type="submit" className={cn("w-full", {"cursor-not-allowed": isLoading})} disabled={isLoading}>
        {isLoading ? <LoaderCircle className="animate-spin"/> : children}
      </Button>
      <Link href={href} className="text-sm text-blue-500 hover:underline">
        {textGoTo}
      </Link>
    </div>
  );
}
