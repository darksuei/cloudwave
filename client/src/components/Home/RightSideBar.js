import Storage from "./utils/Storage"
import { Categories } from "./utils/utils"
export default function RightSideBar() {
    return (
        <div className="flex flex-col bg-white rounded-3xl w-3/12 my-5 items-center p-4 mr-3 gap-y-3">
            <Storage />
            <Categories />
        </div>
    )
}
