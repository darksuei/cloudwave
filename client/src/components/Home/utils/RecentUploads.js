import data from '../../../data';


export default function RecentUploads(){
    return(
        <div className=' flex gap-y-4 flex-col p-12 py-4 w-full'>
            <h1 className='text-blue-700 text-2xl font-extrabold'>Recent Uploads</h1>
            <div className='flex flex-col gap-y-2.5'>
            {Object.values(data).map((item) => {
                return(
                    <div className='flex flex-row bg-white p-2.5 rounded-xl items-center gap-x-1.5 pr-4 relative'>
                        <div className='bg-indigo-500 p-2 rounded-lg w-9 h-9 flex items-center justify-center'><i className="fas fa-image text-white text-sm"></i></div>
                        <div className='flex flex-row w-9/12 justify-between items-center'>
                            <h2 className='w-4/12 p-2'>{item.image}</h2>
                            <p className='text-gray-400 text-sm'>{item.when}</p>
                            <div><i className="fas fa-share-alt text-indigo-500 cursor-pointer"></i></div>
                        </div>
                        <div className='absolute right-5'><i className="fas fa-ellipsis-h text-indigo-500 cursor-pointer text-lg"></i></div>
                    </div>
                )
            })}
            </div>
        </div>
    )
}