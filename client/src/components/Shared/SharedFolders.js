export default function SharedFolders (){
    return (
        <div className="flex flex-col w-11/12 gap-y-5">
            <h1 className='text-blue-700 text-xl font-extrabold'>Shared Folders</h1>
            <div className="w-full">
                <div className="flex p-5 flex-col gap-y-2 w-fit hover:bg-gray-300 rounded-lg hover:border cursor-pointer">
                    <i className="fas fa-folder-open fa-4x text-indigo-500"></i>
                    <h2 className="text-gray-500 text-sm">Yesterday</h2>
                </div>
            </div>
        </div>
    )
}