import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleMap, MarkerF, InfoWindow } from '@react-google-maps/api';
import axios from 'axios';
import MapCard from './MapCard';

function MapRight({ properties, selectedLocation, onSelectProperty }) {
  const [markers, setMarkers] = useState([]);
  const [center, setCenter] = useState({ lat: 41.7151, lng: 44.8271 });
  const [zoom, setZoom] = useState(12);
  const [showNearbyOptions, setShowNearbyOptions] = useState(false);
  const [selectedNearbyTypes, setSelectedNearbyTypes] = useState([]);
  const [nearbyMarkers, setNearbyMarkers] = useState({});
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef();

  const API_KEY = "AIzaSyCzQePlVTWMps35sLtoq4DT7PN5n5_xGbg"; // Replace with your actual API Key

  // Geocode property locations and set markers
  const geocodeLocations = async () => {
    setLoading(true);
    const locationPromises = properties.map(async (property) => {
      const location = `${property.address}, ${property.city}, ${property.country}`;
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${API_KEY}`
        );
        const { lat, lng } = response.data.results[0].geometry.location;
        return { lat, lng, property };
      } catch (error) {
        console.error('Error fetching geocode:', error);
        return null;
      }
    });

    const newMarkers = (await Promise.all(locationPromises)).filter(Boolean);
    setMarkers(newMarkers);
    setLoading(false);
  };

  useEffect(() => {
    if (properties.length) {
      geocodeLocations();
    }
  }, [properties]);

  useEffect(() => {
    setCenter(selectedLocation || { lat: 41.7151, lng: 44.8271 });
  }, [selectedLocation]);

 //NEARBY PLACES GETTING...

  const fetchNearbyPlaces = useCallback(async () => {
    if (!mapRef.current) return;

    const { lat, lng } = mapRef.current.getCenter().toJSON();

    const placesByType = {};

    await Promise.all(
      selectedNearbyTypes.map(async (type) => {
        try {
          const response = await axios.get("https://new-real-estate-server.vercel.app/api/nearby-places", {
            params: { lat, lng, type },
          });
          if (response.data.status === "OK") {
            placesByType[type] = response.data.results.map((place) => ({
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng,
              name: place.name,
              rating: place.rating || 'N/A',
              type,
            }));
          }
        } catch (error) {
          console.error(`Error fetching ${type} nearby places:`, error);
        }
      })
    );
    setNearbyMarkers(placesByType);
  }, [selectedNearbyTypes]);

  // Refresh nearby places every second
  useEffect(() => {
    if (selectedNearbyTypes.length > 0) {
      const intervalId = setInterval(fetchNearbyPlaces, 1000);
      return () => clearInterval(intervalId); // Cleanup interval on unmount
    }
  }, [fetchNearbyPlaces, selectedNearbyTypes]);

  const handleNearbySelect = (type) => {
    const isSelected = selectedNearbyTypes.includes(type);
    const updatedTypes = isSelected
      ? selectedNearbyTypes.filter((t) => t !== type)
      : [...selectedNearbyTypes, type];

    setSelectedNearbyTypes(updatedTypes);
  };

  const containerStyle = {
    width: '100%',
    height: '500px',
    borderRadius: 10,
  };

  const getMarkerIcon = useCallback((type) => {
    const iconSize = new window.google.maps.Size(20, 20);
    const largeIconSize = new window.google.maps.Size(30, 30);
    switch (type) {
      case 'airport':
        return { url: '/airport.png', scaledSize: largeIconSize };
      case 'school':
        return { url: '/school.png', scaledSize: iconSize };
      case 'restaurant':
        return { url: '/food.png', scaledSize: iconSize };
      case 'gym':
        return { url: '/gym.png', scaledSize: iconSize };
      default:
        return { url: '', scaledSize: iconSize };
    }
  }, []);

  const handleMapClick = useCallback(() => {
    setSelectedPlace(null);
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedPlace(marker.property);
    onSelectProperty(marker.property);
  };

  const customMarkerIcon = {
    url: "/house.png", // Path to your custom marker image
    scaledSize: new window.google.maps.Size(40, 40), // Set size of the marker
    
  };
  return (
    <div className="relative">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={(map) => (mapRef.current = map)}
        onClick={handleMapClick}
      >
        {markers.map((marker, index) => (
          <MarkerF
            key={`property-${index}`}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => handleMarkerClick(marker)}
            icon={customMarkerIcon}
          />

        ))}
        {Object.values(nearbyMarkers).flat().map((place, index) => (
          <MarkerF
            key={`nearby-${index}`}
            position={{ lat: place.lat, lng: place.lng }}
            icon={getMarkerIcon(place.type)}
            onClick={() => handleMarkerClick(place)}
          />
        ))}

        {selectedPlace && selectedPlace.lat && selectedPlace.lng && (
          <InfoWindow
            position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div style={{ maxWidth: '200px' }}>
              <h3>{selectedPlace.name}</h3>
              <p>{selectedPlace.type}</p>
              <p>Rating: {selectedPlace.rating} ⭐</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {selectedPlace && (
        <div className="absolute bottom-40 left-96 w-[150px] text-lg">
          <MapCard card={selectedPlace} />
        </div>
      )}

      {loading && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-md">
          Loading...
        </div>
      )}

      <button
        onClick={() => setShowNearbyOptions(!showNearbyOptions)}
        className="absolute bottom-4 left-4 bg-black text-white px-4 py-2 rounded-lg z-10 flex items-center hover:bg-gray-800 transition-colors duration-200"
      >
        Nearby
      </button>

      {showNearbyOptions && (
        <div className="absolute bottom-20 left-4 bg-white shadow-lg p-4 rounded-md w-64 z-20">
          <div className="flex flex-col space-y-2">
            {['airport', 'school', 'restaurant', 'gym'].map((type) => (
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

export default MapRight;
