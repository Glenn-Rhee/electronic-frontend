import { Button } from "@/components/ui/button";
import Link from "next/link";

interface AuthActionProps {
  children: React.ReactNode;
  textGoTo: string;
  href: string;
}

export default function AuthAction(props: AuthActionProps) {
  const { children, textGoTo, href } = props;

  return (
    <div className="flex flex-col justify-center mt-8 items-center gap-y-4">
      <Button type="submit" className="w-full">
        {children}
      </Button>
      <Link href={href} className="text-sm text-blue-500 hover:underline">
        {textGoTo}
      </Link>
    </div>
  );
}
