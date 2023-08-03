import { useState, useEffect } from 'react';
import serverUrl from '../config';

export default function Home() {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`${serverUrl}/api`)
            .then((res) => res.json())
            .then((data) => setData(data.message));
    }, []);
    return (
        <>
            {data ? <h1>{data}</h1> : <h1>Loading...</h1>}
        </>
    )
}