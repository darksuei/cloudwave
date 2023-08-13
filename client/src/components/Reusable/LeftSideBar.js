import '../../index.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Avatar } from './utils';
import LogoutButton from './LogoutButton';
import { useContext } from 'react';
import { LocationContext } from '../../Contexts/LocationContext';

export default function LeftSideBar() {
    const Location = useContext(LocationContext);
    return (
      <nav className="flex w-2/12 bg-blue-700 text-white text-sm font-semibold relative h-screen">
        <ul className="flex flex-col w-full relative">
          <Avatar 
          size={'text-6xl'}/>
          <div>
            <a href='/home'><li className={`${Location.location === 'home' || Location.location === 'settings'? 'bg-blue-900': ''} px-12 py-4 flex items-center gap-x-2 rounded-r-2xl hover:bg-blue-800`}><div className='p-1 w-5'><i className="fas fa-home"></i></div>Home</li></a>
            <a href='/shared'><li className={`${Location.location === 'shared'? 'bg-blue-900': ''} px-12 py-4 flex items-center gap-x-2 rounded-r-2xl hover:bg-blue-800`}><div className='p-1 w-5'><i className="fas fa-share-alt"></i></div>Shared</li></a>
            <a href='/favorites'><li className={`${Location.location === 'favorites'? 'bg-blue-900': ''} px-12 py-4 flex items-center gap-x-2 rounded-r-2xl hover:bg-blue-800`}><div className='p-1 w-5'><i className="fas fa-star"></i></div>Favorites</li></a>
            <a href='/upload'><li className={`${Location.location === 'upload'? 'bg-blue-900': ''} px-12 py-4 flex items-center gap-x-2 rounded-r-2xl hover:bg-blue-800`}><div className='p-1 w-5'><i className="fas fa-upload"></i></div>Upload Files</li></a>
          </div>
          <div className='absolute bottom-3.5 w-full'>
            <a href='/settings'><li className='px-14 py-4 flex items-center gap-x-2 rounded-r-2xl hover:bg-blue-800'><div className='p-1 w-5'><i className="fas fa-cog"></i></div>Settings</li></a>
            <LogoutButton />
          </div>
        </ul>
      </nav>
    );
  }