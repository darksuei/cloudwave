export default function DragDrop(){
    return(
        <div className='flex flex-col w-9/12 py-11 items-center bg-white border-dashed border-2 border-indigo-500 cursor-pointer'>
            <div className='flex flex-col justify-center items-center gap-y-4'>
                <i className="fas fa-upload text-indigo-500 text-3xl"></i>
                <p className='text-gray-400 text-sm text-indigo-500'>Drag and drop files here</p>
            </div>
        </div>
    )
}

export function Avatar (){
    return(
        <div className='flex justify-center items-center py-5'>
            <i className="fas fa-user-circle text-6xl bg-slate-300 text-white"></i>
        </div>    
    )
}