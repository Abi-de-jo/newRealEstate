import React, { useState, useEffect, useMemo } from 'react';
import { GoogleMap, MarkerF } from '@react-google-maps/api';
import axios from 'axios';

function GoogleMapSection({ address, city, country, metro }) {
  const [center, setCenter] = useState({
    lat: 41.7151, // Default lat for Tbilisi
    lng: 44.8271, // Default lng for Tbilisi
  });

  // Function to get lat/lng using Google Geocoding API
  const geocodeLocation = async (location) => {
    const API_KEY = "AIzaSyCzQePlVTWMps35sLtoq4DT7PN5n5_xGbg";
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${API_KEY}`
      );
      const { lat, lng } = response.data.results[0].geometry.location;
      
      // Update center only if the coordinates are different
      if (lat !== center.lat || lng !== center.lng) {
        setCenter({ lat, lng });
      }
    } catch (error) {
      console.error('Error fetching geocode:', error);
    }
  };

  // Effect to geocode whenever address, city, or country changes
  useEffect(() => {
    if (address || city || country) {
      const fullLocation = `${address}, ${city}, ${country}`;
      geocodeLocation(fullLocation);
    }
  }, [address, city, country]);

  // Memoized container style
  const containerStyle = useMemo(
    () => ({
      width: '100%',
      height: '400px',
      borderRadius: 10,
    }),
    []
  );

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
        <MarkerF position={center} />
      </GoogleMap>
    </div>
  );
}

export default GoogleMapSection;
