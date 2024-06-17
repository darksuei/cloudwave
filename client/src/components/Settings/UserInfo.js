import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Oval from "../../assets/oval.svg";
import "../../index.css";
import { Avatar } from "../Reusable";

export function UserInfo() {
  const authToken = Cookies.get("authToken");
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    phone: "",
  });

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
  });

  useEffect(() => {
    if (authToken) getUser();
    return () => {};
  }, [authToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getUser = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setUser(response.data.user);
    } catch (error) {}
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 5000);

      const updatedFields = {};
      for (const key in formData) {
        if (formData[key] !== user[key]) {
          updatedFields[key] = formData[key];
        }
      }
      if (Object.keys(updatedFields).length === 0) {
        return;
      }
      const resonse = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/api/update`, updatedFields, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      setLoading(false);
      if (resonse.status === 200) {
        alert("Personal information updated successfully.");
      } else {
        alert("Error updating personal information.");
      }
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };

  return (
    <div className='w-full p-8 pb-4 flex flex-col'>
      <h1 className='text-slate-800 text-xl font-extrabold ml-6 md:ml-0'>Personal Information</h1>
      <h3 className='text-sm text-gray-500 my-3 ml-2 md:ml-0'>Update your personal information: </h3>
      <div className='flex flex-col md:flex-row w-full justify-between gap-y-7'>
        <span className='flex flex-row justify-around md:w-9/12 '>
          <div className='w-5/12 h-full flex items-center justify-center'>
            <Avatar size={"text-9xl"} hidePen={true} imgSize={"md:h-48 md:w-48 h-28 w-28"} id='avatar' />
          </div>
          <div className='flex flex-col p-3 gap-y-4 w-7/12 md:w-6/12 '>
            <div className='flex flex-col w-full gap-y-2 items-center md:items-start'>
              <label htmlFor='firstname' className='text-sm font-medium text-gray-500'>
                First Name
              </label>
              <input
                name='firstname'
                className='w-full md:w-10/12 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                type='text'
                placeholder={user.firstname ? user.firstname : formData.firstname}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className='flex flex-col w-full gap-y-2 items-center md:items-start'>
              <label htmlFor='lastname' className='text-sm font-medium text-gray-500'>
                Last Name
              </label>
              <input
                name='lastname'
                className='w-full md:w-10/12 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                type='text'
                placeholder={user.lastname ? user.lastname : formData.lastname}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className='flex flex-col w-full gap-y-2 items-center md:items-start'>
              <label htmlFor='phone' className='text-sm font-medium text-gray-500'>
                Phone
              </label>
              <input
                name='phone'
                className='w-full md:w-10/12 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                type='tel'
                placeholder={user.phone ? user.phone : formData.phone}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
        </span>
        <div className='relative w-6/12 h-fit md:h-full md:w-3/12 flex items-center justify-center md:block'>
          <button
            className={`relative md:absolute border-current border text-slate-800 px-4 py-2.5 rounded-md bottom-3 left-0 hover:bg-slate-800 hover:text-white text-sm w-full flex justify-center items-center${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={(e) => handleSubmit(e)}
          >
            {loading ? <img height='18px' width='18px' src={Oval} alt='' className='spin' /> : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
