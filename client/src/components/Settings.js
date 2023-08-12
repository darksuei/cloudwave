import LeftSideBar from "./Reusable/LeftSideBar";
import UserInfo from "./Settings/UserInfo";

export default function Settings (){
    return(
        <div className="flex flex-row w-full">
            <LeftSideBar/>
            <div className="flex flex-col w-10/12">
                <UserInfo/>
            </div>
        </div>
    )
}