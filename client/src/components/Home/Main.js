import Search from "./Search";
import RecentUploads from "./RecentUploads";
import DragDrop from "./Minor";

export default function Main() {
    return (
        <div className="flex flex-col w-7/12 py-7 items-center gap-y-7">
            <Search />
            <DragDrop />
            <RecentUploads />
        </div>
    )
}