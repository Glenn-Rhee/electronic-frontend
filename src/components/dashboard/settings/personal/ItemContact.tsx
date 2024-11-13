import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

interface ItemContactProps {
  label: string;
  value: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  className?: string
}

export default function ItemContact(props: ItemContactProps) {
  const { label, value, className } = props;

  return (
    <div className="flex items-center gap-x-5">
      <props.icon className={className} />
      <div className="flex flex-col">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="font-semibold">{value}</span>
      </div>
    </div>
  );
}
