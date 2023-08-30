import LeftSideBar from './Reusable/LeftSideBar';
import RightSideBar from './Home/RightSideBar';
import Main from './Home/Main';

export default function Home() {
    return (
        <div className='flex flex-row gap-x-8 min-h-screen bg-slate-200'>
            <LeftSideBar />
            <Main />
            <RightSideBar />
        </div>
    )
}