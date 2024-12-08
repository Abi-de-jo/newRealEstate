import React, { useContext, useEffect } from "react";
import Header from "../Header/Header";
 import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import UserDetailContext from "../../context/UserDetailsContext";
import { useMutation } from "react-query";
import { createAgent, createUser } from "../../utils/api";
 import axios from "axios";
import GeoMapFooterDark from "../Footer/Footer";
import useLikes from "../../hooks/useLikes";

const role = localStorage.getItem("role"); // Retrieve the stored role

const Layout = () => {
  useLikes();
  const { isAuthenticated, user, getAccessTokenWithPopup } = useAuth0();
  const { setUserDetails } = useContext(UserDetailContext);

  // Define useMutations outside the helper functions so we can call mutate within them
  const { mutate: mutateAgent } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createAgent(user?.email, token),
  });

  const { mutate: mutateOwner } = useMutation({
    mutationKey: [user?.email],
    mutationFn: (token) => createUser(user?.email, token),
  });

  // Helper functions to execute the respective mutations
  function RegisterA(token) {
    mutateAgent(token);
  }

  async function RegisterO (token)  {
    mutateOwner(token);
    const email = localStorage.getItem("email");
  
    try {
      const res = await axios.post("https://new-real-estate-server.vercel.app/api/owner/checkOwner", { email });
  
      if (res.status === 200) { // Check if the status is 200 (Owner exists)
        localStorage.removeItem("role");
        console.log("Owner found, updating role to owner");
        localStorage.setItem("role", "owner");
      } else {
        console.log("Owner not found, role not updated");
      }
    } catch (err) {
      console.error("", err);
       
    }
  }

  useEffect(() => {
    const getAccessAndRegister = async () => {
      const res = await getAccessTokenWithPopup({
        authorizationParams: {
          audience: "https://new-real-estate-server.vercel.app",
          scope: "openid profile email",
        },
      });
      localStorage.setItem("token", res);
      setUserDetails((prev) => ({ ...prev, token: res }));

      if (role === "agent") {
        RegisterA(res);
        console.log("Agent Registered");
      } else if (role === "user") {
        RegisterO(res);
        console.log("User Registered");
      }
    };

    if (isAuthenticated) {
      getAccessAndRegister();
    }
  }, [isAuthenticated]);

  if (user?.email) {
    localStorage.setItem("email", user.email);
  }

  return (
    <>
      <div style={{ background: "var(--black)", overflow: "hidden" }}>
        <Header />
        <Outlet />
      </div>
      <GeoMapFooterDark />
    </>
  );
};

export default Layout;