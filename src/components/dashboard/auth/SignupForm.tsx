"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { parsePhoneNumberFromString } from "libphonenumber-js";

import SubTitle from "@/components/dashboard/auth/SubTitle";
import AuthAction from "./AuthAction";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { ResponseDefault } from "@/types";
import { useRouter } from "next/navigation";
import InputPhone from "../InputPhone";

const formSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Username must be at least 5 characters" }),
  fullname: z.string(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  confirmPassword: z.string(),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 " })
    .refine((value) => {
      const phoneNumber = parsePhoneNumberFromString("+62" + value);
      return phoneNumber && phoneNumber.isValid();
    }),
  dateOfBirth: z.string().date("Invalid date of birth"),
});

export default function SignupForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      dateOfBirth: "",
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [gender, setGender] = useState<"MALE" | "FEMALE" | "">("");
  const router = useRouter();

  const date = form.watch("dateOfBirth");
  const phone = form.watch("phone");
  const { toast } = useToast();

  useEffect(() => {
    const regex = /[^0-9-]/g;
    if (regex.test(date)) {
      form.setValue("dateOfBirth", date.replace(regex, ""));
    }

    if (date.length === 5 && !date.endsWith("-")) {
      const year = date.slice(0, 4);
      const result = date.charAt(date.length - 1);
      form.setValue("dateOfBirth", year + "-" + result);
    }

    if (date.length === 8 && !date.endsWith("-")) {
      const year = date.slice(0, 7);
      const result = date.charAt(date.length - 1);
      form.setValue("dateOfBirth", year + "-" + result);
    }

    if (date.length !== 5 && date.length !== 8 && date.endsWith("-")) {
      form.setValue("dateOfBirth", date.slice(0, -1));
    }
  }, [date, form]);

  useEffect(() => {
    const regex = /[^0-9]/g;
    if (regex.test(phone)) {
      form.setValue("phone", phone.replace(regex, ""));
    }
  }, [phone, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      console.log(values);
      const ismatch = values.password === values.confirmPassword;
      if (!ismatch) {
        throw new Error("Password doesn't match!");
      }
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL! + "/user/auth/signup?from=dashboard",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullname: values.fullname,
            gender,
            phone: "+62" + values.phone,
            username: values.username,
            email: values.email,
            password: values.password,
            dateOfBirth: values.dateOfBirth,
          }),
          credentials: "include",
        }
      );

      const dataResponse = (await response.json()) as ResponseDefault;

      if (dataResponse.status === "failed") {
        if (
          dataResponse.statusCode === 402 ||
          dataResponse.message.includes("loged")
        ) {
          toast({
            title: "Error!",
            description: dataResponse.message as string,
            variant: "destructive",
          });

          router.push("/");
        }
        throw new Error(dataResponse.message);
      }

      toast({
        title: "Success!",
        description: dataResponse.message,
        variant: "default",
      });

      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error!",
          description: error.message as string,
          variant: "destructive",
        });
      } else {
        console.log(error);
        toast({
          title: "Error!",
          description: "An unknown error occurred.",
          variant: "destructive",
        });
      }

      setIsLoading(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 ">
        <div className="space-y-1">
          <SubTitle>Personal Identity</SubTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fullname</FormLabel>
                  <FormControl>
                    <Input placeholder="Jake Smith" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-2">
              <span className="text-sm">Gender</span>
              <Select
                onValueChange={(val) => {
                  setGender(val.toUpperCase() as "MALE" | "FEMALE" | "");
                }}
              >
                <SelectTrigger className="text-gray-500">
                  <SelectValue placeholder="Select your gender" />
                </SelectTrigger>
                <SelectContent className="text-gray-500">
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl className="flex items-center gap-x-4">
                    <Input
                      inputMode="numeric"
                      type="text"
                      placeholder="YYYY-MM-DD"
                      maxLength={10}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <InputPhone>
                      <Input
                        inputMode="numeric"
                        className="border-none focus:border-none focus:ring-0 focus:outline-none focus-visible:ring-0 px-1"
                        placeholder="812345678"
                        maxLength={13}
                        {...field}
                        type="text"
                      />
                    </InputPhone>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-1">
          <SubTitle>Security Account</SubTitle>
          <div className="">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="JakeSmith" type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@gmail.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="**********"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmation Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="**********"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <AuthAction
          href="/auth/login"
          textGoTo="Already have an account?"
          isLoading={isLoading}
        >
          Signup
        </AuthAction>
      </form>
    </Form>
  );
}
