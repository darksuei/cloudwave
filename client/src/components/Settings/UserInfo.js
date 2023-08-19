import { Avatar } from "../Reusable/utils";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function UserInfo() {
    const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
    const [user, setUser] = useState({
        firstname: "",
        lastname: "",
        phone: ""
    });
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        phone: "",
    });
    useEffect(() => {
        if(authToken){
            getUser();
        }
    }, [authToken]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const getUser = async () => {
        try{
            const response = await axios.get('http://localhost:5000/api/user', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            setUser(response.data.user);
            console.log('User info retrieved:', response.data.user);
        }catch(error){
            console.error('Error getting user info:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedFields = {};
            for (const key in formData) {
                if (formData[key] !== user[key]) {
                    updatedFields[key] = formData[key];
                }
            }
            if (Object.keys(updatedFields).length === 0) {
                return;
            }
            console.log('Updated fields:', updatedFields);
            const response = await axios.patch(
                'http://localhost:5000/api/update',
                updatedFields,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );
            console.log('User info updated:', response.data);
        } catch (error) {
            console.error('Error updating user info:', error);
        }
    };
    
    return (
        <div className='w-full p-8 pb-4 flex flex-col gap-y-6'>
            <h1 className='text-blue-700 text-xl font-extrabold'>Personal Information</h1>
            <div className="flex flex-row w-full justify-between">
                <div className="w-3/12 h-full flex items-center justify-center">
                <Avatar
                size={'text-9xl'}/>
                </div>
                <div className="flex flex-col p-3 flex-wrap gap-y-4 w-6/12">
                    <div className="flex flex-col w-full gap-y-2">
                        <label htmlFor="firstname" className="text-sm font-medium text-gray-500">First Name</label>
                        <input name='firstname' className='w-8/12 p-2 border border-gray-300 rounded-lg' type="text"
                        value={user.firstname?user.firstname:formData.firstname}
                        onChange={(e)=>handleChange(e)} />
                    </div>

                    <div className="flex flex-col w-full gap-y-2">
                        <label htmlFor="lastname" className="text-sm font-medium text-gray-500">Last Name</label>
                        <input name='lastname' className='w-8/12 p-2 border border-gray-300 rounded-lg' type="text"
                        value={user.lastname?user.lastname:formData.lastname}
                        onChange={(e)=>handleChange(e)} />
                    </div>
                    
                    <div className="flex flex-col w-full gap-y-2">
                        <label htmlFor="phone" className="text-sm font-medium text-gray-500">Phone</label>
                        <input name='phone' className='w-8/12 p-2 border border-gray-300 rounded-lg' type="tel"
                        value={user.phone?user.phone:formData.phone}
                        onChange={(e)=>handleChange(e)} />
                    </div>
                </div>
                <div className="relative w-3/12">
                    <button className=' absolute bg-blue-700 text-white px-4 py-2 rounded-lg bottom-3 left-0 hover:bg-blue-600' onClick={(e)=>handleSubmit(e)}>Save</button>
                </div>
            </div>
        </div>
    )
}