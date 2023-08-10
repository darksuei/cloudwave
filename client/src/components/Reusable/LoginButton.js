import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button className="bg-blue-500 rounded-lg py-3 px-6 text-white" onClick={() => loginWithRedirect()}>Start Uploading ✨</button>;
};

export default LoginButton;