import Image from "next/image";

interface ImageEmptyProps {
  src: string;
  alt: string;
}
export default function ImageEmpty({ src, alt }: ImageEmptyProps) {
  return (
    <Image
      src={src}
      alt={alt}
      height={225}
      width={400}
      className="aspect-auto w-auto"
    />
  );
}
