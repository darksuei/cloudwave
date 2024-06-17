export function MyFolders() {
  return (
    <div className='flex flex-col w-11/12 md:w-11/12 gap-y-5'>
      <h1 className='text-blue-700 text-xl font-extrabold'>My Folders</h1>
      <div className='w-full'>
        <a
          href='/files'
          className='flex p-5 px-6 flex-col gap-y-2 w-fit hover:bg-gray-300 rounded-lg hover:border cursor-pointer'
        >
          <span className='md:inline hidden'>
            <i className='fas fa-folder-open fa-4x text-indigo-500'></i>
          </span>
          <span className='md:hidden inline'>
            <i className='fas fa-folder-open text-6xl text-indigo-500'></i>
          </span>
          <h2 className='text-gray-500 text-xs md:text-sm text-center'>All files</h2>
        </a>
      </div>
    </div>
  );
}
