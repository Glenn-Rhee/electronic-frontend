import type { Metadata } from "next";
import "./globals.css";
import SidebarNav from "@/components/dashboard/SidebarNav";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("min-h-screen w-full bg-[#f2f2f2] text-black flex")}>
        <SidebarNav />
        <div className="p-8 w-full">{children}</div>
      </body>
    </html>
  );
}
