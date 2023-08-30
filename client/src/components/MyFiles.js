import LeftSideBar from "./Reusable/LeftSideBar";
import MyMain from "./Files/MyMain";
import { useContext } from "react";
import { LocationContext } from "../Contexts/LocationContext";

export default function MyFiles (){
    const Location = useContext(LocationContext);
    Location.setLocation('shared');
    
    return(
        <div className="flex flex-row bg-slate-200 w-full min-h-screen">
            <LeftSideBar/>
            <MyMain />
        </div>
    )
}