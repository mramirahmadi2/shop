import { useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import svgMarker from 'assets/icons/Vector.svg';
import 'leaflet/dist/leaflet.css';

const AddressPost = ({ address }: { address: string }) => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  useEffect(() => {
    // تبدیل آدرس به مختصات
    const geocodeAddress = async () => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`);
        const data = await response.json();
        if (data.length > 0) {
          const { lat, lon } = data[0];
          setPosition([parseFloat(lat), parseFloat(lon)]);
        }
      } catch (error) {
        console.error('Error geocoding address:', error);
      }
    };

    geocodeAddress();
  }, [address]);

  if (!position) {
    return null;
  }
  const customIcon = L.icon({
    iconUrl: svgMarker,
    iconSize: [30, 30], //در اینجا سایز لوگو را مشخص می کنیم
    iconAnchor: [15, 30], 
  });
  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={true} className="w-full h-[30rem] z-0 py-4">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}  icon={customIcon}>
        <Popup>
          {address}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default AddressPost;
