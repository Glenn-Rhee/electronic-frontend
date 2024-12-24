import { cookies } from "next/headers";
import Sidebar from "./Sidebar";

export default function SidebarNav() {
  const xtr = cookies().get("xtr")?.value;
  return <Sidebar xtr={xtr} />;
}
