import { toast } from "sonner";
import React, { useState, useEffect } from "react";
import "../../index.css";
import Oval from "../../assets/oval.svg";
import { postResetPassword } from "../../services";

export function ResetPassword() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
  });
  const location = window.location.pathname;
  const urltoken = location.split("/")[3];
  const urlid = location.split("/")[2];
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
      const response = await postResetPassword(urlid, urltoken, formData);
      setLoading(false);
      if (response.status === 200) {
        toast.success("Password reset successful!");
        toast.success("Please login to continue!");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      } else {
        toast.error("Something went wrong");
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
        className='bg-white rounded-2xl p-6 flex flex-col items-center gap-y-5 w-10/12 md:w-4/12 shadow-md'
        method='POST'
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className='text-center'>
          <h1 className='text-2xl font-black text-slate-800'>Reset Password</h1>
          <p className='text-gray-500 mt-3 text-xs'>Enter a new password for your account!</p>
        </div>

        <div className='w-full flex flex-col gap-y-5'>
          <div className='flex flex-col gap-y-2'>
            <label htmlFor='password' className='text-sm font-medium text-gray-500'>
              New Password <span className='text-red-600'>*</span>
            </label>
            <div className='relative'>
              <input
                type={isShowPassword ? "text" : "password"}
                name='password'
                className='p-2 md:p-3 w-full border rounded-md transition text-sm outline-none'
                placeholder='********'
                value={formData.password}
                onChange={(e) => handleChange(e)}
                required
              />
              <span
                className='password-toggle-icon'
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
              className={`w-6/12 bg-slate-800 hover:bg-slate-600 text-white py-2 px-7 rounded-md focus:ring focus:ring-indigo-300 transition text-sm flex items-center justify-center ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleButton}
            >
              {loading ? (
                <img height='18px' width='18px' src={Oval} alt='Loading..' className='spin' />
              ) : (
                "Reset"
              )}
            </button>
            <p className='text-xs text-gray-600 w-8/12 flex flex-col md:flex-row justify-between'>
              <a href='/login' className='text-indigo-500 hover:underline transition'>
                Back to login
              </a>
              <a href='/signup' className='text-indigo-500 hover:underline transition'>
                Sign Up ?
              </a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
