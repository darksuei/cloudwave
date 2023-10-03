import React, { useEffect, useContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { AuthContext } from "../../Contexts/AuthContext";

export default function Google() {
  const { setIsAuthenticated } = useContext(AuthContext);

  async function handleCredentialResponse(response) {
    const credential = await response.credential;
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/api/google_login`,
        { userCredentials: credential }
      );
      console.log(response.data);
      if (response.status === 200) {
        console.log("Login successful!");
        const token = response.data.token;
        Cookies.set("authToken", token, { expires: 1 / 24 });
        setIsAuthenticated(true);
        window.location.href = "/home";
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(document.getElementById("google-div"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return <div id="google-div"></div>;
}
