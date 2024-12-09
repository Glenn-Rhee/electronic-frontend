import { DataUser } from "@/app/settings/personal/page";
import { ResponseDefault } from "@/types";
import { cookies } from "next/headers";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";

const f = createUploadthing();
async function auth(): Promise<{
  id: string | null;
  status: string;
  message: string;
}> {
  const xtr = cookies().get("xtr")?.value;
  if (!xtr) {
    return { id: null, status: "failed", message: "Unathorize" };
  }

  const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/user", {
    method: "GET",
    credentials: "include",
    headers: {
      Authorization: xtr || "",
    },
  });

  const dataResponse = (await response.json()) as ResponseDefault;
  if (dataResponse.status === "failed") {
    return {
      id: null,
      status: dataResponse.status,
      message: dataResponse.message,
    };
  }

  const data = dataResponse.data as DataUser;
  return {
    id: data.id,
    status: "success",
    message: "Successfully",
  };
}

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "1MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({}) => {
      const user = await auth();

      if (user.status === "failed") throw new UploadThingError("Unauthorized");

      return { id: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      const url = file.url;

      return { id: metadata.id, url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
