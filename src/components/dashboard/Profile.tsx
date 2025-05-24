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
import { DataStore, ResponseDefault } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useXtr } from "@/lib/store/xtrStore";
import { useUrlStore } from "@/lib/store/urlStore";
import { toast } from "sonner";

interface ProfileProps {
  xtr: string | undefined;
}

export default function Profile(props: ProfileProps) {
  const { xtr } = props;
  const router = useRouter();
  const [dataStore, setDataStore] = useState<DataStore | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { urlImage } = useUrlStore();
  const { setXtr } = useXtr();

  useEffect(() => {
    if (xtr) {
      const getInfo = async () => {
        setIsLoading(true);
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
              description: "Internal server Error!",
            });
          }
        }
      };

      getInfo();
    }
  }, [xtr, setXtr, urlImage]);

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

      toast.success("Success!", {
        richColors: true,
        duration: 1000,
        description: dataResponse.message,
      });

      router.push("/auth/login");
    } catch (error) {
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
          description: "Internal server Error!",
        });
      }
    }
  }
  return (
    <div className="mx-auto">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-fit w-fit mb-2">
            {
              isLoading ? (
                <LoaderCircle className="animate-spin" size={50} />
              ) : dataStore && Object.keys(dataStore).length === 0 ? (
                <div className="rounded-full bg-gray-400 flex items-center justify-center p-4">
                  <User size={50} color="white" />
                </div>
              ) : dataStore ? (
                <Avatar className="shadow-lg shadow-black/25">
                  <AvatarImage src={dataStore.urlImage} />
                  <AvatarFallback>
                    {dataStore.storeName.split(" ")[0][0].toUpperCase() +
                      dataStore.storeName.split(" ")[0][0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              ) : (
                <div className="w-6 aspect-square">
                  <LoaderCircle className="animate-spin" size={30} />
                </div>
              )
              // )
            }
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
