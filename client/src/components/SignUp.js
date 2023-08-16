import axios from 'axios';
import { useState, useEffect } from 'react';

export default function SignUp (){
    const [formData, setFormData] = useState({
        firstname:'',
        email:'',
        password:''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/newuser', formData);
            if(response.status === 201){
                console.log('Server response:', response.data);
                window.location.href = '/home'
            }
        } catch (error) {
            console.error('Error sending form data:', error);
        }
    };

    return (
        <div className="w-full h-screen bg-slate-200 flex items-center justify-center">
            <form className='bg-white rounded-2xl p-6 flex flex-col items-center gap-y-5 w-7/12 shadow-md' method="POST" onSubmit={(e)=>handleSubmit(e)}>
                <div className='text-center'>
                    <h1 className='text-2xl font-black text-indigo-500'>Sign Up</h1>
                    <p className='text-gray-500 mt-3 text-xs'>Let's get started by creating a free account for you!</p>
                </div>
                <div className='w-full flex flex-col gap-y-5'>
                    <div className='flex flex-col gap-y-2'>
                        <label htmlFor="firstname" className="text-sm font-medium text-gray-500">Name</label>
                        <input type='text' name='firstname' className="p-3 w-full border rounded-md focus:ring focus:ring-indigo-300 transition text-sm" placeholder='John Doe' value={formData.name} onChange={(e)=>handleChange(e)} required/>
                    </div>
                    <div className='flex flex-col gap-y-2'>
                        <label htmlFor="email" className="text-sm font-medium text-gray-500">E-mail</label>
                        <input type='email' name='email' className="p-3 w-full border rounded-md focus:ring focus:ring-indigo-300 transition text-sm" placeholder='Johndoe@email' value={formData.email} onChange={(e)=>handleChange(e)} required/>
                    </div>
                    <div className='flex flex-col gap-y-2'>
                        <label htmlFor="password" className="text-sm font-medium text-gray-500">Password</label>
                        <input type='password' name='password' className="p-3 w-full border rounded-md focus:ring focus:ring-indigo-300 transition text-sm" placeholder='********' value={formData.password} onChange={(e)=>handleChange(e)} required/>
                    </div>
                    <div className="flex flex-col items-center gap-y-3 mt-3">
                        <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-md focus:ring-2 focus:ring-indigo-300 transition text-sm">Create Account ✨</button>
                        <p className="text-xs text-gray-600">Already have an account? <a href="/login" className="text-indigo-500 hover:underline transition">Log in</a></p>
                    </div>
                </div>
            </form>
        </div>
    )
}