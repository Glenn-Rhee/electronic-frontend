"use client";
import { Separator } from "@/components/ui/separator";
import { useRating } from "@/lib/store/ratingStore";
import PopoverClient from "../PopooverClient";
import { ChevronDown, Star } from "lucide-react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { cn } from "@/lib/utils";

const sortBy = [
  {
    value: "latest",
    label: "Latest",
  },
  {
    value: "highest",
    label: "Highest",
  },
  {
    value: "lowest",
    label: "Lowest",
  },
];

export default function ReviewProduct() {
  const { valueRating, setValueRating } = useRating();
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className="mt-10 md:mt-1">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Review Product</h2>
        <PopoverClient
          value={valueRating}
          setValue={setValueRating}
          options={sortBy}
        />
      </div>
      <Separator className="my-2 h-[1px] bg-gray-400" />
      <div className="flex flex-col gap-y-10 mt-4 px-2">
        <div className="flex flex-col items-start gap-y-2">
          <div className="flex items-center gap-x-1">
            <Image
              src={"/img/prof.jpg"}
              width={40}
              height={40}
              alt="Profile user"
              className="rounded-full"
            />
            <span className="text-lg font-semibold">Ariel</span>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="flex items-center gap-x-1">
              <Star className="text-[#ffc400]" size={18} fill="#ffc400" />
              <Star className="text-[#ffc400]" size={18} fill="#ffc400" />
              <Star className="text-[#ffc400]" size={18} fill="#ffc400" />
              <Star className="text-[#ffc400]" size={18} fill="#ffc400" />
              <Star className="text-[#ffc400]" size={18} fill="#ffc400" />
            </div>
            <span className="font-semibold text-gray-500">1 hari lalu</span>
          </div>
          <p className="my-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>

          <Dialog>
            <DialogTrigger asChild>
              <span className="cursor-pointer hover:underline text-sm text-gray-600">
                Reply
              </span>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reply customer</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-y-2">
                <Label className="text-sm" htmlFor="message">
                  Message :
                </Label>
                <Textarea id="message" />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-col items-start gap-y-2">
          <div className="flex items-center gap-x-1">
            <Image
              src={"/img/prof.jpg"}
              width={40}
              height={40}
              alt="Profile user"
              className="rounded-full"
            />
            <span className="text-lg font-semibold">Ariel</span>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="flex items-center gap-x-1">
              <Star className="text-[#ffc400]" size={18} fill="#ffc400" />
              <Star className="text-[#ffc400]" size={18} fill="#ffc400" />
              <Star className="text-[#ffc400]" size={18} fill="#ffc400" />
              <Star className="text-[#ffc400]" size={18} fill="#ffc400" />
              <Star className="text-[#ffc400]" size={18} fill="#ffc400" />
            </div>
            <span className="font-semibold text-gray-500">1 hari lalu</span>
          </div>
          <p className="my-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <div className="flex w-full justify-between items-center">
            <Dialog>
              <DialogTrigger asChild>
                <span className="cursor-pointer hover:underline text-sm text-gray-600">
                  Edit
                </span>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reply Ariel </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-y-2">
                  <Label className="text-sm" htmlFor="message">
                    Message :
                  </Label>
                  <Textarea id="message" />
                </div>
              </DialogContent>
            </Dialog>
            <span
              className="flex select-none cursor-pointer hover:underline text-sm text-gray-600"
              onClick={() => setOpen(!open)}
            >
              Show reply{" "}
              <ChevronDown
                className={cn("transition-all", {
                  "rotate-180": open,
                })}
              />
            </span>
          </div>
          <div
            className={cn(
              "mt-2 relative text-sm -z-10 -translate-y-10 opacity-0 hidden transition-all ease-in-out text-end",
              {
                "translate-y-0 opacity-100 block": open,
              }
            )}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
            blanditiis a quos dolore numquam accusamus perferendis animi dolorum
            illum fugit.
          </div>
        </div>
        <div className="flex flex-col items-start gap-y-2">
          <div className="flex items-center gap-x-1">
            <Image
              src={"/img/prof.jpg"}
              width={40}
              height={40}
              alt="Profile user"
              className="rounded-full"
            />
            <span className="text-lg font-semibold">Ariel</span>
          </div>
          <div className="flex items-center gap-x-2">
            <div className="flex items-center gap-x-1">
              <Star className="text-[#ffc400]" size={18} fill="#ffc400" />
              <Star className="text-[#ffc400]" size={18} fill="#ffc400" />
              <Star className="text-[#ffc400]" size={18} fill="#ffc400" />
              <Star className="text-[#ffc400]" size={18} fill="#ffc400" />
              <Star className="text-[#ffc400]" size={18} fill="#ffc400" />
            </div>
            <span className="font-semibold text-gray-500">1 hari lalu</span>
          </div>
          <p className="my-1">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>

          <Dialog>
            <DialogTrigger asChild>
              <span className="cursor-pointer hover:underline text-sm text-gray-600">
                Reply
              </span>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Reply Ariel</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-y-2">
                <Label className="text-sm" htmlFor="message">
                  Message :
                </Label>
                <Textarea id="message" />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
