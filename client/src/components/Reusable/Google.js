import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useContext } from "react";

import { AuthContext } from "../../contexts";

export function Google() {
  const { setIsAuthenticated } = useContext(AuthContext);

  async function handleCredentialResponse(response) {
    const credential = await response.credential;
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/google_login`, {
        userCredentials: credential,
      });
      if (response.status === 200) {
        const token = response.data.token;
        Cookies.set("authToken", token, { expires: 1 / 24 });
        setIsAuthenticated(true);
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    /* global google */
    if (!google) return;

    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(document.getElementById("google-div"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return <div id='google-div'></div>;
}
