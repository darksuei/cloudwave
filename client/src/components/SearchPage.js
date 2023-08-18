import LeftSideBar from "./Reusable/LeftSideBar"
import Recent from "./Reusable/Recent"
import Search from "./Reusable/Search"
import { useContext, useState, useEffect } from "react"
import { LocationContext } from "../Contexts/LocationContext"
import Cookies from 'js-cookie';
import axios from "axios";

export default function Files() {
    const [data, setData] = useState([]);
    const [authToken, setAuthToken] = useState(Cookies.get('authToken'));
    const Location = useContext(LocationContext);
    Location.setLocation('search');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getData(authToken);
                console.log("hi", response);
                setData(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (authToken) {
            fetchData();
        }
    }, [authToken]);

    const getData = async (authToken) => {
        try {
            const href = window.location.href;
            const query = href.split('?')[1];
            const response = await axios.get(`http://localhost:5000/api/search?${query}`, { headers: { 'Authorization': `Bearer ${authToken}` } });
            console.log('cat:', response.data);
            return response.data;
        } catch (error) {
          console.error('An error occured:', error);
        }
      };

    return (
        <div className="flex flex-row w-full bg-slate-200 justify-center min-h-screen" >
            <LeftSideBar/>
            <div className="flex flex-col w-10/12 py-8 items-center relative">
                <Search/>
                <div className="w-full min-h-full">
                    <Recent 
                    title={'Search Results'}
                    SearchResults={data}
                    />
                </div>
            </div>
        </div>
    )
}