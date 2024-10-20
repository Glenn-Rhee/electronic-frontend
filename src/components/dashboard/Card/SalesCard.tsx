import Image from "next/image";

interface SalesCardProps {
  name: string;
  email: string;
  saleAmount: number;
}

export default function SalesCard(props: SalesCardProps) {
  const { name, email, saleAmount } = props;

  return (
    <div className="flex flex-wrap justify-between gap-3 mt-4 overflow-scrol">
      <section className="flex justify-between gap-3 ">
        <div className="h-12 w-12 rounded-full bg-gray-100 p-1">
          <Image
            src={`/img/prof.jpg`}
            width={200}
            height={200}
            alt={`Avatar ${name}`}
            className="rounded-full"
          />
        </div>
        <div className="text-sm">
          <p>{name}</p>
          <div className="text-ellipsis overflow-hidden whitespace-nowrap w-[120px] sm:w-auto text-gray-400">
            {email}
          </div>
        </div>
      </section>
      <p>{"Rp. " + saleAmount.toLocaleString("id-ID")}</p>
    </div>
  );
}
