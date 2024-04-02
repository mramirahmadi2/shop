import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import svgMarker from 'assets/icons/Vector.svg';
import { useEffect, useState } from 'react';

const LeafMap = ({ onLocationChange, editAdress }: { onLocationChange: any, editAdress?: string }) => {
  const tehranPosition: [number, number] = [35.6892, 51.3890];
  const [position, setPosition] = useState(tehranPosition);

  useEffect(() => {
    // تنظیم موقعیت فقط اگر آدرس ویرایش داده شده باشد
    if (editAdress) {
      // تبدیل آدرس به مختصات
      const geocodeAddress = async () => {
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(editAdress)}&format=json`);
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
    } else {
      // اگر آدرس ویرایش نشده باشد، موقعیت پیش‌فرض را استفاده کنید
      setPosition(tehranPosition);
    }
  }, [editAdress]);

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
    <MapContainer center={position} zoom={13} scrollWheelZoom={true} className={`${editAdress ? "w-full h-[25rem]" : "w-full h-[25rem]"}  z-0   `}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={customIcon}>
        {editAdress && (
          <Popup>
            {editAdress}
          </Popup>
        )}
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
