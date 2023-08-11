import LeftSideBar from "./Reusable/LeftSideBar";
import UploadMain from "./Uploads/UploadMain";

export default function Uploads (){
    return(
        <div className="flex flex-row bg-slate-200">
            <LeftSideBar/>
            <UploadMain />
        </div>
    )
}