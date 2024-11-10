import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";
import Image from "next/image";

interface TextDetailProps {
  children: React.ReactNode;
}
function TextDetail({ children }: TextDetailProps) {
  return (
    <span className="text-sm font-semibold text-gray-500">{children}</span>
  );
}

function Rating({ value, star }: { value: number; star: number }) {
  return (
    <div className="flex items-center gap-x-2">
      <Star className="text-[#ffc400]" size={18} fill="#ffc400" />
      <span className="font-semibold text-sm text-gray-500">{star}</span>
      <Progress value={(value / 10) * 100} className="" color="green" />
      <span className="font-semibold text-sm text-gray-500">{value}</span>
    </div>
  );
}
export default function DetailProduct() {
  return (
    <div className="flex flex-col px-2">
      <Image
        src={"/img/lenovo-ideapad.avif"}
        width={500}
        height={500}
        alt="Product Image"
        className="h-auto"
      />
      <div className="grid grid-cols-2 gap-x-4">
        <div className="flex flex-col items-start gap-y-1">
          <span className="text-sm text-gray-700">Laptop</span>
          <h2 className="text-xl md:text-3xl font-bold">Laptop Acer</h2>
          <span className="text-xl font-semibold text-green-500">
            Rp 2.000.000
          </span>
          <span className="text-sm text-gray-500 font-light">
            laptop pelajar | laptop gaming | laptop office | laptop
          </span>
        </div>
        <div className="flex flex-col">
          <div className="flex justify-center">
            <div className="flex gap-x-2 items-center">
              <Star className="text-[#ffc400]" fill="#ffc400" />
              <div className="font-semibold">
                <span className="text-2xl md:text-4xl">4.5</span>
                <span className="text-lg md:text-2xl text-gray-400">/5</span>
              </div>
            </div>
          </div>
          <span className="text-center text-sm text-gray-500 font-medium">
            10 rating | 2 review
          </span>
          <div className="mt-4 flex flex-col gap-y-1">
            <Rating star={5} value={8} />
            <Rating star={4} value={1} />
            <Rating star={3} value={0} />
            <Rating star={2} value={1} />
            <Rating star={1} value={0} />
          </div>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-justify">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
          aliquam laboriosam ex officia exercitationem id mollitia, provident
          nulla eligendi, similique quisquam? Dolorum corporis provident iste
          vero aliquid quasi dicta eligendi. Facilis, consequuntur quidem quas
          laudantium quis eius. Aliquid culpa veniam qui ab, numquam similique
          minus voluptas magnam modi provident inventore delectus ullam
          accusamus ex dolore soluta ea officiis asperiores veritatis. Enim
          eligendi ratione maiores, incidunt atque, saepe repudiandae dolorem
          reiciendis dicta rem iusto eaque adipisci voluptates quia illo impedit
          veniam, officia repellendus repellat. Optio saepe minus fuga sunt
          ratione delectus!
        </p>

        <div className="mt-8 gap-y-3 grid grid-cols-2">
          <TextDetail>Stock :</TextDetail>
          <TextDetail>10</TextDetail>
          <TextDetail>Category :</TextDetail>
          <TextDetail>Laptop</TextDetail>
          <TextDetail>Brand :</TextDetail>
          <TextDetail>Acer</TextDetail>
        </div>
      </div>
    </div>
  );
}
