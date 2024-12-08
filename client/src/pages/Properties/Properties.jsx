import React, { useState, useEffect, useMemo } from "react";
import { BuildingIcon, ChevronDown, X } from 'lucide-react';
import useProperties from "../../hooks/useProperties";
import PuffLoader from "react-spinners/PuffLoader";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import MapRight from "../../components/Map/MapRight";
import SearchInput from "../../components/Search";
import { useLocation } from "react-router-dom";
import { Briefcase, Home, TreePine, LayoutGrid } from "lucide-react";
import { FaBuilding } from "react-icons/fa";
import { useTranslation } from "react-i18next";
 // import { useAuth0 } from "@auth0/auth0-react";
import "./properties.css"

const propertyOptions = [
  { label: "Any", icon: <LayoutGrid /> },
  { label: "Office", icon: <Briefcase /> },
  { label: "Commercial", icon: <FaBuilding /> },
  { label: "Cottage", icon: <Home /> },
  { label: "Apartment", icon: <BuildingIcon /> },
  { label: "Land", icon: <TreePine /> },
  { label: "House", icon: <Home /> },
];

const PropertyTypeDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {t} = useTranslation("prop")
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-3 bg-white border rounded-full shadow-sm text-gray-800"
      >
       {t("properties.propertyType")}
        <ChevronDown className="ml-2 w-4 h-4" />
      </button>
      {isOpen && (
        <div className="absolute mt-2 bg-white border rounded-lg shadow-lg w-72 p-4 z-40">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Property type</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {propertyOptions.map((option) => (
              <button
                key={option.label}
                onClick={() => {
                  onChange(option.label);
                  setIsOpen(false);
                }}
                className={`flex flex-col items-center p-2 border rounded-lg hover:bg-gray-100 ${
                  value === option.label ? "bg-black text-white" : "text-gray-800"
                }`}
              >
                <div className="text-lg mb-2">{option.icon}</div>
                <span className="text-sm">{option.label}</span>
              </button>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const RoomsDropdown = ({ minrooms, maxrooms, minBathrooms, maxBathrooms, onChange }) => {
  return (
    <div className="rooms-dropdown">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold abi">Rooms</h3>
      </div>
      {["Bedrooms", "Bathrooms"].map((label, idx) => (
        <div key={label} className="mb-4">
          <label className="block font-medium mb-2">{label}</label>
          <div className="flex gap-2">
            <select
              value={idx === 0 ? minrooms : minBathrooms}
              onChange={(e) => onChange(idx === 0 ? "minrooms" : "minBathrooms", e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">No min</option>
              {[...Array(6)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <span className="mx-1">-</span>
            <select
              value={idx === 0 ? maxrooms : maxBathrooms}
              onChange={(e) => onChange(idx === 0 ? "maxrooms" : "maxBathrooms", e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">No max</option>
              {[...Array(6)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
};

const PriceHistogram = ({ min, max, minValue, maxValue, onChange }) => {
  const bars = 30;
  const [heights, setHeights] = useState([]);
  useEffect(() => setHeights(Array.from({ length: bars }, () => Math.random() * 100)), [bars]);

  return (
    <div className="p-4 w-full sm:w-[300px]">
      <div className="flex justify-between mb-4">
        <button className="bg-black text-white px-4 py-2 rounded-full">List price</button>
      </div>
      <div className="relative h-24 mb-4 flex items-end gap-0.5">
        {heights.map((height, i) => (
          <div
            key={i}
            className="w-2 transform transition-all duration-500 ease-in-out"
            style={{
              height: `${height}%`,
              backgroundColor: i >= (minValue / max) * bars && i <= (maxValue / max) * bars ? "#ff69b4" : "#e5e7eb",
              transitionDelay: `${i * 30}ms`,
            }}
          />
        ))}
      </div>
      <div className="relative w-full h-2 bg-gray-200 rounded-full mt-4">
        <div
          className="absolute h-2 rounded-full"
          style={{ left: `${((minValue - min) / (max - min)) * 100}%`, right: `${100 - ((maxValue - min) / (max - min)) * 100}%`, background: "#ff69b4" }}
        />
        {[minValue, maxValue].map((val, idx) => (
          <input
            key={idx}
            type="range"
            min={min}
            max={max}
            step={100}
            value={val}
            onChange={(e) => onChange(idx === 0 ? "minPrice" : "maxPrice", Number(e.target.value))}
            className="absolute w-full h-2 bg-transparent appearance-none cursor-pointer pointer-events-none"
            style={{ pointerEvents: "auto" }}
          />
        ))}
      </div>
      <div className="mt-4 flex justify-between text-sm">
        <input
          type="number"
          value={minValue}
          onChange={(e) => onChange("minPrice", Number(e.target.value))}
          className="w-[45%] p-2 border rounded"
          placeholder="Min Price"
          min={min}
          max={maxValue}
        />
        <input
          type="number"
          value={maxValue}
          onChange={(e) => onChange("maxPrice", Number(e.target.value))}
          className="w-[45%] p-2 border rounded"
          placeholder="Max Price"
          min={minValue}
          max={max}
        />
      </div>
      <div className="mt-4">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          Price reduced
        </label>
      </div>
      <div className="mt-4">
        <a href="/" className="text-blue-600 hover:underline">
          How much can I afford?
        </a>
      </div>
    </div>
  );
};

const FilterDropdown = ({ label, options, value, onChange, multiple = false, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative h-[48px] px-4 py-2 text-left bg-white border border-gray-300 rounded-full hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-400 flex items-center gap-2"
      >
        <span className="block font-medium">{label}</span>
        <ChevronDown className="w-4 h-4" />
      </button>
      {isOpen && (
        <>
          <div className="fixed inset-0 bg-transparent z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute z-50 w-auto mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
            {children || (
              <div className="py-2">
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      if (multiple) {
                        onChange(value.includes(option) ? value.filter((v) => v !== option) : [...value, option]);
                      } else {
                        onChange(option);
                        setIsOpen(false);
                      }
                    }}
                    className={`block w-full px-4 py-2 text-sm text-left hover:bg-gray-100 ${
                      multiple ? (value.includes(option) ? "bg-gray-100" : "") : value === option ? "bg-gray-100" : ""
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const Properties = () => {
  const location = useLocation();
  // const { user } = useAuth0();
  const {t} = useTranslation("prop")
  const searchQuery = location.state?.searchQuery || "";
  const { data, isError, isLoading } = useProperties();
  const [selectedAddress, setSelectedAddress] = useState();
  const [coordinates, setCoordinates] = useState();
  const [viewMode, setViewMode] = useState("list");
  const [isSticky, setIsSticky] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: 0,
    discount: 0,
    maxPrice: 1000000,
    propertyType: "",
    parking: "",
    minrooms: "",
    maxrooms: "",
    minBathrooms: "",
    maxBathrooms: "",
    district: "",
    residencyType: "",
    amenities: [],
  });

  const handleFilterChange = (key, value) => setFilters((prevFilters) => ({ ...prevFilters, [key]: value }));

  const resetFilters = () => {
    setSelectedAddress(null);
    setCoordinates(null);
    setFilters({
      minPrice: 0,
      discount: 0,
      maxPrice: 1000000,
      propertyType: "",
      parking: "",
      minrooms: "",
      maxrooms: "",
      minBathrooms: "",
      maxBathrooms: "",
      district: "",
      residencyType: "",
      amenities: [],
    });
  };

  const filteredProperties = useMemo(
    () =>
      data?.filter((card) => {
        // Determine the price to filter by: use discountPrice if available, otherwise fallback to price
        const effectivePrice = card.discount || card.price;
  
        return (
          (!searchQuery || card.address.toLowerCase().includes(searchQuery.toLowerCase())) &&
          (!selectedAddress || card.address.includes(selectedAddress.label)) &&
          effectivePrice >= filters.minPrice &&
          effectivePrice <= filters.maxPrice &&
          (!filters.propertyType ||
            filters.propertyType === "Any" ||
            card.propertyType.toLowerCase() === filters.propertyType.toLowerCase()) &&
          (!filters.parking ||
            filters.parking === "Any" ||
            (filters.parking === "3+" ? card.parking >= 3 : card.parking === parseInt(filters.parking))) &&
          (!filters.minrooms || card.rooms >= parseInt(filters.minrooms)) &&
          (!filters.maxrooms || card.rooms <= parseInt(filters.maxrooms)) &&
          (!filters.minBathrooms || card.bathrooms >= parseInt(filters.minBathrooms)) &&
          (!filters.maxBathrooms || card.bathrooms <= parseInt(filters.maxBathrooms)) &&
          (!filters.district || filters.district === "Any" || card.district === filters.district) &&
          (!filters.residencyType || filters.residencyType === "Any" || card.residencyType === filters.residencyType) &&
          (filters.amenities.length === 0 ||
            filters.amenities.every((amenity) => card.amenities?.includes(amenity.toLowerCase())))
        );
      }),
    [data, searchQuery, selectedAddress, filters]
  );
  

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 150);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isError) return <div className="wrapper"><span>Error while fetching data</span></div>;
  if (isLoading) return <div className="wrapper flexCenter" style={{ height: "60vh" }}><PuffLoader size={80} color="#4066ff" aria-label="puff-loading" /></div>;

  // const handleLike = (propertyId) => {
  //   console.log("Liked Property ID:", propertyId);
  //   if (user?.email) {
  //     console.log("User Email:", user.email);
  //   } else {
  //     console.log("User is not authenticated.");
  //   }
  // };

  return (
    <div className="p-2 sm:p-4 mt-[50px]">
      <div
        className={`py-2 sm:py-4 px-2 sm:px-6 flex flex-wrap items-center justify-between gap-2 sm:gap-4 transition-all duration-300 ${
          isSticky ? "sticky top-0 bg-white shadow-lg z-50" : "relative"
        }`}
        id="abi"
      >
      <div className="flex flex-wrap items-center gap-2 sm:gap-4">
  {/* Search Input Container */}
  <div className="relative w-full sm:w-auto flex-grow">
    <div className="flex items-center rounded-full shadow-sm overflow-hidden">
      <SearchInput
        selectedAddress={setSelectedAddress}
        setCoordinates={setCoordinates}
        className="w-full px-4 py-2 text-sm sm:text-base"
      />
      {selectedAddress && (
        <button
          onClick={() => {
            setSelectedAddress(null);
            setCoordinates(null);
          }}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  </div>

  {/* Filter Dropdowns */}
  <div className="flex flex-wrap gap-2 sm:gap-4 w-full sm:w-auto">
    {/* Price Filter */}
    <FilterDropdown
      label={t("properties.priceRange")}
      value={`$${filters.minPrice.toLocaleString()} - $${filters.maxPrice.toLocaleString()}`}
      onChange={() => {}}
      className="w-full sm:w-auto"
    >
      <PriceHistogram
        min={0}
        max={1000000}
        minValue={filters.minPrice}
        maxValue={filters.maxPrice}
        onChange={handleFilterChange}
      />
    </FilterDropdown>

    {/* Property Type Filter */}
    <PropertyTypeDropdown
      value={filters.propertyType}
      onChange={(value) => handleFilterChange("propertyType", value)}
      className="w-full sm:w-auto"
    />

    {/* Rooms Filter */}
    <FilterDropdown
      label={t("properties.rooms")}
      onChange={() => {}}
      className="w-full  sm:w-auto"
    >
      <RoomsDropdown
        minrooms={filters.minrooms}
        maxrooms={filters.maxrooms}
        minBathrooms={filters.minBathrooms}
        maxBathrooms={filters.maxBathrooms}
        onChange={handleFilterChange}
      />
    </FilterDropdown>

    {/* Listing Status Filter */}
    <FilterDropdown
      label={t("properties.listingStatus")}
      options={["Any", "New", "Old", "Mixed"]}
      value={filters.residencyType}
      onChange={(value) => handleFilterChange("residencyType", value)}
      className="w-full sm:w-auto"
    />

    {/* Amenities Filter */}
    <FilterDropdown
      label={t("properties.more")}
      options={["Pool", "Gym", "Wi-Fi", "Air cond.", "Parking", "Pet Friendly", "Garden", "Balcony", "Laundry"]}
      value={filters.amenities}
      onChange={(value) => handleFilterChange("amenities", value)}
      multiple
      className="w-full sm:w-auto"
    />

    {/* Clear All Button */}
    <button
      onClick={resetFilters}
      className="w-full sm:w-auto h-[48px] px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-full hover:bg-gray-50"
    >
      {t("properties.clearAll")}
    </button>
  </div>
</div>


        <div className="flex bg-gray-100 rounded-full p-1 w-full sm:w-36">
          <button
            onClick={() => setViewMode("list")}
            className={`flex-1 py-2 rounded-full transition ${viewMode === "list" ? "bg-white shadow-md font-semibold" : "text-gray-500"}`}
          >
            {t("properties.listView")}
          </button>
          <button
            onClick={() => setViewMode("map")}
            className={`flex-1 py-2 rounded-full transition ${viewMode === "map" ? "bg-white shadow-md font-semibold" : "text-gray-500"}`}
          >
            {t("properties.mapView")}
          </button>
        </div>
      </div>

      {viewMode === "list" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="col-span-1 lg:col-span-12 p-2 sm:p-4 overflow-y-auto max-h-[80vh]">
            {filteredProperties?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProperties.map((card, i) => (
                  <PropertyCard card={card} key={i} />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[500px] text-gray-500">
                No properties found. Please adjust your filters.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="col-span-1 lg:col-span-6 p-2 sm:p-4 overflow-y-auto max-h-[80vh]">
            {filteredProperties?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredProperties.map((card, i) => (
                  <PropertyCard 
                    isLoading={true}
                    card={card}
                    key={i} 
                    onLike={(id) => console.log("Liked Property ID:", id)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                No properties found. Please adjust your filters.
              </div>
            )}
          </div>
          <div className="col-span-1 lg:col-span-6 p-2 sm:p-4">
            <MapRight properties={filteredProperties} selectedLocation={coordinates} onSelectProperty={() => {}} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Properties;

