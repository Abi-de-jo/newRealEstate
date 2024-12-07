import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiLocationMarker } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { Autocomplete } from "@react-google-maps/api";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [autocomplete, setAutocomplete] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery) {
      setIsLoading(true); // Start loading
      setTimeout(() => {
        navigate("/properties", { state: { searchQuery } });
        setIsLoading(false); // Stop loading
      }, 1000); // Simulate delay
    }
  };

  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setSearchQuery(place.formatted_address || place.name);
      handleSearch(); // Automatically navigate to properties page after selection
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  return (
    <div className="relative w-full max-w-xs sm:max-w-md lg:max-w-lg mx-auto">
      <div className="flex items-center bg-white rounded-full shadow-md p-2 w-full">
        <HiLocationMarker className="text-gray-500 ml-4 sm:ml-6 md:ml-8" size={24} />

        {/* Autocomplete Input */}
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Address, School, City, Zip or Neighborhood"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearchQuery("")} // Reset searchQuery on focus
            className="flex-grow bg-transparent px-4 py-2 focus:outline-none text-gray-700 placeholder-gray-500 text-sm sm:text-base"
          />
        </Autocomplete>

        <button
          onClick={handleSearch}
          disabled={isLoading} // Disable button while loading
          className="bg-black text-white p-2 sm:p-3 rounded-full flex items-center justify-center ml-3"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
          ) : (
            <FiSearch size={20} />
          )}
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
