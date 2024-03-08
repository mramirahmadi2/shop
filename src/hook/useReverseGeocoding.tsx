import { useState, useEffect } from 'react';

const useReverseGeocoding = ({location, mapClicked}:{location:any, mapClicked:any}) => {
  const key = "3465314b34e941ba9e1b2a3af7c3929d";
  const [mapAddress, setMapAddress] = useState('');
  const [userAddress, setUserAddress] = useState('');

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const response = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${location.lat}+${location.lng}&key=${key}`
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          setMapAddress(data.results[0].formatted);
          setUserAddress(data.results[0].formatted);
        }
      } catch (error) {
        console.error('Error fetching address:', error);
      }
    };

    if (mapClicked) {
      fetchAddress();
    }
  }, [location, mapClicked, key]);

  return { mapAddress, userAddress };
};

export default useReverseGeocoding;
