import '../../index.css';
import Close from '../../assets/close.png'
import Hamburger from '../../assets/hamburger.png'
import '@fortawesome/fontawesome-free/css/all.css';
import { Avatar } from './utils';
import LogoutButton from './LogoutButton';
import { useState, useContext } from 'react';
import { LocationContext } from '../../Contexts/LocationContext';

export default function LeftSideBar() {
    const [showMenu, setShowMenu] = useState(false);
    const Location = useContext(LocationContext);
    function toggleMenu(){
      setShowMenu(!showMenu);
    }
    
    return (
      <>
      { showMenu ? <img src={Close} alt='Close' width={30} className='block absolute top-8 left-6 md:hidden z-50' onClick={toggleMenu}/> :
      <img src={Hamburger} alt='Menu' width={25} className='block absolute top-7 left-6 md:hidden z-50' onClick={toggleMenu}/> }

      <nav className={`${showMenu ? 'flex w-6/12 left-0 top-0' : 'hidden'} md:flex md:w-3/12 lg:w-2/12 bg-blue-700 text-white text-xs md:text-sm font-semibold absolute md:relative h-screen z-40`}>
        <ul className="flex flex-col w-full relative">
          <Avatar 
          size={'text-6xl'}/>
          <div>
            <a href='/home'><li className={`${Location.location === 'home' || Location.location === 'settings'? 'bg-blue-900': ''} px-12 py-4 flex items-center gap-x-2 rounded-r-2xl hover:bg-blue-800`}><div className='p-1 w-5'><i className="fas fa-home"></i></div>Home</li></a>
            <a href='/myfiles'><li className={`${Location.location === 'shared'? 'bg-blue-900': ''} px-12 py-4 flex items-center gap-x-2 rounded-r-2xl hover:bg-blue-800`}><div className='p-1 w-5'><i className="fas fa-share-alt"></i></div>My Files</li></a>
            <a href='/favorites'><li className={`${Location.location === 'favorites'? 'bg-blue-900': ''} px-12 py-4 flex items-center gap-x-2 rounded-r-2xl hover:bg-blue-800`}><div className='p-1 w-5'><i className="fas fa-star"></i></div>Favorites</li></a>
            <a href='/upload'><li className={`${Location.location === 'upload'? 'bg-blue-900': ''} px-12 py-4 flex items-center gap-x-2 rounded-r-2xl hover:bg-blue-800`}><div className='p-1 w-5'><i className="fas fa-upload"></i></div>Upload Files</li></a>
          </div>
          <div className='absolute bottom-3.5 w-full'>
            <a href='/settings'><li className='px-14 py-4 flex items-center gap-x-2 rounded-r-2xl hover:bg-blue-800'><div className='p-1 w-5'><i className="fas fa-cog"></i></div>Settings</li></a>
            <LogoutButton />
          </div>
        </ul>
      </nav>
      </>
    );
  }