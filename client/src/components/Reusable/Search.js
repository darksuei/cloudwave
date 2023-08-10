import '../../index.css'

export default function Search(){
    return(
        <div className="bg-white w-10/12 flex flex-row gap-x-0.5 items-center justify-center rounded-3xl border-gray-300 hover:shadow-md" >
            <i className="fa fas fa-search text-gray-400 text-lg cursor-pointer" aria-hidden="true"></i>
            <input type="text" className="w-11/12 h-10 px-2 focus:outline-none" placeholder="Search" />
        </div>
    )
}