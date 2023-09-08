import React from "react";
import Cookies from "js-cookie";
import { AuthContext } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import '../../index.css'

const LogoutButton = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = React.useContext(AuthContext);

  const logout = (e) => {
    e.preventDefault();
    Cookies.remove("authToken");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <button
      className="px-10 md:px-14 py-4 flex items-center justify-center gap-x-2 rounded-r-2xl hover:bg-blue-800 w-full noSelect"
      onClick={(e) => logout(e)}
    >
      <div className="p-1 w-5">
        <i className="fas fa-sign-out-alt"></i>
      </div>
      Log Out
    </button>
  );
};

export default LogoutButton;
