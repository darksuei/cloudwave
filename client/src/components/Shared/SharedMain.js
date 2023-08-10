import Search from "../Reusable/Search";
import Recent from "../Reusable/Recent";
import SharedFiles from "./SharedFiles";
import SharedFolders from "./SharedFolders";

export default function SharedMain(){
    return (
        <div className="flex flex-col w-10/12 items-center p-8 gap-y-4">
            <Search />
            {/* <SharedFiles /> */}
            <SharedFolders />
            <Recent 
            title={"Shared"}/>
        </div>
    )
}