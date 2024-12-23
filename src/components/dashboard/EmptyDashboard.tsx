import EmptyShell from "./EmptyShell";
import EmptyTitle from "./EmptyTitle";
import ImageEmpty from "./ImageEmpty";

export default function EmptyDashboard() {
  return (
    <EmptyShell>
      <ImageEmpty src={"/img/Dashboard.png"} alt="Empty Dashboard" />
      <EmptyTitle>Your Dashboard is Empty!</EmptyTitle>
    </EmptyShell>
  );
}
