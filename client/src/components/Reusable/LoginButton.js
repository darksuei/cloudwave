import React from "react";
import {useKindeAuth} from '@kinde-oss/kinde-auth-react';

export default function LoginButton(){
  const { login, register } = useKindeAuth();

  return (
    <button className="bg-blue-500 rounded-lg py-3 px-6 text-white" onClick={register} type="button">Start Uploading ✨</button>
  )
};






