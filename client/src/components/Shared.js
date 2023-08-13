import LeftSideBar from "./Reusable/LeftSideBar";
import SharedMain from "./Shared/SharedMain";
import { useContext } from "react";
import { LocationContext } from "../Contexts/LocationContext";

export default function Shared (){
    const Location = useContext(LocationContext);
    Location.setLocation('shared');
    return(
        <div className="flex flex-row bg-slate-200 w-full">
            <LeftSideBar/>
            <SharedMain />
        </div>
    )
}