export function Hero() {
  return (
    <div
      className='h-screen border flex justify-center items-center md:rounded-[56px] rounded-[36px] hero text-white'
      id='bg'
    >
      <div className='w-[60%] min-w-[300px] text-center flex flex-col gap-[16px] items-center'>
        <h1 className='md:text-[56px] text-[36px]'>
          All your files, in one secure location, <span className='text-gray-400'>accessible anywhere.</span>
        </h1>
        <p className='mb-[16px] md:text-base text-sm'>
          Store your files securely in the cloud and access them from any device.
        </p>
        <button
          className='border-2 rounded-[16px] py-[14px] px-[28px] w-fit hover:bg-slate-800 hover:border-slate-800 md:text-base text-sm'
          onClick={() => (window.location.href = "/login")}
        >
          Get started
        </button>
      </div>
    </div>
  );
}
