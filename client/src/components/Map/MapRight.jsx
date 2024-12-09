import React, { useState, useEffect, useRef } from "react";
import { GoogleMap, MarkerF, InfoWindow } from "@react-google-maps/api";

function MapRight() {
  const [markers, setMarkers] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const mapRef = useRef();

  const containerStyle = {
    width: "100%",
    height: "500px",
    borderRadius: 10,
  };

  const center = { lat: 41.7151, lng: 44.8271 }; // Center of Tbilisi

  // Generate random property details
  const generatePropertyDetails = () => ({
    room: Math.floor(Math.random() * 5) + 1,
    bathrooms: Math.floor(Math.random() * 3) + 1,
    parking: Math.random() > 0.5 ? "Yes" : "No",
    sqft: Math.floor(Math.random() * 2000) + 500,
  });

  // Generate random points around Tbilisi
  useEffect(() => {
    const generateRandomPoints = () => {
      const points = [];
      for (let i = 0; i < 5; i++) {
        const lat = 41.7151 + (Math.random() - 0.5) * 0.1;
        const lng = 44.8271 + (Math.random() - 0.5) * 0.1;
        points.push({
          id: i,
          lat,
          lng,
          title: `Property ${i + 1}`,
          image: `https://picsum.photos/200/150?random=${i + 1}`, // Random image
          details: generatePropertyDetails(),
        });
      }
      setMarkers(points);
    };

    generateRandomPoints();
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedPlace(marker);
  };

  const handleMapClick = () => {
    setSelectedPlace(null);
  };

  return (
    <div className="relative">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={(map) => (mapRef.current = map)}
        onClick={handleMapClick}
      >
        {markers.map((marker) => (
          <MarkerF
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => handleMarkerClick(marker)}
          />
        ))}

        {selectedPlace && (
          <InfoWindow
            position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
            onCloseClick={() => setSelectedPlace(null)}
          >
            <div style={{ maxWidth: "200px" }}>
              <h3>{selectedPlace.title}</h3>
              <img
                src={selectedPlace.image}
                alt={selectedPlace.title}
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />
              <p><strong>Rooms:</strong> {selectedPlace.details.room}</p>
              <p><strong>Bathrooms:</strong> {selectedPlace.details.bathrooms}</p>
              <p><strong>Parking:</strong> {selectedPlace.details.parking}</p>
              <p><strong>Square Feet:</strong> {selectedPlace.details.sqft} sq ft</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}

export default MapRight;
