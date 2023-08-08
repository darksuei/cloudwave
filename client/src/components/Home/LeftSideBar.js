import '../../index.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Avatar } from './utils/utils';

export default function LeftSideBar() {
    return (
      <nav className="flex w-2/12 bg-blue-700 text-white text-sm font-semibold relative h-screen">
        <ul className="flex flex-col w-full relative">
          <Avatar />
          <div>
            <a href='/'><li className='bg-blue-900 px-12 py-4 flex items-center gap-x-2 rounded-r-2xl'><i className="fas fa-home"></i>Home</li></a>
            <a href='/shared'><li className='px-12 py-4 flex items-center gap-x-2'><i className="fas fa-share-alt"></i>Shared Files</li></a>
            <a href='/favorites'><li className='px-12 py-4 flex items-center gap-x-2'><i className="fas fa-star"></i>Favorites</li></a>
            <a href='/upload'><li className='px-12 py-4 flex items-center gap-x-2'><i className="fas fa-upload"></i>Upload Files</li></a>
          </div>
          <div className='rounded-r-3xl absolute bottom-3.5'>
            {/* <a href='/login'><li className='px-14 py-4 flex items-center gap-x-2'><i className="fas fa-sign-in-alt"></i>Login</li></a> */}
            <a href='/settings'><li className='px-14 py-4 flex items-center gap-x-2'><i className="fas fa-cog"></i>Settings</li></a>
            <a href='/logout'><li className='px-14 py-4 flex items-center gap-x-2'><i className="fas fa-sign-out-alt"></i>Logout</li></a>
          </div>
        </ul>
      </nav>
    );
  }