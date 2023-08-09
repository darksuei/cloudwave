import Storage from "../Reusable/Storage"
import { Categories } from "../Reusable/utils"
export default function RightSideBar() {
    return (
        <div className="flex flex-col bg-white rounded-3xl w-3/12 my-5 items-center p-5 mr-3 gap-y-4 h-fit">
            <Storage />
            <Categories />
        </div>
    )
}
