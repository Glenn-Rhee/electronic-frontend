import Image from "next/image";

export default function ImageUser({
  src,
  size,
}: {
  src: string;
  size?: number;
}) {
  return (
    <Image
      priority
      src={src}
      className="w-auto"
      width={size || 200}
      height={size || 200}
      alt={"Avatar user"}
    />
  );
}
