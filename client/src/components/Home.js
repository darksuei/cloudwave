import { useState, useEffect } from 'react';
import serverUrl from '../config';
import LeftSideBar from './Home/LeftSideBar';
import RecentUploads from './Home/RecentUploads';

export default function Home() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5187/api`)
            .then((res) => res.json())
            .then((data) => setData(data.message))
            .catch((err) => console.error(err));
    }, []);
    return (
        <div className='flex flex-row gap-x-8 bg-slate-200'>
            <LeftSideBar />
            <RecentUploads />
            {data ? <h1>{data}</h1> : <h1>Loading...</h1>}
        </div>
    )
}