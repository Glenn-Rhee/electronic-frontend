"use client";
import { DataSettings, SettingsState } from "@/app/settings/page";
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
import { useToast } from "@/hooks/use-toast";
import { useXtr } from "@/lib/store/xtrStore";
import { ResponseDefault } from "@/types";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

interface SettingOptions<Tvalue> {
  placeholder: string;
  selectValue: Tvalue;
  setValue: Dispatch<SetStateAction<"ABLE" | "DISABLE">>;
  selects: { value: Tvalue; label: string }[];
}

interface SettingsProps {
  data: DataSettings | null;
}

export default function Settings(props: SettingsProps) {
  const { data } = props;
  const { toast } = useToast();
  const { xtr } = useXtr();
  const router = useRouter();
  const [revenue, setRevenue] = useState<"ABLE" | "DISABLE">(
    data!.revenue.toLowerCase() as SettingsState
  );
  const [users, setusers] = useState<"ABLE" | "DISABLE">(
    data!.users.toLowerCase() as SettingsState
  );
  const [sales, setSales] = useState<"ABLE" | "DISABLE">(
    data!.sales.toLowerCase() as SettingsState
  );
  const [orders, setOrders] = useState<"ABLE" | "DISABLE">(
    data!.orders.toLowerCase() as SettingsState
  );

  const selects: SettingOptions<"ABLE" | "DISABLE">["selects"] = [
    {
      value: "ABLE",
      label: "ABLE",
    },
    {
      value: "DISABLE",
      label: "DISABLE",
    },
  ];

  const settingOptions: SettingOptions<"ABLE" | "DISABLE">[] = [
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

  async function saveSettings() {
    const data = {
      revenue: revenue.toUpperCase(),
      users: users.toUpperCase(),
      sales: sales.toUpperCase(),
      orders: orders.toUpperCase(),
    };

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/settings",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: xtr || "",
          },
          body: JSON.stringify(data),
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save settings");
      }

      const dataResponse = (await response.json()) as ResponseDefault;
      if (dataResponse.status === "failed") {
        throw new Error(dataResponse.message);
      }

      toast({
        title: "Success!",
        description: "Settings saved successfully",
        variant: "default",
      });
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error!",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error!",
          description: "Something went wrong",
          variant: "destructive",
        });
      }
    }
  }

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
                onValueChange={(e) => opt.setValue(e as "ABLE" | "DISABLE")}
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
                        {opt.label.charAt(0).toUpperCase() +
                          opt.label.slice(1).toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
        <Button
          onClick={saveSettings}
          className="mt-10 w-min text-lg font-semibold hover:bg-green-600  bg-green-500 text-white"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
