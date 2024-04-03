import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts";
//Assets & Components
import "../index.css";
import Oval from "../assets/oval.svg";
import { Google } from "../components/Reusable/Google";

export function Login() {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { setIsAuthenticated } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
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
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/login`, formData);
      setLoading(false);
      if (response.status === 200) {
        const token = response.data.token;
        Cookies.set("authToken", token, { expires: 1 / 24 });
        setIsAuthenticated(true);
        toast.success("Login successful");
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
        className='bg-white rounded-2xl p-6 flex flex-col items-center gap-y-5 w-10/12 md:w-7/12 shadow-md'
        method='POST'
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className='text-center'>
          <h1 className='text-2xl font-black text-slate-800'>Log In</h1>
          <p className='text-gray-500 mt-3 text-xs'>Welcome Back!</p>
        </div>

        <div className='w-full flex flex-col gap-y-5'>
          <div className='flex flex-col gap-y-2'>
            <label htmlFor='email' className='text-sm font-medium text-gray-500'>
              Email<span className='text-red-600'>*</span>
            </label>
            <input
              type='email'
              name='email'
              className=' p-2 md:p-3 w-full border rounded-md transition text-sm outline-none'
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
                className='p-2 md:p-3 w-full border rounded-md transition text-sm outline-none'
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
              className={`w-6/12 bg-slate-800 hover:bg-slate-600 text-white py-2.5 px-7 rounded-md transition text-sm flex items-center justify-center ${
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
                "Log In ✨"
              )}
            </button>

            <p className='text-xs text-gray-600 w-11/12 md:w-7/12 flex flex-col gap-y-1 md:flex-row justify-between'>
              <span>
                Don't have an account?{" "}
                <a href='/signup' className='text-indigo-500 hover:underline transition'>
                  Sign Up
                </a>
              </span>
              <a href='/forgot_password' className='text-indigo-500 hover:underline transition'>
                Forgot Password?
              </a>
            </p>
            <Google />
          </div>
        </div>
      </form>
    </div>
  );
}
