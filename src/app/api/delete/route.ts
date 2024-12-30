import { NextRequest, NextResponse } from "next/server";
import { UploadThingError } from "uploadthing/server";
import { UTApi } from "uploadthing/server";

export async function DELETE(req: NextRequest) {
  try {
    const key = req.nextUrl.searchParams.get("key");
    if (!key) {
      throw new Error("key is required");
    }

    const utapi = new UTApi();
    const response = await utapi.deleteFiles(key);

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ status: "failed", message: error.message });
    } else if (error instanceof UploadThingError) {
      return NextResponse.json({ status: "failed", message: error.message });
    } else {
      return NextResponse.json({
        status: "failed",
        message: "Internal server error",
      });
    }
  }
}
