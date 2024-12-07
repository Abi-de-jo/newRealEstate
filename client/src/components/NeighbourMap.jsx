import React, { useState, useEffect, useRef, useCallback } from "react";
import { GoogleMap, MarkerF, InfoWindow } from "@react-google-maps/api";
import axios from "axios";

const API_KEY = "AIzaSyCzQePlVTWMps35sLtoq4DT7PN5n5_xGbg";

function Neighborhood({ address, city, country }) {
  const [center, setCenter] = useState({
    lat: 41.7151,
    lng: 44.8271,
  });
  const [nearbyMarkers, setNearbyMarkers] = useState({});
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showNearbyOptions, setShowNearbyOptions] = useState(false);
  const [selectedNearbyTypes, setSelectedNearbyTypes] = useState([
    "airport",
    "school",
    "restaurant",
    "gym",
  ]); // Default all types as selected
  const mapRef = useRef();

  const geocodeLocation = async () => {
    const location = `${address}, ${city}, ${country}`;
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${API_KEY}`
      );
      const { lat, lng } = response.data.results[0].geometry.location;
      setCenter({ lat, lng });
    } catch (error) {
      console.error("Error fetching geocode:", error);
    }
  };

  const fetchNearbyPlaces = useCallback(async () => {
    if (!mapRef.current) return;

    const { lat, lng } = mapRef.current.getCenter().toJSON();

    const places = [];

    for (const type of selectedNearbyTypes) {
      try {
        const response = await axios.get("http://localhost:3000/api/nearby-places", {
          params: {
            lat,
            lng,
            type,
            radius: 2000, // 2 km radius
          },
        });
        if (response.data.results) {
          places.push(
            ...response.data.results.map((place) => ({
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng,
              name: place.name,
              type,
              rating: place.rating || "N/A",
            }))
          );
        }
      } catch (error) {
        console.error(`Error fetching nearby ${type}:`, error);
      }
    }
    setNearbyMarkers(places);
  }, [selectedNearbyTypes]);

  useEffect(() => {
    if (address || city || country) {
      geocodeLocation();
    }
  }, [address, city, country]);

  useEffect(() => {
    if (selectedNearbyTypes.length > 0) {
      const intervalId = setInterval(fetchNearbyPlaces, 1000);
      return () => clearInterval(intervalId);
    }
  }, [fetchNearbyPlaces, selectedNearbyTypes]);

  const containerStyle = {
    width: "100%",
    height: "500px",
    borderRadius: "10px",
  };

  const handleMarkerClick = (place) => {
    setSelectedPlace(place);
  };

  const handleNearbySelect = (type) => {
    const isSelected = selectedNearbyTypes.includes(type);
    const updatedTypes = isSelected
      ? selectedNearbyTypes.filter((t) => t !== type)
      : [...selectedNearbyTypes, type];

    setSelectedNearbyTypes(updatedTypes);
  };

  const getMarkerIcon = useCallback((type) => {
    const iconSize = new window.google.maps.Size(20, 20);
    switch (type) {
      case "airport":
        return { url: "/airport.png", scaledSize: iconSize };
      case "school":
        return { url: "/school.png", scaledSize: iconSize };
      case "restaurant":
        return { url: "/food.png", scaledSize: iconSize };
      case "gym":
        return { url: "/gym.png", scaledSize: iconSize };
      default:
        return { url: "", scaledSize: iconSize };
    }
  }, []);

  return (
    <div className="relative">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={(map) => (mapRef.current = map)}
      >
        <MarkerF position={center} />

        {Object.values(nearbyMarkers).flat().map((place, index) => (
          <MarkerF
            key={`nearby-${index}`}
            position={{ lat: place.lat, lng: place.lng }}
            icon={getMarkerIcon(place.type)}
            onClick={() => handleMarkerClick(place)}
          />
        ))}

        {selectedPlace && (
          <InfoWindow
            position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div className="max-w-[200px]">
              <h3 className="font-bold">{selectedPlace.name}</h3>
              <p className="capitalize">{selectedPlace.type}</p>
              <p>Rating: {selectedPlace.rating} ⭐</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      <button
        onClick={() => setShowNearbyOptions(!showNearbyOptions)}
        className="absolute bottom-4 left-4  text-white px-4 py-2 rounded-lg z-10 flex items-center hover:bg-gray-800 transition-colors duration-200"
      >
         
      </button>

      {showNearbyOptions && (
        <div className="absolute bottom-20 left-4 bg-white shadow-lg p-4 rounded-md w-64 z-20">
          <div className="flex flex-col space-y-2">
            {["airport", "school", "restaurant", "gym"].map((type) => (
              <label key={type} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedNearbyTypes.includes(type)}
                  onChange={() => handleNearbySelect(type)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="text-gray-700 capitalize">{type}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Neighborhood;
