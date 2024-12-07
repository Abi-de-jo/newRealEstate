import { Avatar } from '@mantine/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const ProfileMenu = ({ user, role, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    const savedProfileImage = localStorage.getItem('profileImage');
    if (savedProfileImage) {
      setProfileImage(savedProfileImage);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const UserToOwner = async () => {
    const email = localStorage.getItem("email");
  
    try {
      const res = await axios.post("http://localhost:3000/api/owner/checkOwner", { email });
  
      if (res.status === 200) { // Check if the status is 200 (Owner exists)
        localStorage.removeItem("role");
        console.log("Owner found, updating role to owner");
        localStorage.setItem("role", "owner");
      } else {
        console.log("Owner not found, role not updated");
      }
    } catch (err) {
      console.error("Something went wrong", err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          onClick={toggleMenu}
          className="inline-flex justify-center w-full rounded-full border border-gray-300 shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        >
          <Avatar
            src={profileImage || './profile.png'}
            alt="User Avatar"
            radius="xl"
            size={60}
          />
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
        >
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              Profile
            </a>

            {role === "user" && (
              <>
                
               
                
              </>
            )}

            {role === "owner" && (
              <a href="/track-property" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                Track Property
              </a>
            )}

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
