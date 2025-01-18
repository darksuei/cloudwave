export function Header() {
  return (
    <div className='flex justify-between items-center h-[90px] md:px-[80px] px-[24px] landing-header box-border'>
      <h1 className='md:text-[32px] text-[28px] cursor-pointer pacifico-regular'>
        <a href='/' className=''>
          Cloudwave
        </a>
      </h1>
      <div className='flex flex-row items-center md:gap-[36px] gap-[16px]'>
        <a href='/signup' className='hover:text-slate-500'>
          Register
        </a>
        <button
          className='border-2 rounded-[16px] py-[10px] px-[20px] hover:bg-slate-800 hover:border-slate-800'
          onClick={() => (window.location.href = "/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
}
