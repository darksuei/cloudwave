import Search from "../Reusable/Search";
import Recent from "../Reusable/Recent";
import SharedFiles from "./SharedFiles";

export default function SharedMain(){
    return (
        <div className="flex flex-col w-10/12 items-center p-8 gap-y-4">
            <Search />
            {/* <SharedFiles /> */}
            <Recent 
            title={"Shared"}/>
        </div>
    )
}