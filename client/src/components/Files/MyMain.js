import Search from "../Reusable/Search";
import Recent from "../Reusable/Recent";
import MyFolders from "./MyFolders";
import "../../index.css";

export default function SharedMain() {
  return (
    <div className="flex flex-col w-full md:w-10/12 items-center py-4 px-2 md:px-8 gap-y-4 relative min-h-screen">
      <Search />
      <MyFolders />
      <div className="w-full">
        <Recent
          title={"Recent Files"}
          padding={"px-2"}
          headerPadding={"pl-2 md:pl-0"}
        />
      </div>
    </div>
  );
}
