import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import svgMarker from 'assets/icons/Vector.svg';
import { useState } from 'react';

const LeafMap = ({ onLocationChange }: { onLocationChange: any }) => {
  const tehranPosition: [number, number] = [35.6892, 51.3890];
  const [position, setPosition] = useState(tehranPosition);

  const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng;
    setPosition([lat, lng]);
    onLocationChange({ lat, lng });
  };

  const customIcon = L.icon({
    iconUrl: svgMarker,
    iconSize: [30, 30],
    iconAnchor: [15, 30], 
  });

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={true} className="w-full h-[30rem] z-0 py-4">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={customIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <MapClickHandler onMapClick={handleMapClick} />
    </MapContainer>
  );
};

const MapClickHandler = ({ onMapClick }: { onMapClick: (e: any) => void }) => {
  const map = useMapEvents({
    click: (e) => {
      onMapClick(e);
    },
  });

  return null;
};

export default LeafMap;
