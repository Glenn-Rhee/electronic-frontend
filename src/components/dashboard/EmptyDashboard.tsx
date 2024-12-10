"use client";

import { useRouter } from "next/navigation";
import EmptyShell from "./EmptyShell";
import EmptyTitle from "./EmptyTitle";
import ImageEmpty from "./ImageEmpty";

export default function EmptyDashboard() {
  const router = useRouter();
  const first = localStorage.getItem("first");
  if (!first) {
    localStorage.setItem("first", "true");
    router.refresh();
  }

  return (
    <EmptyShell>
      <ImageEmpty src={"/img/Dashboard.png"} alt="Empty Dashboard" />
      <EmptyTitle>Your Dashboard is Empty!</EmptyTitle>
    </EmptyShell>
  );
}
