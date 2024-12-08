"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction, useState } from "react";
import "pickerjs/dist/picker.css";
import { Textarea } from "@/components/ui/textarea";
import { DataUserState } from "./TabsSetProfile";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";

interface ProfileInfoProps {
  label: string;
  value?: DataUserState;
  children?: string;
  isSet?: boolean;
  setValue?: Dispatch<SetStateAction<DataUserState>>;
}

export default function ProfileInfo(props: ProfileInfoProps) {
  const { label, value, isSet, setValue, children } = props;
  const [openStore, setOpenStore] = useState<string>("00:00");
  const [closeStore, setCloseStore] = useState<string>("00:00");

  return (
    <div className="flex flex-col">
      {isSet && setValue && value ? (
        <>
          <Label className="text-sm text-gray-500" htmlFor={label}>
            {label}
          </Label>
          {label.toLowerCase().includes("category") ? (
            <Select
              value={value.storeCategory}
              onValueChange={(e) => {
                setValue({
                  ...value,
                  storeCategory: e,
                });
              }}
            >
              <SelectTrigger className="mt-1 border focus:outline-none border-slate-800">
                <SelectValue
                  placeholder={value.storeCategory}
                  className="text-sm text-red-500"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="laptop">Laptop</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : label.toLowerCase().includes("hours") ? (
            <div className="flex flex-col md:flex-row md:items-center gap-3 mt-1">
              <div className="flex flex-col justify-center mt-1 md:mt-0">
                <TimePicker
                  value={openStore}
                  onChange={(e) => setOpenStore(e || "00:00")}
                  required
                />
                <Label htmlFor="opentime" className="text-sm text-gray-600">
                  Open Time
                </Label>
              </div>
              <div className="flex flex-col justify-center">
                <TimePicker
                  value={closeStore}
                  onChange={(e) => setCloseStore(e || "00:00")}
                />
                <Label htmlFor="closetime" className="text-sm text-gray-600">
                  Close Time
                </Label>
              </div>
            </div>
          ) : label.toLowerCase().includes("description") ? (
            <Textarea
              className="border border-slate-800 mt-1 h-2"
              placeholder={value.storeDescription}
              value={value.storeDescription}
              onChange={(e) => {
                setValue({
                  ...value,
                  storeDescription: e.target.value,
                });
              }}
            />
          ) : (
            <Input
              id={label}
              className="mt-1 border border-slate-800 focus:outline-none focus:border-slate-800 placeholder:text-sm placeholder:text-gray-600"
              type="text"
              value={
                value[
                  (label.split(" ").length > 1
                    ? label.split(" ")[0][0].toLowerCase() +
                      label.split(" ")[0].slice(1) +
                      label.split(" ")[1][0].toUpperCase() +
                      label.split(" ")[1].slice(1)
                    : label.toLowerCase()) as keyof typeof value
                ]
              }
              onChange={(e) => {
                setValue({
                  ...value,
                  [(label.split(" ").length > 1
                    ? label.split(" ")[0][0].toLowerCase() +
                      label.split(" ")[0].slice(1) +
                      label.split(" ")[1][0].toUpperCase() +
                      label.split(" ")[1].slice(1)
                    : label.toLowerCase()) as keyof typeof value]:
                    e.target.value,
                });
              }}
            />
          )}
        </>
      ) : (
        <>
          <span className="text-sm text-gray-500" role="label">
            {label}
          </span>
          <span className="text-sm">{children}</span>
        </>
      )}
    </div>
  );
}
