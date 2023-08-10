import { useState,useEffect } from "react"

export default function FavFiles(){
    const [fileUrl,setFileUrl] = useState([])
    useEffect(() => {
        let imgUrls = [];
        const fetchImgUrls = async () => {
            try{
                for(let i=0;i<8;i++){
                    let response = await fetch("https://picsum.photos/200/300");
                    imgUrls.push(response.url);
                }
            }catch(err){
                console.error(err);
            }
            setFileUrl(imgUrls);
        }
        fetchImgUrls();
        }
    , []);
    return (
        <div className="w-full p-3">
            <h1 className="text-blue-500 font-black text-lg py-3">Files</h1>
            <div className="flex flex-row w-full gap-x-3 flex-wrap gap-y-7 justify-between">
                {fileUrl.length === 0 ? <div className="w-full flex items-center justify-center h-60">
                    <i className='fas fa-spinner loading-spinner text-6xl text-blue-500'></i>
                </div> :fileUrl.map((url,idx)=>{
                    return (
                        <div className="flex flex-col bg-white p-3 rounded-lg w-1/5 gap-y-1.5" key={idx}>
                            <div className="h-24">
                                <img
                                    src={url}
                                    alt={`Image ${idx}`}
                                    className="rounded-lg"
                                    style={{ objectFit: 'cover', width: '100%', height: '100%', borderRadius: '0.5rem' }}
                                />
                            </div>
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex flex-col gap-y-1.5">
                                    <h3 className="text-indigo-500 text-sm">IMG_{idx+1}</h3>
                                    <p className="text-xs text-gray-400">{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date())}</p>
                                </div>
                                <i className="fas fa-star text-amber-500 mr-3"></i>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}