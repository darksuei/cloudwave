import Search from "../Reusable/Search";
import Recent from "../Reusable/Recent";
import MyFolders from "./MyFolders";
import '../../index.css'

export default function SharedMain(){
    return (
        <div className="flex flex-col w-10/12 items-center p-8 gap-y-4 relative">
            <Search />
            <MyFolders />
            <div className="w-full">
                <Recent 
                title={"Files"}/>
            </div>
        </div>
    )
}