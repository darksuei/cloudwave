export default function UploadFiles(){
    return (
        <div className="flex flex-col p-4 items-center bg-white w-7/12 rounded-lg gap-y-5">
            <h1 className="text-2xl text-blue-500 font-black py-2">Upload Files</h1>
            <div className='flex flex-col w-11/12 py-11 items-center bg-slate-200 rounded-lg cursor-pointer'>
                <div className='flex flex-col justify-center items-center gap-y-7 text-blue-500 '>
                    <i className="fas fa-cloud-upload-alt text-4xl"></i>
                    <div className="flex flex-col gap-y-2.5 items-center">
                        <p className='text-sm font-extrabold'>Drag and drop your files here</p>
                        <p className="text-xs text-gray-500">or</p>
                        <button className="text-sm border-current border py-2.5 px-7 rounded-lg hover:bg-blue-500 hover:text-white">Choose a file from your computer</button>
                    </div>
                </div>
            </div>
        </div>
    )
}