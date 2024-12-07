import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import '@mantine/core/styles.css';
import "./i18n"; 
import { Auth0Provider } from "@auth0/auth0-react";
import { MantineProvider } from "@mantine/core";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-gnfk5ecv4ujqa6nn.eu.auth0.com"
      clientId="6U6b1LXmSXdC8e0lkF80zA4TVmgM5umf"
      authorizationParams={{
        redirect_uri: "http://localhost:5173",
      }}
      audience="http://localhost:3000"
      scope="openid profile email"
    >
      <MantineProvider withGlobalStyles withNormalizeCSS>
       
       <AuthContextProvider>

        <App />

       </AuthContextProvider>
       
      </MantineProvider>
    </Auth0Provider>
  </React.StrictMode>
);