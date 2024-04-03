import Github from "../icons/Github";

export function Footer() {
  return (
    <div className='w-full min-h-32 text-white/80 px-12 md:px-16 bg-slate-800 md:hidden'>
      <div className='flex flex-col md:flex-row gap-8 py-8'>
        <div className='w-11/12 md:w-4/12'>
          <h1 className='font-semibold text-xl mb-3'>About</h1>
          <p className='text-xs'>
            Free and secure file storage for everyone. Store your files securely in the cloud and access them
            from any device.
          </p>
        </div>
        <div className='w-11/12 md:w-4/12'>
          <h1 className='font-semibold text-xl mb-3'>Contact</h1>
          <ul className='text-xs flex flex-col gap-y-4'>
            <li>+234 90 3971 7514</li>
            <li>folarinraphael@outlook.com</li>
            <li>Lagos, Nigeria</li>
          </ul>
        </div>
        <div className='flex flex-row justify-between items-center'>
          <div>
            <h1 className='font-semibold text-xl mb-3'>Social</h1>
            <p className='text-xs'>Leave a star on Github</p>
          </div>
          <Github />
        </div>
      </div>
      <hr />
      <h3 className='w-full text-center text-xs py-3'>Cloud Wave &copy; 2023 | All rights reserved.</h3>
    </div>
  );
}
