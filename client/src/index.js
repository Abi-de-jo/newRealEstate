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
      clientId="dlyAjNpwii4Dni4frS7BxqHDxYvifNqk"
      authorizationParams={{
        redirect_uri: "https://new-real-estate-client.vercel.app",
      }}
      audience="https://new-real-estate-server.vercel.app"
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