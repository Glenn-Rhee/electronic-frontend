"use client";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Image, Loader2, MousePointerSquareDashed } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import ImageUser from "../ImageUser";
import { useUploadThing } from "@/utils/uploadthing";
import ErrorFile from "../settings/personal/ErrorFile";
import { DataProduct } from "../DialogBody";

interface UploadImageProps {
  imageUrl: string;
  setImageUrl: Dispatch<SetStateAction<DataProduct>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export default function UploadImage(props: UploadImageProps) {
  const { imageUrl, setImageUrl, setLoading } = props;
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [errorFile, setErrorFile] = useState<
    undefined | { title: string; description: string }
  >(undefined);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      setLoading(false);
      setImageUrl((prev) => ({
        ...prev,
        urlImage: data.url,
      }));
    },
    onUploadProgress(p) {
      setUploadProgress(p);
    },
  });

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;
    if (file.errors.some((err) => err.code.includes("large"))) {
      setErrorFile({
        title: "File is too large",
        description: "Please choose a file less than 1MB in size.",
      });
    } else if (file.errors.some((err) => err.code.includes("type"))) {
      setErrorFile({
        title: `${file.file.type} type is not supported!`,
        description: "Please choose a PNG, JPG, or JPEG image instead.",
      });
    } else {
      setErrorFile({
        title: "Something went wrong",
        description: "Please try again later.",
      });
    }

    setIsDragOver(false);
  };

  const onDropAccepted = (acceptedFiles: File[]) => {
    setLoading(true);
    startUpload(acceptedFiles);
    setFiles(acceptedFiles);
    setErrorFile(undefined);
    setIsDragOver(false);
  };

  return (
    <>
      {errorFile ? (
        <ErrorFile
          title={errorFile.title}
          description={errorFile.description}
        />
      ) : null}
      <div className="min-w-full flex justify-center items-center flex-col px-2 my-2">
        <Dropzone
          onDropAccepted={onDropAccepted}
          onDropRejected={onDropRejected}
          accept={{
            "image/png": [".png"],
            "image/jpeg": [".jpeg"],
            "image/jpg": [".jpg"],
          }}
          maxSize={1 * 1024 * 1024}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className="bg-gray-200 py-2 rounded-sm w-full flex-1 flex flex-col items-center justify-center"
              {...getRootProps()}
            >
              <Input {...getInputProps()} />
              {isDragOver ? (
                <MousePointerSquareDashed className="h-6 w-6 text-zinc-500 mb-2" />
              ) : isUploading ? (
                <Loader2 className="animate-spin h-6 w-6 text-zinc-500 mb-2" />
              ) : imageUrl === "" ? (
                // eslint-disable-next-line jsx-a11y/alt-text
                <Image className="h-6 w-6 text-zinc-500 mb-2" />
              ) : (
                <ImageUser src={imageUrl} size={50} />
              )}

              <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
                {files.length > 0 && !isUploading && imageUrl !== "" ? (
                  <div className="flex flex-col items-center">
                    <p>{files[0].name}</p>
                  </div>
                ) : isUploading ? (
                  <div className="flex flex-col items-center">
                    <p>Uploading...</p>
                    <Progress
                      value={uploadProgress}
                      className="mt-2 w-40 h-2 bg-gray-300"
                    />
                  </div>
                ) : isDragOver ? (
                  <p>
                    <span className="font-semibold">Drop file</span>
                    to upload
                  </p>
                ) : (
                  <p>
                    <span className="font-semibold">Click to upload </span>
                    or drag and drop
                  </p>
                )}
              </div>
              <p className="text-xs text-zinc-500">PNG, JPG, JPEG</p>
            </div>
          )}
        </Dropzone>
      </div>
    </>
  );
}
