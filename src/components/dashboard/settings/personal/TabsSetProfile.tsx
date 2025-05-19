"use client";
import ShellProfile from "./ShellProfile";
import ProfileInfo from "./ProfileInfo";
import { Button } from "@/components/ui/button";
import { DataStore, DataUser } from "@/app/settings/personal/page";
import { useEffect, useState } from "react";
import Dropzone, { FileRejection } from "react-dropzone";
import { Input } from "@/components/ui/input";
import { Image, Loader2, MousePointerSquareDashed } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useUploadThing } from "@/utils/uploadthing";
import ErrorFile from "./ErrorFile";
import ImageUser from "../../ImageUser";
import { Label } from "@/components/ui/label";
import InputPhone from "../../InputPhone";
import { useXtr } from "@/lib/store/xtrStore";
import { ResponseDefault } from "@/types";
import { useRouter } from "next/navigation";
import { useUrlStore } from "@/lib/store/urlStore";
import { toast } from "sonner";

interface TabsSetProfileProps {
  dataStore: DataStore;
  dataUser: DataUser;
}

export interface DataUserState {
  phone: string;
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
  city: string;
  zipCode: string;
}

export default function TabsSetProfile(props: TabsSetProfileProps) {
  const { dataStore, dataUser } = props;
  const { xtr } = useXtr();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
  const [dataUserState, setDataUserState] = useState<DataUserState>({
    phone: dataUser.phone.split("62")[1],
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
    city: Object.keys(dataStore).length > 0 ? dataStore.city : "",
    zipCode: Object.keys(dataStore).length > 0 ? dataStore.zipCode : "",
  });
  const { setUrlImage } = useUrlStore();

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      setDataUserState({ ...dataUserState, urlImage: data.url });
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
    setIsLoading(true);
    try {
      for (const key in dataUserState) {
        if (dataUserState[key as keyof typeof dataUserState] === "") {
          const title = key.includes("url") ? "Image" : key;
          throw new Error("Please fill " + title + " field properly");
        }
      }

      const { storeCategory, phone, ...rest } = dataUserState;

      const data: DataUserState = {
        ...rest,
        phone: "+62" + phone,
        storeCategory: storeCategory.toUpperCase(),
      };
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/store",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: xtr || "",
          },
          credentials: "include",
          body: JSON.stringify(data),
        }
      );

      setUrlImage(data.urlImage);

      const dataResponse = (await response.json()) as ResponseDefault;
      if (dataResponse.status === "failed") {
        if(dataResponse.error) {
          throw new Error(dataResponse.error)
        }

        throw new Error(dataResponse.message);
      }

      toast.success("Success!", {
        richColors: true,
        duration: 1000,
        description: "Your profile has been updated.",
      });

      setIsLoading(false);

      router.refresh();
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
          description: "An error occurred",
        });
      }

      setIsLoading(false);
    }
  }

  useEffect(() => {
    const regex = /[^0-9]/g;
    if (regex.test(dataUserState.phone)) {
      setDataUserState((prev) => ({
        ...prev,
        phone: dataUserState.phone.replace(regex, ""),
      }));
    }
  }, [dataUserState.phone, setDataUserState]);

  useEffect(() => {
    const regex = /[^0-9:]/g;

    if (regex.test(dataUserState.openStore)) {
      const arrayOpenStore = dataUserState.openStore.split(":");
      if (arrayOpenStore.length > 1) {
        setDataUserState((prev) => ({
          ...prev,
          openStore: dataUserState.openStore.replace(
            regex,
            `${+arrayOpenStore[0] ? arrayOpenStore[0] : ""}:${
              +arrayOpenStore[1] ? arrayOpenStore[1] : ""
            }`
          ),
        }));
      } else {
        setDataUserState((prev) => ({
          ...prev,
          openStore: dataUserState.openStore.replace(regex, ""),
        }));
      }
    }

    const [hour, minute] = dataUserState.openStore.split(":");

    if (hour.length === 1) {
      if (+hour > 2) {
        setDataUserState((prev) => ({
          ...prev,
          openStore: "0" + hour + ":" + minute,
        }));
      }
    } else {
      if (+hour > 23) {
        const temporary = +hour - 23;
        setDataUserState((prev) => ({
          ...prev,
          openStore: `0${temporary - 1}:` + minute,
        }));
      }
    }

    if (dataUserState.openStore.includes(":")) {
      if (minute.length === 1) {
        if (+minute > 5) {
          setDataUserState((prev) => ({
            ...prev,
            openStore: hour + ":0" + minute,
          }));
        }
      }
    }
  }, [dataUserState.openStore]);

  useEffect(() => {
    const regex = /[^0-9:]/g;
    if (regex.test(dataUserState.closeStore)) {
      const arrayCloseStore = dataUserState.closeStore.split(":");
      if (arrayCloseStore.length > 1) {
        setDataUserState((prev) => ({
          ...prev,
          closeStore: dataUserState.closeStore.replace(
            regex,
            `${+arrayCloseStore[0] ? arrayCloseStore[0] : ""}:${
              +arrayCloseStore[1] ? arrayCloseStore[1] : ""
            }`
          ),
        }));
      } else {
        setDataUserState((prev) => ({
          ...prev,
          closeStore: dataUserState.closeStore.replace(regex, ""),
        }));
      }
    }

    const [hour, minute] = dataUserState.closeStore.split(":");

    if (hour.length === 1) {
      if (+hour > 2) {
        setDataUserState((prev) => ({
          ...prev,
          closeStore: "0" + hour + minute,
        }));
      }
    } else {
      if (+hour > 23) {
        const temporary = +hour - 23;
        setDataUserState((prev) => ({
          ...prev,
          closeStore: `0${temporary - 1}:${minute}`,
        }));
      }
    }

    if (dataUserState.closeStore.includes(":")) {
      if (minute.length === 1) {
        if (+minute > 5) {
          setDataUserState((prev) => ({
            ...prev,
            closeStore: hour + ":0" + minute,
          }));
        }
      }
    }
  }, [dataUserState.closeStore]);

  useEffect(() => {
    const regex = /[^0-9]/g;

    if (regex.test(dataUserState.accountNumber)) {
      setDataUserState((prev) => ({
        ...prev,
        accountNumber: dataUserState.accountNumber.replace(regex, ""),
      }));
    }
  }, [dataUserState.accountNumber]);

  return (
    <div className="mt-4">
      <ShellProfile title="Contact">
        <div className="flex flex-col">
          <Label className="text-sm text-gray-500" htmlFor="phone">
            Phone
          </Label>
          <InputPhone className="mt-1">
            <Input
              id="phone"
              className="border border-none focus:ring-0 focus-visible:ring-0 focus:outline-none focus:border-none placeholder:text-sm placeholder:text-gray-600"
              type="text"
              maxLength={13}
              value={dataUserState.phone}
              onChange={(e) =>
                setDataUserState({ ...dataUserState, phone: e.target.value })
              }
            />
          </InputPhone>
        </div>
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
        <ProfileInfo
          label="City"
          value={dataUserState}
          setValue={setDataUserState}
          isSet
        />
        <ProfileInfo
          label="Zip Code"
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
        <Button
          disabled={isLoading || isUploading}
          className="w-full"
          onClick={handleSave}
        >
          {isLoading || isUploading ? (
            <Loader2 className="text-white animate-spin" />
          ) : (
            "Save"
          )}
        </Button>
      </div>
    </div>
  );
}
