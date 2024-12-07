import React, { useState } from 'react';

const AgentProfile = ({ agent, logout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Profile Image as Trigger */}
      <div>
        <button
          onClick={toggleMenu}
          className="inline-flex justify-center w-full rounded-full border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        >
          <img
            src={agent?.picture || 'https://via.placeholder.com/50'}
            alt="agent Avatar"
            className="w-10 h-10 rounded-full"
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
            <a href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              Settings
            </a>
            <button
              onClick={()=>{
                localStorage.clear();
                logout() 
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

export default AgentProfile;
