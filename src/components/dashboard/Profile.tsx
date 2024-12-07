"use client";
import { LogOut, User } from "lucide-react";
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
import { ResponseDefault } from "@/types";
import { useRouter } from "next/navigation";
import { DataStore } from "@/app/settings/personal/page";

interface ProfileProps {
  dataStore: DataStore;
}

export default function Profile(props: ProfileProps) {
  const { dataStore } = props;
  const { toast } = useToast();
  const router = useRouter();

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
            {Object.keys(dataStore).length === 0 ? (
              <div className="rounded-full bg-gray-400 flex items-center justify-center p-4">
                <User size={50} color="white" />
              </div>
            ) : (
              <Avatar className="shadow-lg shadow-black/25">
                <AvatarImage src={dataStore.urlImage} />

                <AvatarFallback>
                  {dataStore.storeName.split(" ")[0][0].toUpperCase() +
                    dataStore.storeName.split(" ")[0][0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
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
