import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button className='px-14 py-4 flex items-center gap-x-2' onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        <div className='p-1 w-5'><i className="fas fa-sign-out-alt"></i></div>
        Log Out
    </button>
  );
};

export default LogoutButton;