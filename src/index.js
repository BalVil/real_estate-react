import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={process.env.REACT_APP_AUTH0_DOMAIN}
      clientId={process.env.REACT_APP_AUTH0_CLIENTID}
      authorizationParams={{
        redirect_uri: "https://real-estate-react-frontend.vercel.app",
        // audience: "http://localhost:3000",
        audience: `${process.env.REACT_APP_AUTH0_AUDIENCE}`,
        scope: "openid profile email",
        // scope: "read:current_user",
      }}
      // useRefreshTokens
      // cacheLocation="localstorage"
    >
      <MantineProvider>
        <App />
      </MantineProvider>
    </Auth0Provider>
  </React.StrictMode>
);
