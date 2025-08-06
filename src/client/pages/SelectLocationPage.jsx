import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import styled from 'styled-components';

// --- Styled Components ---
const PageContainer = styled.div`
  position: relative;
  /* CORRECTED: Calculate height to be viewport height minus navbar height */
  height: calc(100vh - 120px); /* Assuming navbar is roughly 120px tall */
  /* CORRECTED: Push the container down to start below the fixed navbar */
  margin-top: 120px;
  width: 100%;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  .leaflet-container {
    width: 100%;
    height: 100%;
  }
`;

const CenterMarker = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%); /* Adjust to have pin point at center */
  z-index: 401; /* Must be higher than map tiles (400) */
  font-size: 3rem;
  color: #007bff;
`;

const InfoBox = styled.div`
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: white;
    padding: 10px 15px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    z-index: 401;
    font-weight: bold;
`;

const LocateButton = styled.button`
  position: absolute;
  top: 70px; /* Position below the info box */
  left: 50%;
  transform: translateX(-50%);
  z-index: 401;
  padding: 10px 20px;
  font-size: 14px;
  background-color: #fff;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  &:hover {
    background-color: #f8f8f8;
  }
`;

const ConfirmButton = styled.button`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 401;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  background-color: #f0ad4e;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  &:hover {
    background-color: #ec971f;
  }
`;

// --- MapController Component ---
// A helper component to handle map events and imperative actions
function MapController({ onCenterChange, setMap }) {
  const map = useMap();
  setMap(map); // Pass the map instance up to the parent

  useMapEvents({
    move() {
      onCenterChange(map.getCenter());
    },
  });
  return null;
}

// --- SelectLocationPage Component ---
const SelectLocationPage = () => {
  const defaultPosition = [18.5204, 73.8567]; // Pune, India
  const [center, setCenter] = useState({ lat: defaultPosition[0], lng: defaultPosition[1] });
  const [map, setMap] = useState(null); // State to hold the map instance

  const handleConfirm = () => {
    console.log('Selected Location:', center);
    alert(`Location Confirmed!\nLat: ${center.lat.toFixed(6)}\nLng: ${center.lng.toFixed(6)}`);
  };

  const handleLocateUser = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (map) {
          map.flyTo([latitude, longitude], 15); // Animate map to user's location
        }
      },
      () => {
        alert("Could not get your location. Please enable location services.");
      }
    );
  };

  return (
    <PageContainer>
      <InfoBox>Move the map to adjust your location</InfoBox>
      <LocateButton onClick={handleLocateUser}>Use My Location</LocateButton>
      <CenterMarker>📍</CenterMarker>
      <MapWrapper>
        <MapContainer center={defaultPosition} zoom={15} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapController onCenterChange={setCenter} setMap={setMap} />
        </MapContainer>
      </MapWrapper>
      <ConfirmButton onClick={handleConfirm}>
        Confirm & Continue
      </ConfirmButton>
    </PageContainer>
  );
};

export default SelectLocationPage;
