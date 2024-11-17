interface ProfileInfoProps {
  label: string;
  value: string;
}

export default function ProfileInfo(props: ProfileInfoProps) {
  const { label, value } = props;
  return (
    <div className="flex flex-col">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm">{value}</span>
    </div>
  );
}
