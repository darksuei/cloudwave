import LeftSideBar from "./Reusable/LeftSideBar";
import UserInfo from "./Settings/UserInfo";
import Theme from "./Settings/Theme";
export default function Settings (){
    return(
        <div className="flex flex-row w-full bg-slate-200">
            <LeftSideBar/>
            <div className="flex flex-col w-10/12">
                <UserInfo/>
                <Theme/>
            </div>
        </div>
    )
}