import Image from "next/image";

export default function ImageUser({ src }: { src: string }) {
  return (
    <Image
      priority
      src={src}
      className="w-auto"
      width={200}
      height={200}
      alt={"Avatar user"}
    />
  );
}
