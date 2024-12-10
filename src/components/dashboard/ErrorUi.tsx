"use client";
import { useRouter } from "next/navigation";

export default function ErrorUi({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const first = localStorage.getItem("first");
  if (!first) {
    localStorage.setItem("first", "true");
    router.refresh();
  }
  return (
    <div className="w-full flex items-center justify-center h-[90vh]">
      <h1 className="font-bold text-xl text-center md:text-2xl text-red-500">
        {children}
      </h1>
    </div>
  );
}
