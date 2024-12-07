import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TabsAboutme from "./TabsAboutme";
import TabsSetProfile from "./TabsSetProfile";
import { DataStore, DataUser } from "@/app/settings/personal/page";

interface MainProfileProps {
  dataUser: DataUser;
  dataStore: DataStore;
}

export default function MainProfile(props: MainProfileProps) {
  const { dataUser, dataStore } = props;
  return (
    <>
      <h5 className="text-lg font-semibold">Personal Information</h5>
      <Tabs defaultValue="aboutme" className="w-full mt-3">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger
            value="aboutme"
            className="data-[state=active]:bg-slate-800 data-[state=active]:text-white"
          >
            About Me
          </TabsTrigger>
          <TabsTrigger
            value="setprofile"
            className="data-[state=active]:bg-slate-800 data-[state=active]:text-white"
          >
            Set Profile
          </TabsTrigger>
        </TabsList>
        <TabsContent value="aboutme" className="">
          <TabsAboutme dataUser={dataUser} dataStore={dataStore} />
        </TabsContent>
        <TabsContent value="setprofile">
          <TabsSetProfile dataStore={dataStore} />
        </TabsContent>
      </Tabs>
    </>
  );
}
