import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { LucideIcon } from "lucide-react";

interface NavProps {
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "ghost";
    href: string;
  }[];
  className?: string;
}

export function Nav({ links, className }: NavProps) {

  return (
    <TooltipProvider>
      <div
        className={
          "group flex flex-col items-center gap-4 py-2 data-[collapsed=true]:py-2" +
          className
        }
      >
        <nav className="grid gap-8 ps-2 pe-4 md:pe-10 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
          {links.map((item, index) => (
            <div key={index}>
              <div className="block md:hidden">
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        buttonVariants({
                          variant: item.variant,
                          size: "icon",
                        }),
                        "h-9 w-9 text-xl",
                        item.variant === "default" &&
                          "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="sr-only">{item.title}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="flex items-center gap-4"
                  >
                    {item.title}
                    {item.label && (
                      <span className="ml-auto text-muted-foreground">
                        {item.label}
                      </span>
                    )}
                  </TooltipContent>
                </Tooltip>
              </div>
              <Link
                href={item.href}
                className={cn(
                  buttonVariants({
                    variant: item.variant,
                    size: "sm",
                  }),
                  item.variant === "default" &&
                    "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
                  "justify-start text-lg hidden md:flex"
                )}
              >
                <item.icon className="mr-2 h-5 w-5" />
                {item.title}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </TooltipProvider>
  );
}
