"use client";
import { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Box } from '@mantine/core';

// Create a custom red marker icon
const createRedMarkerIcon = () => {
  return L.divIcon({
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36">
      <path fill="#e90808" d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
    </svg>`,
    className: "custom-pin",
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
  });
};

const MapComponent = ({ coordinates, title, address }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!coordinates || !mapRef.current) return;
    
    // Initialize map if it doesn't exist
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView(
        [coordinates.lat, coordinates.lng], 
        15
      );
      
      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstanceRef.current);
    } else {
      // If map already exists, just update the view
      mapInstanceRef.current.setView([coordinates.lat, coordinates.lng], 15);
    }
    
    // Clear existing markers
    mapInstanceRef.current.eachLayer(layer => {
      if (layer instanceof L.Marker) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });
    
    // Create custom red marker icon
    const redMarkerIcon = createRedMarkerIcon();
    
    // Add marker with popup
    const marker = L.marker([coordinates.lat, coordinates.lng], { icon: redMarkerIcon }).addTo(mapInstanceRef.current);
    
    if (title || address) {
      let popupContent = '';
      if (title) popupContent += `<strong>${title}</strong>`;
      if (address) popupContent += `<br>${address}`;
      
      // Add a link to Google Maps
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`;
      popupContent += `<br><br><a href="${googleMapsUrl}" target="_blank" style="color: #e90808; text-decoration: underline;">View on Google Maps</a>`;
      
      marker.bindPopup(popupContent).openPopup();
    }
    
    // Add click handler to redirect to Google Maps
    marker.on('click', () => {
      const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`;
      // Open popup first to show info
      marker.openPopup();
    });
    
    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [coordinates, title, address]);

  return (
    <Box 
      ref={mapRef} 
      style={{ 
        height: '100%', 
        minHeight: '300px', 
        width: '100%', 
        borderRadius: '8px',
        overflow: 'hidden'
      }} 
    />
  );
};

export default MapComponent;