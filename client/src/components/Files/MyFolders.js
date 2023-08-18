export default function MyFolders (){
    return (
        <div className="flex flex-col w-11/12 gap-y-5">
            <h1 className='text-blue-700 text-xl font-extrabold'>My Folders</h1>
            <div className="w-full">
                <a href="/files" className="flex p-5 px-6 flex-col gap-y-2 w-fit hover:bg-gray-300 rounded-lg hover:border cursor-pointer">
                    <i className="fas fa-folder-open fa-4x text-indigo-500"></i>
                    <h2 className="text-gray-500 text-sm">My files</h2>
                </a>
            </div>
        </div>
    )
}