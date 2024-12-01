export default function ErrorUi({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full flex items-center justify-center h-[90vh]">
      <h1 className="font-bold text-xl text-center md:text-2xl">{children}</h1>
    </div>
  );
}
