"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import AuthAction from "./AuthAction";
import { useState } from "react";
import { ResponseDefault } from "@/types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export default function LoginForm({ xtr }: { xtr: string | undefined }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/user/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: xtr!,
          },
          body: JSON.stringify(values),
          credentials: "include",
        }
      );

      const dataResponse = (await response.json()) as ResponseDefault;
      if (dataResponse.status === "failed") {
        if (dataResponse.statusCode === 402) {
          toast.error("Error", {
            richColors: true,
            duration: 1000,
            description: dataResponse.message as string,
          });

          router.push("/");
        }
        throw new Error(dataResponse.message);
      }

      toast.success("Success!", {
        richColors: true,
        duration: 1000,
        description: dataResponse.message,
      });

      router.push("/");
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) {
        toast.error("Error", {
          richColors: true,
          duration: 1000,
          description: error.message,
        });
      } else {
        toast.error("Error", {
          richColors: true,
          duration: 1000,
          description: "An error occurred",
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} method="POST">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@gmail.com"
                    type="text"
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
                  <Input placeholder="**********" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <AuthAction
          href="/auth/signup"
          textGoTo="Don't have an account?"
          isLoading={isLoading}
        >
          Login
        </AuthAction>
      </form>
    </Form>
  );
}
