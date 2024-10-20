"use client";
import {
  LayoutDashboard,
  Menu,
  Settings,
  ShoppingCart,
  UsersRound,
  X,
} from "lucide-react";
import { Nav } from "./Nav";
import Profile from "./Profile";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function SidebarNav() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <button
        className="fixed md:hidden top-5 right-5"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X strokeWidth={1.75} absoluteStrokeWidth />
        ) : (
          <Menu strokeWidth={1.25} />
        )}
      </button>
      <div
        className={cn(
          "min-w-[90px] fixed hidden md:relative md:block md:min-w-[90px] border-r px-1 md:px-3 pb-10 pt-20 md:pt-24",
          {
            "block bg-[#f2f2f2] inset-y-0 left-0 z-50": isOpen,
          }
        )}
      >
        <div className="flex justify-center">
          <Profile />
        </div>
        <Nav
          links={[
            {
              title: "Dashboard",
              icon: LayoutDashboard,
              variant: "default",
              href: "/",
            },
            {
              title: "User",
              icon: UsersRound,
              variant: "ghost",
              href: "/users",
            },
            {
              title: "Orders",
              icon: ShoppingCart,
              variant: "ghost",
              href: "/order",
            },
            {
              title: "Settings",
              icon: Settings,
              variant: "ghost",
              href: "/settings",
            },
          ]}
        />
      </div>
    </>
  );
}
