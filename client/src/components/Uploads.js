import LeftSideBar from "./Reusable/LeftSideBar";
import UploadMain from "./Uploads/UploadMain";
import { useContext } from "react";
import { LocationContext } from "../Contexts/LocationContext";

export default function Uploads (){
    const Location = useContext(LocationContext);
    Location.setLocation('upload');
    
    return(
        <div className="flex flex-row bg-slate-200">
            <LeftSideBar/>
            <UploadMain />
        </div>
    )
}