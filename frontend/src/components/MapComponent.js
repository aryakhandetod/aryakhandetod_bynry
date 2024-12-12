import React, { useState, useEffect } from 'react';
import L from 'leaflet';

const MapComponent = ({ profile }) => {
  const [location, setLocation] = useState(null);
  const [mapError, setMapError] = useState(null);

  useEffect(() => {
    if (profile && profile.address) {
      const fetchCoordinates = async () => {
        try {
          const staticAddress = profile.address;  
          const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${staticAddress}`
          );
          const data = await response.json();
          console.log('Geocoding API Response:', data);

          if (data && data.length > 0) {
            const { lat, lon } = data[0];
            setLocation({ lat: parseFloat(lat), lon: parseFloat(lon) });
          } else {
            setMapError('Unable to find location for the provided address.');
          }
        } catch (error) {
          setMapError('Error fetching location.');
          console.error(error);
        }
      };
      fetchCoordinates();
    }
  }, [profile]);

  useEffect(() => {
    if (location) {
      // Initialize the map only when location is available
      const map = L.map('map').setView([location.lat, location.lon], 13); // Center map at location

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker([location.lat, location.lon]).addTo(map)
        .bindPopup('Location: ' + profile.address)
        .openPopup();

      // Cleanup map when the component is unmounted or when location changes
      return () => {
        map.remove();
      };
    }
  }, [location, profile]);  // Re-run map logic when location changes

  return (
    <div>
      <h3>Location of {profile.name}</h3>
      {mapError && <p className="error">{mapError}</p>}
      <div id="map" style={{ height: '400px', width: '100%' }}></div>
    </div>
  );
};

export default MapComponent;
