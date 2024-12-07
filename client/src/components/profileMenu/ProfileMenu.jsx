import { Avatar } from '@mantine/core';
import React, { useState, useEffect } from 'react';

const ProfileMenu = ({ user, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [profilePic, setProfilePic] = useState(user?.picture || './profile.png');
  const role = localStorage.getItem("role");

  useEffect(() => {
    // If the role is 'agent', get the profile picture from localStorage
    if (role === 'agent') {
      const storedProfilePic = localStorage.getItem("profilePic");
      if (storedProfilePic) {
        setProfilePic(storedProfilePic);
      }
    } else {
      // Use the user's picture if role is not 'agent'
      setProfilePic( "storedProfilePic" || './profile.png');
    }
  }, [role, user?.picture]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Profile Image as Trigger */}
      <div>
        <button
          onClick={toggleMenu}
          className="inline-flex justify-center w-full rounded-full border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        >
          <Avatar
            src={profilePic}
            alt="User Avatar"
            radius="xl"
            size={60}
          />
        </button>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
        >
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              Profile
            </a>
            <button
              onClick={() => {
                logout();
                localStorage.clear();
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
