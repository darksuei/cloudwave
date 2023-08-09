import UploadFiles from "./UploadFiles"
import UploadProgress from "./UploadProgress"

export default function UploadMain (){
    return (
        <div className="w-10/12 flex flex-col gap-y-5 bg-slate-200 items-center p-10">
            <UploadFiles />
            <UploadProgress />
        </div>
    )
}