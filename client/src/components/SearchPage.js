import LeftSideBar from "./Reusable/LeftSideBar";
import Recent from "./Reusable/Recent";
import Search from "./Reusable/Search";
import { useContext, useState, useEffect } from "react";
import { LocationContext } from "../Contexts/LocationContext";
import Loading from "./Reusable/Loading";
import Cookies from "js-cookie";
import axios from "axios";

export default function Files() {
  const [data, setData] = useState([]);
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
  const [loading, setLoading] = useState(true);
  const Location = useContext(LocationContext);
  Location.setLocation("search");
  const href = window.location.href;
  const query = href.split("?")[1];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(authToken);
        setData(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (authToken) {
      fetchData();
    }
    return () => {};
  }, [authToken]);

  const getData = async (authToken) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/search?${query}`,
        { headers: { Authorization: `Bearer ${authToken}` } },
      );
      return response.data.files;
    } catch (error) {
      console.error("An error occured:", error);
    }
  };

  return (
    <div className="flex flex-row w-full bg-slate-200 justify-center min-h-screen">
      <LeftSideBar />
      <div className="flex flex-col w-10/12 py-4 items-center relative">
        <Search defaultVal={query.split("=")[1]} />
        <div className="w-full min-h-full">
          {data.length > 0 ? (
            <Recent
              title="Search Results"
              showAll={true}
              SearchResults={data}
            />
          ) : (
            <div className="text-2xl pt-6 text-center text-slate-400">
              {loading ? <Loading /> : 'No results found'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
