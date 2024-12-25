"use client";
import { LoaderCircle, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { DataStore, ResponseDefault } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useXtr } from "@/lib/store/xtrStore";
import { useUrlStore } from "@/lib/store/urlStore";

interface ProfileProps {
  xtr: string | undefined;
}

export default function Profile(props: ProfileProps) {
  const { xtr } = props;
  const { toast } = useToast();
  const router = useRouter();
  const [dataStore, setDataStore] = useState<DataStore | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { urlImage } = useUrlStore();
  const { setXtr } = useXtr();

  useEffect(() => {
    if (xtr) {
      const getInfo = async () => {
        try {
          setXtr(xtr);
          const response = await fetch(
            process.env.NEXT_PUBLIC_BASE_URL + "/store",
            {
              method: "GET",
              credentials: "include",
              headers: {
                Authorization: xtr || "",
              },
            }
          );

          const dataResponse = (await response.json()) as ResponseDefault;
          if (dataResponse.status === "failed") {
            throw new Error(dataResponse.message);
          }
          setDataStore(dataResponse.data);
          setIsLoading(false);
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
              description: "Internal server Error!",
              variant: "destructive",
            });
          }
        }
      };

      getInfo();
    }
  }, [xtr, toast, setXtr, urlImage]);

  async function logout() {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/user", {
        method: "DELETE",
        credentials: "include",
      });

      const dataResponse = (await response.json()) as ResponseDefault;
      if (dataResponse.status === "failed") {
        throw new Error(dataResponse.message);
      }

      localStorage.removeItem("first");

      toast({
        title: "Sucess!",
        description: dataResponse.message,
        variant: "default",
      });

      router.push("/auth/login");
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
          description: "Internal server Error!",
          variant: "destructive",
        });
      }
    }
  }
  return (
    <div className="mx-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-fit w-fit mb-2">
            {isLoading ? (
              <LoaderCircle className="animate-spin" size={50} />
            ) : dataStore && Object.keys(dataStore).length === 0 ? (
              <div className="rounded-full bg-gray-400 flex items-center justify-center p-4">
                <User size={50} color="white" />
              </div>
            ) : (
              dataStore &&
              Object.keys(dataStore).length > 0 && (
                <Avatar className="shadow-lg shadow-black/25">
                  <AvatarImage src={dataStore.urlImage} />
                  <AvatarFallback>
                    {dataStore.storeName.split(" ")[0][0].toUpperCase() +
                      dataStore.storeName.split(" ")[0][0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <button
              className="flex justify-center items-center"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
