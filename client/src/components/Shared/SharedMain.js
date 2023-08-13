import Search from "../Reusable/Search";
import Recent from "../Reusable/Recent";
import SharedFolders from "./SharedFolders";
import '../../index.css'

export default function SharedMain(){
    return (
        <div className="flex flex-col w-10/12 items-center p-8 gap-y-4 relative">
            <Search />
            <SharedFolders />
            <div className="w-full">
                <Recent 
                title={"Shared Recently"}
                />
            </div>
        </div>
    )
}