import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";
import ProfileInfo from "./ProfileInfo";

interface ItemContactProps {
  label: string;
  value: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  className?: string;
}

export default function ItemContact(props: ItemContactProps) {
  const { label, value, className } = props;

  return (
    <div className="flex items-center gap-x-5">
      <props.icon className={className} />
      <ProfileInfo label={label}>{value}</ProfileInfo>
    </div>
  );
}
