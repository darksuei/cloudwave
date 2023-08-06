import Search from "./utils/Search";
import RecentUploads from "./utils/RecentUploads";
import DragDrop from "./utils/utils";

export default function Main() {
    return (
        <div className="flex flex-col w-7/12 py-7 items-center gap-y-7">
            <Search />
            <DragDrop />
            <RecentUploads />
        </div>
    )
}