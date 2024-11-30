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
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export default function LoginForm({ xtr }: { xtr: string | undefined }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
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
      setIsLoading(false);
      if (error instanceof Error) {
        toast({
          title: "Error!",
          description: error.message as string,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error!",
          description: "An unknown error occurred.",
          variant: "destructive",
        });
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
