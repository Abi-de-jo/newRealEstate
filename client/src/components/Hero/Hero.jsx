import React from "react";
import SearchBar from "../GoogleAddressSearch";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation("hero");

  const handleSearch = (location) => {
    console.log("Selected Location:", location);
    // You can set coordinates here or handle additional functionality based on `location`
  };

  return (
    <div
      className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] bg-cover bg-center"
      style={{
        backgroundImage: "url('/geo4.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
          {t("title")}
        </h1>

        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-white text-base sm:text-lg mb-6 sm:mb-8">
          {["buy", "rent", "sell"].map((label) => (
            <a
              href="/buy"
              key={label}
              className="relative text-white after:content-[''] after:absolute after:bottom-[-2px] sm:after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-transparent hover:after:bg-white after:scale-0 hover:after:scale-100 after:origin-left transition-transform duration-300"
            >
              {t(label)}
            </a>
          ))}
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-md px-4">
          <SearchBar
            selectedAddress={handleSearch}
            setCoordinates={(coords) => console.log("Coordinates:", coords)}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
