import LeftSideBar from "./Reusable/LeftSideBar"
import Recent from "./Reusable/Recent"
import Search from "./Reusable/Search"
import { useContext } from "react"
import { LocationContext } from "../Contexts/LocationContext"

export default function Files(props) {
    const { category } = props;
    const Location = useContext(LocationContext);
    Location.setLocation('files');

    return (
        <div className="flex flex-row w-full bg-slate-200 justify-center min-h-screen" >
            <LeftSideBar/>
            <div className="flex flex-col w-10/12 py-8 items-center relative">
                <Search/>
                <div className="w-full min-h-full">
                    <Recent title={'All Files'}
                        showAll = {true}
                        category = {category}/>
                </div>
            </div>
        </div>
    )
}