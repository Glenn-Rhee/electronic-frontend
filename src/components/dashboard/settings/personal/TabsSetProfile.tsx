"use client";
import ShellProfile from "./ShellProfile";
import ProfileInfo from "./ProfileInfo";
import { Button } from "@/components/ui/button";
import { DataStore, DataUser } from "@/app/settings/personal/page";
import { useState } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import { Input } from "@/components/ui/input";
import { Image, Loader2, MousePointerSquareDashed } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useUploadThing } from "@/utils/uploadthing";
import ErrorFile from "./ErrorFile";
import ImageUser from "../../ImageUser";

interface TabsSetProfileProps {
  dataStore: DataStore;
  dataUser: DataUser;
}

export interface DataUserState {
  phone: string;
  email: string;
  address: string;
  sosmed: string;
  username: string;
  fullname: string;
  storeName: string;
  storeDescription: string;
  storeCategory: string;
  openStore: string;
  closeStore: string;
  bankName: string;
  accountNumber: string;
  urlImage: string;
}

export default function TabsSetProfile(props: TabsSetProfileProps) {
  const { dataStore, dataUser } = props;
  const [key, setKey] = useState<string>("");
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [errorFile, setErrorFile] = useState<
    | undefined
    | {
        title: string;
        description: string;
      }
  >(undefined);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadProgress, setUploaddProgress] = useState<number>(45);
  const [dataUserState, setDataUserState] = useState({
    phone: dataUser.phone,
    email: dataUser.email,
    address: dataUser.address,
    sosmed: dataUser.sosmed,
    username: dataUser.username,
    fullname: dataUser.fullname,
    storeName: Object.keys(dataStore).length > 0 ? dataStore.storeName : "",
    storeDescription:
      Object.keys(dataStore).length > 0 ? dataStore.storeDescription : "",
    storeCategory:
      Object.keys(dataStore).length > 0 ? dataStore.storeCategory : "",
    openStore: Object.keys(dataStore).length > 0 ? dataStore.openStore : "",
    closeStore: Object.keys(dataStore).length > 0 ? dataStore.closeStore : "",
    bankName: Object.keys(dataStore).length > 0 ? dataStore.bankName : "",
    accountNumber:
      Object.keys(dataStore).length > 0 ? dataStore.accountNumber : "",
    urlImage: Object.keys(dataStore).length > 0 ? dataStore.urlImage : "",
  });

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      setDataUserState({ ...dataUserState, urlImage: data.url });
      setKey(data.key);
    },
    onUploadProgress(p) {
      setUploaddProgress(p);
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
    startUpload(acceptedFiles);
    setFiles(acceptedFiles);
    setErrorFile(undefined);
    setIsDragOver(false);
  };

  async function handleSave() {
    const response = await fetch("/api/delete?key=" + key, {
      method: "DELETE",
    });

    await response.json();
    startUpload(files);
  }

  return (
    <div className="mt-4">
      <ShellProfile title="Contact">
        <ProfileInfo
          label="Phone"
          value={dataUserState}
          setValue={setDataUserState}
          isSet
        />
        <ProfileInfo
          label="Email"
          value={dataUserState}
          setValue={setDataUserState}
          isSet
        />
        <ProfileInfo
          label="Address"
          value={dataUserState}
          setValue={setDataUserState}
          isSet
        />
        <ProfileInfo
          label="Sosmed"
          value={dataUserState}
          setValue={setDataUserState}
          isSet
        />
      </ShellProfile>
      <ShellProfile title="Personal Identity">
        <ProfileInfo
          label="Username"
          value={dataUserState}
          isSet
          setValue={setDataUserState}
        />
        <ProfileInfo
          label="Fullname"
          value={dataUserState}
          isSet
          setValue={setDataUserState}
        />
      </ShellProfile>
      <ShellProfile title="Store Information">
        <ProfileInfo
          setValue={setDataUserState}
          label="Store Name"
          value={dataUserState}
          isSet
        />
        <ProfileInfo
          label="Store description"
          value={dataUserState}
          isSet
          setValue={setDataUserState}
        />
        <ProfileInfo
          setValue={setDataUserState}
          label="Store Category"
          value={dataUserState}
          isSet
        />
        <ProfileInfo
          setValue={setDataUserState}
          label="Operational Hours"
          value={dataUserState}
          isSet
        />
      </ShellProfile>
      {errorFile ? (
        <ErrorFile
          title={errorFile.title}
          description={errorFile.description}
        />
      ) : null}
      <div className="min-w-full flex justify-center items-center flex-col px-2 my-2">
        <Dropzone
          onDropRejected={onDropRejected}
          onDropAccepted={onDropAccepted}
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
              ) : dataUserState.urlImage === "" ? (
                // eslint-disable-next-line jsx-a11y/alt-text
                <Image className="h-6 w-6 text-zinc-500 mb-2" />
              ) : (
                <ImageUser src={dataUserState.urlImage} />
              )}

              <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
                {files.length > 0 && !isUploading ? (
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
      <ShellProfile title="Bank Account">
        <ProfileInfo
          setValue={setDataUserState}
          label="Bank Name"
          value={dataUserState}
          isSet
        />
        <ProfileInfo
          setValue={setDataUserState}
          label="Account Number"
          value={dataUserState}
          isSet
        />
      </ShellProfile>
      <div className="flex items-center px-2 justify-center">
        <Button className="w-full" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}
