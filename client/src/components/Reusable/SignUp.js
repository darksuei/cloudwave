export default function SignUp (){
    return (
        <form className='bg-white rounded-2xl p-6 flex flex-col items-center gap-y-5 w-7/12 shadow-md' method="POST" action='/home'>
            <div className='text-center'>
                <h1 className='text-2xl font-black text-indigo-500'>Sign Up</h1>
                <p className='text-gray-500 mt-3 text-xs'>Let's get started by creating a free account for you!</p>
            </div>

            <div className='w-full flex flex-col gap-y-5'>
                <div className='flex flex-col gap-y-2'>
                    <label htmlFor="email" className="text-sm font-medium text-gray-500">E-mail</label>
                    <input type='email' name='email' className="p-3 w-full border rounded-md focus:ring focus:ring-indigo-300 transition text-sm" placeholder='Johndoe@email' />
                </div>
                <div className='flex flex-col gap-y-2'>
                    <label htmlFor="password" className="text-sm font-medium text-gray-500">Password</label>
                    <input type='password' name='password' className="p-3 w-full border rounded-md focus:ring focus:ring-indigo-300 transition text-sm" placeholder='********'/>
                </div>
                <div className="flex flex-col items-center gap-y-3 mt-3">
                    <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-6 rounded-md focus:ring-2 focus:ring-indigo-300 transition text-sm">Create Account ✨</button>
                    <p className="text-xs text-gray-600">Already have an account? <a href="/login" className="text-indigo-500 hover:underline transition">Log in</a></p>
                </div>
            </div>
        </form>
    )
}