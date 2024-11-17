"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Picker from "pickerjs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRef } from "react";
import "pickerjs/dist/picker.css";
import { Textarea } from "@/components/ui/textarea";

interface ProfileInfoProps {
  label: string;
  value: string;
  isSet?: boolean;
}

export default function ProfileInfo(props: ProfileInfoProps) {
  const { label, value, isSet } = props;
  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col">
      {isSet ? (
        <>
          <Label className="text-sm text-gray-500" htmlFor={label}>
            {label}
          </Label>
          {label.toLowerCase().includes("category") ? (
            <Select>
              <SelectTrigger className="mt-1 border focus:outline-none border-slate-800">
                <SelectValue
                  placeholder={value}
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
            <div className="flex items-center gap-x-3 mt-1">
              <div className="flex flex-col justify-center">
                <Input
                  ref={startRef}
                  id={"opentime"}
                  type="text"
                  readOnly
                  onClick={() => {
                    if (!startRef.current) return;

                    new Picker(startRef.current, {
                      format: "HH:mm",
                      headers: true,
                      text: {
                        title: "Open Time",
                      },
                    });
                  }}
                  placeholder={value.split(" - ")[0]}
                  className="mt-1 border border-slate-800 focus:outline-none focus:border-slate-800 placeholder:text-sm placeholder:text-gray-600"
                />
                <Label htmlFor="opentime" className="text-sm text-gray-600">
                  Open Time
                </Label>
              </div>
              <div className="flex flex-col justify-center">
                <Input
                  ref={endRef}
                  id={"closetime"}
                  type="text"
                  readOnly
                  onClick={() => {
                    if (!endRef.current) return;

                    new Picker(endRef.current, {
                      format: "HH:mm",
                      headers: true,
                      text: {
                        title: "Close Time",
                      },
                    });
                  }}
                  placeholder={value.split(" - ")[1]}
                  className="mt-1 border border-slate-800 focus:outline-none focus:border-slate-800 placeholder:text-sm placeholder:text-gray-600"
                />
                <Label htmlFor="closetime" className="text-sm text-gray-600">
                  Close Time
                </Label>
              </div>
            </div>
          ) : label.toLowerCase().includes("description") ? (
            <Textarea className="border border-slate-800 mt-1 h-2" placeholder={value}/>
          ) : (
            <Input
              id={label}
              className="mt-1 border border-slate-800 focus:outline-none focus:border-slate-800 placeholder:text-sm placeholder:text-gray-600"
              type="text"
              placeholder={value}
            />
          )}
        </>
      ) : (
        <>
          <span className="text-sm text-gray-500" role="label">
            {label}
          </span>
          <span className="text-sm">{value}</span>
        </>
      )}
    </div>
  );
}
