"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Dispatch, SetStateAction, useState } from "react";

interface SettingOptions<Tvalue> {
  placeholder: string;
  selectValue: Tvalue;
  setValue: Dispatch<SetStateAction<"able" | "disable">>;
  selects: { value: Tvalue; label: string }[];
}

export default function SettingsPage() {
  const [revenue, setRevenue] = useState<"able" | "disable">("able");
  const [users, setusers] = useState<"able" | "disable">("able");
  const [sales, setSales] = useState<"able" | "disable">("able");
  const [orders, setOrders] = useState<"able" | "disable">("able");

  const selects: SettingOptions<"able" | "disable">["selects"] = [
    {
      value: "able",
      label: "Able",
    },
    {
      value: "disable",
      label: "Disable",
    },
  ];

  const settingOptions: SettingOptions<"able" | "disable">[] = [
    {
      placeholder: "Able revenue",
      selectValue: revenue,
      setValue: setRevenue,
      selects,
    },
    {
      placeholder: "Able users",
      selectValue: users,
      setValue: setusers,
      selects,
    },
    {
      placeholder: "Able sales",
      selectValue: sales,
      setValue: setSales,
      selects,
    },
    {
      placeholder: "Able procesed orders",
      selectValue: orders,
      setValue: setOrders,
      selects,
    },
  ];

  return (
    <div className="mt-4">
      <div className="flex flex-col gap-y-2">
        <h4 className="font-semibold text-lg">Dashboard page</h4>
        <Separator className="mb-2 bg-gray-400 h-[1px]" />
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
          {settingOptions.map((opt, i) => (
            <div className="px-1" key={i}>
              <Label className="font-medium">{opt.placeholder}</Label>
              <Select
                onValueChange={(e) => opt.setValue(e as "able" | "disable")}
              >
                <SelectTrigger className="">
                  <SelectValue
                    placeholder={
                      opt.selectValue.charAt(0).toUpperCase() +
                      opt.selectValue.slice(1)
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {opt.selects.map((opt, i) => (
                      <SelectItem key={i} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
        <Button className="mt-10 w-min text-lg font-semibold hover:bg-green-600  bg-green-500 text-white">
          Save
        </Button>
      </div>
    </div>
  );
}
