import React, { useState } from 'react';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { MdLocationOn } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

function Search({ selectedAddress, setCoordinates }) {
  const [inputValue, setInputValue] = useState(null);
  const { t } = useTranslation('search'); // Initialize translation function

  const handlePlaceChange = (place) => {
    setInputValue(place);
    if (place) {
      selectedAddress(place); // Set the selected address if place is not null
      geocodeByAddress(place.label)
        .then((result) => getLatLng(result[0]))
        .then(({ lat, lng }) => {
          setCoordinates({ lat, lng });
        })
        .catch((error) => console.error("Error getting lat/lng:", error));
    } else {
      selectedAddress(null); // Clear the selected address if place is null
      setCoordinates(null);
    }
  };

  return (
    <div className="relative">
      <div
        className="flex p-[1px] items-center rounded-full shadow-lg overflow-hidden
                   "
        style={{ minWidth: '45px', maxWidth: '100%', overflowX: 'hidden' }}
      >
        <GooglePlacesAutocomplete 

         
          selectProps={{
            value: inputValue,
            onChange: handlePlaceChange,
            placeholder: t("placeholder"),
            isClearable: true,
            styles: {
              control: (provided) => ({
                ...provided,
                borderRadius: '999px',
                overflow: 'hidden',
                boxShadow: 'none',
                paddingLeft: "20px",
                padding: "10px",
                outline: "none",
                minWidth: "310px",
                maxWidth: "100px", // Ensure the input stays within the container
                whiteSpace: "nowrap", // Prevent text wrapping
                textOverflow: "ellipsis", // Show ellipsis for overflowing text
               }),
              indicatorSeparator: () => ({ display: 'none' }),
              dropdownIndicator: () => ({ display: 'none' }),
              placeholder: (provided) => ({
                ...provided,
                color: 'gray',
              }),
              menu: (provided) => ({
                ...provided,
                borderRadius: '15px',
                marginTop: '0.5rem',
                paddingTop: '0.5rem',
                paddingBottom: '0.5rem',
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
                maxWidth: 'calc(100vw - 40px)', // Limit dropdown width
              }),
              option: (provided) => ({
                ...provided,
                display: 'flex',
                alignItems: 'center',
                padding: '2rem 1rem',
                gap: '0.5rem',
              }),
            },
          }}
          renderOption={(props, option) => (
            <div
              {...props}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              <MdLocationOn className="text-gray-600 mr-2" />
              <span>{option.label}</span>
            </div>
          )}
        />
        <button
          className="p-3 mr-1 mt-2 text-white bg-black rounded-full flex items-center justify-center"
        >
          <FiSearch className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default Search;
