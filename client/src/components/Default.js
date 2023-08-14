import LoginButton from "./Reusable/LoginButton"
import Cloudwavehome from '../assets/Cloudwavehome.jpeg';
import {useKindeAuth} from '@kinde-oss/kinde-auth-react';
import { useEffect } from 'react';

export default function Default (){
    const { user, isAuthenticated } = useKindeAuth();
    
    useEffect(() => {
        if(user){
            window.location.href = "/home";
        }
        console.log(user)
        console.log(isAuthenticated)
    }, [user]); 

    return (
        <div className="bg-slate-200 flex flex-row w-full h-screen">
            <div className="w-6/12 flex flex-col justify-center items-center gap-y-5">
                <div className="p-5 w-10/12 flex flex-col gap-y-7">
                    <h1 className="text-blue-700 text-5xl font-black"> All your files in one safe place</h1>
                    <p className="text-sm text-blue-400">Free file storage for everyone. Store your files securely in the cloud and access them from any device.</p>
                </div>
                <div className="w-10/12 px-4">
                    {isAuthenticated ? <button className="bg-blue-500 rounded-lg py-3 px-6 text-white" onClick={() => window.location.href = "/home"} type="button">Start Uploading ✨</button> : <LoginButton/>}
                </div>
            </div>
            <div className="w-6/12 bg-slate-200 flex items-center justify-center">
                <img src={Cloudwavehome} alt="Cloudwavehome" className="w-full"/>
            </div>
        </div>
    )
}