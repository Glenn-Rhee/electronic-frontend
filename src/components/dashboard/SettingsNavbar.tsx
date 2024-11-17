"use client";

import Link from "next/link";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function SettingsNavbar() {
  const pathname = usePathname();

  const links = [
    {
      title: "Manage Account",
      href: "/settings",
    },
    {
      title: "Personal Info",
      href: "/settings/personal",
    },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold">Settings</h1>

      <nav className="flex items-center gap-x-4 mt-4">
        {links.map((item, index) => (
          <div className="flex flex-col" key={index}>
            <Link
              href={item.href}
              className={cn(
                "md:font-semibold  md:text-lg hover:text-green-400 cursor-pointer",
                { "text-green-500": item.href === pathname }
              )}
            >
              {item.title}
            </Link>
            {item.href === pathname ? (
              <Separator className="mt-1 md:mt-0 md:h-[2px] bg-green-500" />
            ) : null}
          </div>
        ))}
      </nav>
    </>
  );
}
