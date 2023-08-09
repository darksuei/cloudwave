export default function SharedFiles (){
    const files = [{id:1, title: "Memes", noOfFiles: 213}, {id:2, title: "Vacation Photos", noOfFiles: 16}, {id:3, title: "My Projects", noOfFiles: 34}]
    return(
        <div className="flex flex-col w-full">
            <h2 className="text-blue-700 text-xl font-black">Shared Files</h2>
                <div className="flex flex-row gap-x-2.5 w-full bg-red-500">
                    {files.map( file => {
                        return <div className='bg-white rounded-lg' key={file.id}>{file.title}</div>
                    })}
                </div>
        </div>
    )
}