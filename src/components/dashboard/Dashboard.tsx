"use client";
import { DataTransaction } from "@/app/page";
import BarCart from "@/components/dashboard/Barcart";
import Card from "@/components/dashboard/Card/Card";
import CardContent from "@/components/dashboard/Card/CardContent";
import ProcessedCard from "@/components/dashboard/Card/ProcessedCard";
import SalesCard from "@/components/dashboard/Card/SalesCard";
import OrderRevenue from "@/components/dashboard/OrderRevenue";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  CreditCard,
  DollarSign,
  LucideIcon,
  Repeat,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface CardProps {
  label: string;
  icon: LucideIcon;
  amount: string;
  description: string;
}

interface SalesCardProps {
  name: string;
  email: string;
  saleAmount: number;
}

interface DashboardProps {
  dataTransaction: DataTransaction[] | [];
}

export default function Dashboard(props: DashboardProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { dataTransaction } = props;
  const router = useRouter();
  const first = localStorage.getItem("first");
  if (!first) {
    localStorage.setItem("first", "true");
    router.refresh();
  }

  console.log(first);
  const cardData: CardProps[] = [
    {
      label: "Total Revenue",
      amount: "Rp. 1.500.000",
      description: "+20.1% from last month",
      icon: DollarSign,
    },
    {
      label: "Total Users",
      amount: "5.000",
      description: "+180.1% from last month",
      icon: Users,
    },
    {
      label: "Sales",
      amount: "+12,234",
      description: "+19% from last month",
      icon: CreditCard,
    },
    {
      label: "Orders processed",
      amount: "10",
      description: "+2 from today",
      icon: Repeat,
    },
  ];

  const userSalesData: SalesCardProps[] = [
    {
      name: "Ariel Rizki",
      email: "arielrizki2005@gmail.com",
      saleAmount: 50000,
    },
    {
      name: "Glenn Rhee",
      email: "glennrhee@gmail.com",
      saleAmount: 60000,
    },
    {
      name: "Maggie Rhee",
      email: "maggierhee@gmail.com",
      saleAmount: 70000,
    },
    {
      name: "Maggie Rhee",
      email: "maggierhee@gmail.com",
      saleAmount: 70000,
    },
    {
      name: "Maggie Rhee",
      email: "maggierhee@gmail.com",
      saleAmount: 70000,
    },
  ];
  return (
    <div className="flex flex-col w-full gap-5">
      <div className="flex items-center gap-x-2 order-1 md:order-none">
        <h1 className={cn("text-2xl font-bold")}>Dashboard</h1>
        <OrderRevenue />
      </div>
      <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4 order-3 md:order-none">
        {cardData.map((card, i) => (
          <Card
            label={card.label}
            amount={card.amount}
            description={card.description}
            icon={card.icon}
            key={i}
          />
        ))}
      </section>
      <CardContent className="h-[500px] transition-all order-2 md:order-none">
        <p className="p-4 font-semibold">Overview</p>
        <BarCart />
      </CardContent>
      <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2 order-4 md:order-none">
        <CardContent className="h-[450px] overflow-scroll">
          <p>Recent Sales</p>
          <p className="text-sm text-gray-400">You made 250 sales this month</p>
          {userSalesData.map((user, i) => (
            <SalesCard
              name={user.name}
              email={user.email}
              saleAmount={user.saleAmount}
              key={i}
            />
          ))}
        </CardContent>
        <CardContent className="h-[450px] overflow-scroll">
          <span>Orders Processed</span>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Id</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userSalesData.map((user, i) => (
                <ProcessedCard key={i} />
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </section>
    </div>
  );
}
