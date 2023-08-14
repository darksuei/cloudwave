import React from "react";
import {useKindeAuth} from '@kinde-oss/kinde-auth-react';

const LogoutButton = () => {
  const { logout } = useKindeAuth();

  return (
    <button className='px-14 py-4 flex items-center gap-x-2' onClick={logout}>
        <div className='p-1 w-5'><i className="fas fa-sign-out-alt"></i></div>
        Log Out
    </button>
  );
};

export default LogoutButton;