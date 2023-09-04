import { Avatar } from "../Reusable/utils";
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function UserInfo() {
  const [authToken, setAuthToken] = useState(Cookies.get("authToken"));
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
    if (authToken) {
      getUser();
    }
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
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/user`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      setUser(response.data.user);
    } catch (error) {
      console.error("Error getting user info:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000)
    try {
      const updatedFields = {};
      for (const key in formData) {
        if (formData[key] !== user[key]) {
          updatedFields[key] = formData[key];
        }
      }
      if (Object.keys(updatedFields).length === 0) {
        return;
      }
      const resonse = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/api/update`,
        updatedFields,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      setLoading(false);
      if (resonse.status === 200) {
        alert("Personal information updated successfully.")
      }else{
        alert("Error updating personal information.");
      }
    } catch (error) {
      console.error("Error updating user info:", error);
    }
  };
  return (
    <div className="w-full p-8 pb-4 flex flex-col">
      <h1 className="text-blue-700 text-xl font-extrabold ml-4 md:ml-0">
        Personal Information
      </h1>
      <h3 className="text-sm text-gray-500 my-3">Edit your information: </h3>
      <div className="flex flex-row w-full justify-between">
        <div className="w-3/12 h-full flex items-center justify-center">
          <Avatar size={"text-8xl md:text-9xl"} />
        </div>
        <div className="flex flex-col p-3 gap-y-4 w-7/12 md:w-6/12">
          <div className="flex flex-col w-full gap-y-2 items-center md:items-start">
            <label
              htmlFor="firstname"
              className="text-sm font-medium text-gray-500"
            >
              First Name
            </label>
            <input
              name="firstname"
              className="w-10/12 md:w-8/12 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              type="text"
              placeholder={user.firstname ? user.firstname : formData.firstname}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="flex flex-col w-full gap-y-2 items-center md:items-start">
            <label
              htmlFor="lastname"
              className="text-sm font-medium text-gray-500"
            >
              Last Name
            </label>
            <input
              name="lastname"
              className="w-10/12 md:w-8/12 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              type="text"
              placeholder={user.lastname ? user.lastname : formData.lastname}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="flex flex-col w-full gap-y-2 items-center md:items-start">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-gray-500"
            >
              Phone
            </label>
            <input
              name="phone"
              className="w-10/12 md:w-8/12 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              type="tel"
              value={user.phone ? user.phone : formData.phone}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
        <div className="relative w-2/12 md:w-3/12">
          <button
            className= {`absolute bg-blue-700 text-white px-4 py-2 rounded-lg bottom-3 left-0 hover:bg-blue-600 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={(e) => handleSubmit(e)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
