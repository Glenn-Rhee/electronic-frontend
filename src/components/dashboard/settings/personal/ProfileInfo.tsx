import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ProfileInfoProps {
  label: string;
  value: string;
  isSet?: boolean;
}

export default function ProfileInfo(props: ProfileInfoProps) {
  const { label, value, isSet } = props;

  return (
    <div className="flex flex-col">
      {isSet ? (
        <>
          <Label className="text-sm text-gray-500" htmlFor={label}>
            {label}
          </Label>
          <Input
            id={label}
            className="mt-1 border border-slate-800 focus:outline-none focus:border-slate-800 placeholder:text-sm placeholder:text-gray-600"
            type="text"
            placeholder={value}
          />
        </>
      ) : (
        <>
          <span className="text-sm text-gray-500" role="label">
            {label}
          </span>
          <span className="text-sm">{value}</span>
        </>
      )}
    </div>
  );
}
