import LeftSideBar from "./Home/LeftSideBar";
import Search from "./Home/utils/Search";

export default function Settings (){
    return(
        <div className="flex flex-row bg-slate-200">
            <LeftSideBar/>
            <Search />
        </div>
    )
}