import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext } from "../../Contexts/AuthContext";
import Oval from "../../assets/oval.svg";
import "../../index.css";
import Google from "./Google";
import { toast } from "react-toastify";

export default function Login() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  if (isAuthenticated) {
    window.location.href = "/home";
  }
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
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/login`,
        formData
      );
      setLoading(false);
      if (response.status === 200) {
        const token = response.data.token;
        Cookies.set("authToken", token, { expires: 1 / 24 });
        setIsAuthenticated(true);
        toast.success("Login successful");
        setTimeout(() => {
          window.location.href = "/home";
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
    <div className="w-full h-screen bg-slate-200 flex items-center justify-center">
      <form
        className="bg-white rounded-2xl p-6 flex flex-col items-center gap-y-5 w-10/12 md:w-7/12 shadow-md"
        method="POST"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="text-center">
          <h1 className="text-2xl font-black text-indigo-500">Log In</h1>
          <p className="text-gray-500 mt-3 text-xs">Welcome Back!</p>
        </div>

        <div className="w-full flex flex-col gap-y-5">
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-500"
            >
              E-mail
            </label>
            <input
              type="email"
              name="email"
              className=" p-2 md:p-3 w-full border rounded-md focus:ring focus:ring-indigo-600 transition text-sm"
              placeholder="Johndoe@email"
              value={formData.email}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-500"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              className="p-2 md:p-3 w-full border rounded-md focus:ring focus:ring-indigo-600 transition text-sm"
              placeholder="********"
              value={formData.password}
              onChange={(e) => handleChange(e)}
              required
            />
          </div>
          <div className="flex flex-col items-center gap-y-3 mt-3">
            <button
              type="submit"
              className={`w-6/12 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-7 rounded-md focus:ring focus:ring-indigo-300 transition text-sm flex items-center justify-center ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleButton}
            >
              {loading ? (
                <img
                  height="18px"
                  width="18px"
                  src={Oval}
                  alt="Loading.."
                  className="spin"
                />
              ) : (
                "Log In ✨"
              )}
            </button>

            <p className="text-xs text-gray-600 w-6/12 flex flex-col md:flex-row justify-between">
              <span>
                Don't have an account?{" "}
                <a
                  href="/signup"
                  className="text-indigo-500 hover:underline transition"
                >
                  Sign Up
                </a>
              </span>
              <a
                href="/forgot_password"
                className="text-indigo-500 hover:underline transition"
              >
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
