import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
import { AuthContext } from "../contexts";
//Assets & Components
import "../index.css";
import Oval from "../assets/oval.svg";
import { Google } from "../components/Reusable";

export function SignUp() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setIsAuthenticated } = React.useContext(AuthContext);
  const [formData, setFormData] = useState({
    firstname: "",
    email: "",
    password: "",
  });
  const handleButton = () => {
    setLoading(true);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/newuser`, formData);
      setLoading(false);
      if (response.status === 201) {
        const token = response.data.token;
        Cookies.set("authToken", token, { expires: 1 / 24 });
        setIsAuthenticated(true);
        toast.success("Sign Up successful!");
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 500);
      }
    } catch (error) {
      setLoading(false);
      if (error.response.data) {
        setError(error.response.data.message);
      }
    }
  };
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <div className='w-full h-screen bg-slate-300 flex items-center justify-center'>
      <form
        className='bg-white rounded-2xl p-6 flex flex-col items-center gap-y-5 w-11/12 md:w-7/12 shadow-md'
        method='POST'
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className='text-center'>
          <h1 className='text-2xl font-black text-slate-800'>Sign Up</h1>
          <p className='text-gray-500 mt-3 text-xs'>
            Let's get you started by creating a free account just for you!
          </p>
        </div>
        <div className='w-full flex flex-col gap-y-5'>
          <div className='flex flex-col gap-y-2'>
            <label htmlFor='firstname' className='text-sm font-medium text-gray-500'>
              Firstname<span className='text-red-600'>*</span>
            </label>
            <input
              type='text'
              name='firstname'
              className='p-3 w-full border rounded-md outline-none transition text-sm'
              placeholder='Potato'
              value={formData.name}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className='flex flex-col gap-y-2'>
            <label htmlFor='email' className='text-sm font-medium text-gray-500'>
              Email<span className='text-red-600'>*</span>
            </label>
            <input
              type='email'
              name='email'
              className='p-3 w-full border rounded-md outline-none transition text-sm'
              placeholder='Potato@email'
              value={formData.email}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className='flex flex-col gap-y-2'>
            <label htmlFor='password' className='text-sm font-medium text-gray-500'>
              Password<span className='text-red-600'>*</span>
            </label>
            <div className='relative'>
              <input
                type={isShowPassword ? "text" : "password"}
                name='password'
                className='p-3 w-full border rounded-md outline-none transition text-sm'
                placeholder='********'
                value={formData.password}
                onChange={(e) => handleChange(e)}
                required
              />
              <span
                class='password-toggle-icon'
                onClick={() => {
                  setIsShowPassword(!isShowPassword);
                }}
              >
                {isShowPassword ? <i class='fa fa-eye-slash'></i> : <i class='fa fa-eye'></i>}
              </span>
            </div>
          </div>
          <div className='flex flex-col items-center gap-y-3 mt-3'>
            <button
              type='submit'
              className={`w-8/12 bg-slate-800 hover:bg-slate-600 text-white py-2.5 h-10 px-6 rounded-md transition text-sm flex items-center justify-center ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleButton}
            >
              {loading ? (
                <div className='flex flex-row items-center justify-center gap-1'>
                  <span>Please wait..</span>
                  <img height='18px' width='18px' src={Oval} className='spin' alt='' />
                </div>
              ) : (
                "Create Account ✨"
              )}
            </button>
            <p className='text-xs text-gray-600'>
              Already have an account?{" "}
              <a href='/login' className='text-indigo-500 hover:underline transition'>
                Log in
              </a>
            </p>
            <Google />
          </div>
        </div>
      </form>
    </div>
  );
}
