import SettingsNavbar from "@/components/dashboard/SettingsNavbar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <SettingsNavbar />
      {children}
    </section>
  );
}
