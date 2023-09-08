import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext } from "../../Contexts/AuthContext";
import Oval from "../../assets/oval.svg";
import '../../index.css'


export default function Login() {
  const { isAuthenticated, setIsAuthenticated } = React.useContext(AuthContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleButton = () => {
    setLoading(!loading);
    setTimeout(() => {
      setLoading(false);
    }, 9000);
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
        formData,
      );
      if (response.status === 200) {
        const token = response.data.token;
        Cookies.set("authToken", token, { expires: 1 / 24 });
        setIsAuthenticated(true);
        window.location.href = "/home";
      }
    } catch (error) {
      console.error("Error sending form data:", error);
      setError(error.response.data.message);
    }
  };
  useEffect(() => {
    // Load Bootstrap JS
    const bootstrapScript = document.createElement("script");
    bootstrapScript.src =
      "https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js";
    bootstrapScript.integrity =
      "sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm";
    bootstrapScript.crossOrigin = "anonymous";
    document.body.appendChild(bootstrapScript);

    return () => {
      document.body.removeChild(bootstrapScript);
    };
  }, []);

  return (
    <div className="w-full h-screen bg-slate-200 flex items-center justify-center">
      <head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
          crossorigin="anonymous"
        />
      </head>
      <form
        className="bg-white rounded-2xl p-6 flex flex-col items-center gap-y-5 w-10/12 md:w-7/12 shadow-md"
        method="POST"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="text-center">
          <h1 className="text-2xl font-black text-indigo-500">Log In</h1>
          <p className="text-gray-500 mt-3 text-xs">Welcome Back!</p>
          {error && (
            <div
              className="alert alert-danger alert-dismissible fade show"
              role="alert"
            >
              {error}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          )}
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
              { loading ? 
              <img height="18px" width="18px" src={Oval} alt="Loading.." className="spin"/> :
              'Log In ✨'
              }
            </button>
            <p className="text-xs text-gray-600">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-indigo-500 hover:underline transition"
              >
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
