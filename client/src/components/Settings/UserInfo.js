export default function UserInfo() {
    return (
        <div className='w-full p-8 flex flex-col gap-y-6'>
            <h1 className='text-blue-700 text-xl font-extrabold'>Personal Information</h1>
            <div className="flex flex-row p-3 flex-wrap gap-y-4">
                <div className="flex flex-col w-6/12 gap-y-2">
                    <label htmlFor="firstname" className="text-sm font-medium text-gray-500">First Name</label>
                    <input name='firstname' className='w-6/12 p-2 border border-gray-300 rounded-lg' type="text" />
                </div>
                <div className="flex flex-col w-6/12 gap-y-2">
                    <label htmlFor="lastname" className="text-sm font-medium text-gray-500">Last Name</label>
                    <input name='lastname' className='w-6/12 p-2 border border-gray-300 rounded-lg' type="text" />
                </div>
                <div className="flex flex-col w-6/12 gap-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-500">E-mail</label>
                    <input name='email' className='w-6/12 p-2 border border-gray-300 rounded-lg' type="email" />
                </div>
            </div>
        </div>
    )
}