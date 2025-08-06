import React, { useState } from 'react';
import { MapContainer, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import styled from 'styled-components';

// --- Styled Components ---
const PageContainer = styled.div`
  display: flex;
  /* CORRECTED: Calculate height to be viewport height minus navbar height */
  height: calc(100vh - 120px); /* Assuming navbar is roughly 120px tall */
  /* CORRECTED: Push the container down to start below the fixed navbar */
  margin-top: 120px;
  width: 100%;
`;

const MapWrapper = styled.div`
  flex-grow: 1;
  height: 100%;
  .leaflet-container {
    height: 100%;
  }
`;

const FormPanel = styled.div`
  width: 350px;
  padding: 2rem;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  box-shadow: -5px 0 15px rgba(0,0,0,0.1);
  z-index: 1000;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 15px 20px;
  border-radius: 8px;
  border: none;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  background-color: #f0ad4e;
  color: white;
  margin-top: auto;
  &:hover {
    background-color: #ec971f;
  }
`;

// --- DefineAreaPage Component ---
const DefineAreaPage = () => {
  const defaultPosition = [18.5204, 73.8567]; // Pune, India
  const [drawnLayers, setDrawnLayers] = useState([]);
  const [formData, setFormData] = useState({
      areaDetail: '',
      city: '',
      pinCode: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const onCreated = (e) => {
    const { layerType, layer } = e;
    if (layerType === 'polygon') {
      const latlngs = layer.getLatLngs()[0].map(latlng => ({ lat: latlng.lat, lng: latlng.lng }));
      console.log('Polygon created:', latlngs);
      setDrawnLayers(prev => [...prev, latlngs]);
    }
  };
  
  const onEdited = (e) => {
    // Logic to handle editing existing polygons
    console.log('Layers edited:', e.layers);
  };
  
  const onDeleted = (e) => {
    // Logic to handle deleting polygons
    console.log('Layers deleted:', e.layers);
  };

  const handleConfirm = () => {
    if (drawnLayers.length === 0) {
        alert("Please draw at least one delivery area.");
        return;
    }
    console.log("--- Delivery Area Data ---");
    console.log("Form Data:", formData);
    console.log("Polygon Coordinates:", drawnLayers);
    alert("Delivery area data has been logged to the console.");
  };

  return (
    <PageContainer>
      <FormPanel>
        <Title>Define Delivery Area</Title>
        <Input name="areaDetail" placeholder="Area detail" value={formData.areaDetail} onChange={handleInputChange} />
        <Input name="city" placeholder="City" value={formData.city} onChange={handleInputChange} />
        <Input name="pinCode" placeholder="Pin code" value={formData.pinCode} onChange={handleInputChange} />
        <Button onClick={handleConfirm}>Confirm & Continue</Button>
      </FormPanel>
      <MapWrapper>
        <MapContainer center={defaultPosition} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FeatureGroup>
            <EditControl
              position="topright"
              onCreated={onCreated}
              onEdited={onEdited}
              onDeleted={onDeleted}
              draw={{
                rectangle: false,
                circle: false,
                circlemarker: false,
                marker: false,
                polyline: false,
              }}
            />
          </FeatureGroup>
        </MapContainer>
      </MapWrapper>
    </PageContainer>
  );
};

export default DefineAreaPage;
