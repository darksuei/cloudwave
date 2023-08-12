import Search from "../Reusable/Search";
import Recent from "../Reusable/Recent";
import DragDrop from "../Reusable/utils";

export default function Main() {
    return (
        <div className="flex flex-col w-7/12 py-7 items-center gap-y-7">
            <Search />
            <DragDrop />
            <Recent 
            title={"Recently Uploaded"}/>
        </div>
    )
}