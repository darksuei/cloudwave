import React from "react";

const LogoutButton = () => {

  return (
    <button className='px-14 py-4 flex items-center gap-x-2'>
        <div className='p-1 w-5'><i className="fas fa-sign-out-alt"></i></div>
        Log Out
    </button>
  );
};

export default LogoutButton;