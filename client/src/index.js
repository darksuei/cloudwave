import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-cuvq3d61aqg307p4.us.auth0.com"
      clientId="l82RoymMqSSwd6VacqCJVakhMAc3wpi2"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
  );
