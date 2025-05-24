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
import { Dispatch, SetStateAction } from "react";
import "pickerjs/dist/picker.css";
import { Textarea } from "@/components/ui/textarea";
import { DataUserState } from "./TabsSetProfile";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import InputPhone from "../../InputPhone";

interface ProfileInfoProps {
  label: string;
  value?: DataUserState;
  children?: string;
  isSet?: boolean;
  setValue?: Dispatch<SetStateAction<DataUserState>>;
}

export default function ProfileInfo(props: ProfileInfoProps) {
  const { label, value, isSet, setValue, children } = props;
  // console.log(value)
  return (
    <div className="flex flex-col">
      {isSet && setValue && value ? (
        <>
          <Label className="text-sm text-gray-500" htmlFor={label}>
            {label}
          </Label>
          {label.toLowerCase().includes("category") ? (
            <Select
              value={value.storeCategory.toLowerCase()}
              onValueChange={(e) => {
                setValue({
                  ...value,
                  storeCategory: e,
                });
              }}
            >
              <SelectTrigger className="mt-1 border focus:outline-none border-slate-800">
                <SelectValue
                  placeholder={value.storeCategory.toLowerCase()}
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
            <div className="mt-1 grid grid-cols-2 gap-x-2">
              <div className="flex flex-col justify-center itemscenter mt-1 w-full md:mt-0">
                <div className="flex items-center gap-x-1">
                  <div className="lg:w-[35%] w-1/4 bg-white border border-gray-400 rounded-sm flex items-center justify-center">
                    <Input
                      maxLength={2}
                      value={value.openStore.split(":")[0]}
                      inputMode="numeric"
                      className="flex w-1/2 border text-xs p-0 m-0 border-none focus:ring-0 focus-visible:ring-0 focus:outline-none focus:border-none"
                      onChange={(e) => {
                        const hour = e.target.value;
                        setValue({
                          ...value,
                          openStore: `${hour}:${
                            value.openStore.split(":").length > 1
                              ? value.openStore.split(":")[1]
                              : ""
                          }`,
                        });
                      }}
                    />
                  </div>
                  <div className="lg:w-[35%] w-1/4 bg-white border border-gray-400 px-1 py-0 rounded-sm flex items-center justify-center">
                    <Input
                      maxLength={2}
                      value={value.openStore.split(":")[1]}
                      inputMode="numeric"
                      className="flex w-1/2 border text-xs p-0 m-0 border-none focus:ring-0 focus-visible:ring-0 focus:outline-none focus:border-none"
                      onChange={(e) => {
                        setValue({
                          ...value,
                          openStore: `${
                            value.openStore.split(":").length > 1
                              ? value.openStore.split(":")[0]
                              : ""
                          }:${e.target.value}`,
                        });
                      }}
                    />
                  </div>
                </div>
                <Label htmlFor="opentime" className="text-sm text-gray-600">
                  Open Time
                </Label>
              </div>
              <div className="flex flex-col justify-center itemscenter mt-1 w-full md:mt-0">
                <div className="flex items-center gap-x-1">
                  <div className="lg:w-[35%] w-1/4 bg-white border border-gray-400 rounded-sm flex items-center justify-center">
                    <Input
                      maxLength={2}
                      value={value.closeStore.split(":")[0]}
                      inputMode="numeric"
                      className="flex w-1/2 border text-xs p-0 m-0 border-none focus:ring-0 focus-visible:ring-0 focus:outline-none focus:border-none"
                      onChange={(e) => {
                        const hour = e.target.value;
                        setValue({
                          ...value,
                          closeStore: `${hour}:${
                            value.closeStore.split(":").length > 1
                              ? value.closeStore.split(":")[1]
                              : ""
                          }`,
                        });
                      }}
                    />
                  </div>
                  <div className="lg:w-[35%] w-1/4 bg-white border border-gray-400 px-1 py-0 rounded-sm flex items-center justify-center">
                    <Input
                      maxLength={2}
                      value={value.closeStore.split(":")[1]}
                      inputMode="numeric"
                      className="flex w-1/2 border text-xs p-0 m-0 border-none focus:ring-0 focus-visible:ring-0 focus:outline-none focus:border-none"
                      onChange={(e) => {
                        setValue({
                          ...value,
                          closeStore: `${
                            value.closeStore.split(":").length > 1
                              ? value.closeStore.split(":")[0]
                              : ""
                          }:${e.target.value}`,
                        });
                      }}
                    />
                  </div>
                </div>
                <Label htmlFor="opentime" className="text-sm text-gray-600">
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
          ) : label.includes("Phone") ? (
            <InputPhone>
              <Input
                id={label}
                className="border border-none focus:ring-0 focus-visible:ring-0 focus:outline-none focus:border-none placeholder:text-sm placeholder:text-gray-600"
                type="text"
                maxLength={13}
                value={
                  value[
                    (label.split(" ").length > 1
                      ? label.split(" ")[0][0].toLowerCase() +
                        label.split(" ")[0].slice(1) +
                        label.split(" ")[1][0].toUpperCase() +
                        label.split(" ")[1].slice(1)
                      : label.toLowerCase()) as keyof typeof value
                  ].split("+62")[1]
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
            </InputPhone>
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
              maxLength={label.includes("Account") ? 17 : 255}
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
