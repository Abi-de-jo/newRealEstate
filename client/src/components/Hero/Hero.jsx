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
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        {/* Title */}
        <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
          {t("title")}
        </h1>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6 text-white text-sm sm:text-lg mb-6 sm:mb-8">
          {["buy", "rent", "sell"].map((label) => (
            <a
              href="/"
              key={label}
              className="relative text-white after:content-[''] after:absolute after:bottom-[-2px] sm:after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-transparent hover:after:bg-white after:scale-0 hover:after:scale-100 after:origin-left transition-transform duration-300"
            >
              {t(label)}
            </a>
          ))}
        </div>

        {/* Search Bar */}
        <div className="w-full px-4">
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
