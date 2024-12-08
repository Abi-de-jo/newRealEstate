 

import React, { useState, useEffect, useMemo } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BiMenuAltRight } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import { FiHeart, FiUser } from "react-icons/fi";
import OutsideClickHandler from "react-outside-click-handler";
 import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";
 import AddPropertyModal from "./AddPropertyModal/AddPropertyModal";
 function AgentHeder() {
  const { t } = useTranslation("header");
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

  const [open, setOpen] = useState(false);
  const [modalOpened, setModalOpened] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const [role, setRole] = useState(localStorage.getItem("role") || "");
 
  useEffect(() => {
    if (role) {
      localStorage.setItem("role", role);
    }
  }, [role]);

  const handleAddPropertyClick = () => {
    if (role) {
      setModalOpened(true);
    } else {
      alert(t("mustSignIn"));
    }
  };

  const handleLoginRedirect = (userRole) => {
    setRole(userRole);
    loginWithRedirect();
  };

  

  

  const handleProfileClick = () => {
    navigate(role === "admin" ? "/admin" : "/profile");
    setProfileDropdown(false);
    window.location.reload();
  };

  const navItems = useMemo(
    () => (
      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0">
        <NavLink to="/home" className="text-gray-800 hover:text-red-600 font-medium text-sm">
          {t("Home")}
        </NavLink>
        <NavLink to="/buy" className="text-gray-800 hover:text-red-600 font-medium text-sm">
          {t("buy")}
        </NavLink>
        <NavLink to="/rent" className="text-gray-800 hover:text-red-600 font-medium text-sm">
          {t("rent")}
        </NavLink>
        <NavLink to="/properties" className="text-gray-800 hover:text-red-600 font-medium text-sm">
          {t("properties")}
        </NavLink>
        {["agent", "admin"].includes(role) && (
          <NavLink to="/draft" className="text-gray-800 hover:text-red-600 font-medium text-sm">
            {t("drafts")}
          </NavLink>
        )}
        {["user", "agent", "admin", "owner"].includes(role) && (
          <button
            onClick={handleAddPropertyClick}
            className="text-gray-800 hover:text-red-600 font-medium text-sm"
          >
            {t("addProperty")}
          </button>
        )}
      </div>
    ),
    [role, t]
  );

  const authenticatedMenu = (
    <OutsideClickHandler onOutsideClick={() => setProfileDropdown(false)}>
      <div className="relative">
        <button
          className="text-gray-600 hover:text-red-600"
          onClick={() => setProfileDropdown((prev) => !prev)}
        >
          <FiUser className="h-6 w-6 -ml-7"  />
        </button>
        {profileDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
            <button
              onClick={handleProfileClick}
              className="block w-full text-left p-4 border-b font-medium hover:bg-gray-100"
            >
              {t("profile")}
            </button>
            <div className="p-2">
              <button
                className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                onClick={() => {
    
                    logout({ returnTo: window.location.origin ,});
                    localStorage.clear()
                  
                }}
              >
                {t("logout")}
              </button>
            </div>
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );

  return (
    <header className="bg-white shadow-sm fixed w-full z-50">
      <div className="container mx-auto flex items-center justify-between py-2 px-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-red-600 font-bold text-lg">GeoMap</span>
        </Link>

        <nav className="hidden lg:flex items-center space-x-4 flex-1 justify-center">{navItems}</nav>

        <div className="hidden lg:flex items-center space-x-4 relative">
          {role === "user" && (
            <Link to="/likes">
              <button className="text-gray-600 hover:text-red-600">
                <FiHeart className="h-5 w-5 mr-4" />
              </button>
            </Link>
          )}
          {!isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                onClick={() => handleLoginRedirect("agent")}
              >
                {t("agent")}
              </button>
              
              
            </div>
          ) : (
            authenticatedMenu
          )}
        </div>

        <div className="text-gray-700 lg:hidden cursor-pointer" onClick={() => setOpen((prev) => !prev)}>
          <BiMenuAltRight size={24} />
        </div>

        {open && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50 lg:hidden">
            <OutsideClickHandler onOutsideClick={() => setOpen(false)}>
              <div className="bg-white w-64 h-full absolute right-0 shadow-lg p-6 flex flex-col items-start space-y-4 overflow-y-auto">
                <AiOutlineClose
                  size={24}
                  className="text-gray-700 absolute top-4 right-4 cursor-pointer"
                  onClick={() => setOpen(false)}
                />
                {navItems}
                <div className="mt-4">
                  {role === "user" && (
                    <Link to="/likes" className="block mb-4">
                      <button className="text-gray-600 hover:text-red-600">
                        <FiHeart className="h-5 w-5" />
                      </button>
                    </Link>
                  )}
                  {!isAuthenticated ? (
                    <div className="flex flex-col space-y-2">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                        onClick={() => handleLoginRedirect("agent")}
                      >
                        {t("agent")}
                      </button>
                      
                    </div>
                  ) : (
                    <div className="mt-4">
                      <button
                        onClick={handleProfileClick}
                        className="block w-full text-left p-2 font-medium hover:bg-gray-100"
                      >
                        {t("profile")}
                      </button>
                      <button
                        className="w-full text-left p-2 text-gray-800 hover:bg-gray-100"
                        onClick={() => {
                          
                            logout({ returnTo: window.location.origin });
                            localStorage.clear()

                         
                        }}
                      >
                        {t("logout")}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </OutsideClickHandler>
          </div>
        )}

      
        <AddPropertyModal opened={modalOpened} setOpened={setModalOpened} />
      </div>
    </header>
  );
}

export default AgentHeder;
