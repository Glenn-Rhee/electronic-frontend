"use client";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { RevenueStore, useRevenue } from "@/lib/store/revenueStore";

const ordersBy = [
  {
    value: "today",
    label: "Today",
  },
  {
    value: "lastWeek",
    label: "Last Week",
  },
  {
    value: "lastMonth",
    label: "Last Month",
  },
  {
    value: "lastYear",
    label: "Last Year",
  },
];

export default function OrderRevenue() {
  const [open, setOpen] = useState<boolean>(false);
  const { valueOrder, setValueorder } = useRevenue();

  console.log(valueOrder);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className="min-w-[100px] bg-slate-100 border-slate-900 shadow-none outline-none hover:bg-slate-300 hover:text-slate-600"
      >
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {valueOrder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandEmpty>No orders found.</CommandEmpty>
            <CommandGroup>
              {ordersBy.map((order) => (
                <CommandItem
                  key={order.value}
                  value={order.value}
                  onSelect={(currentValue) => {
                    setValueorder(currentValue as RevenueStore["valueOrder"]);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      valueOrder === order.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {order.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
