import LeftSideBar from "./Reusable/LeftSideBar";
import FavMain from "./Favorites/FavMain";

export default function Favorites (){
    return(
        <div className="flex flex-row bg-slate-200">
            <LeftSideBar
            activePage={'favorites'}/>
            <FavMain/>
        </div>
    )
}