import { useState, useEffect } from 'react';
import ShowToastify from './ShowToastify';

const useGeoLocation = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      ShowToastify({ error: "Geolocation is not supported by this browser." });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (err) => {
        setError(err?.message);
      }
    );
  }, []);

  return { ...location, error };
};

export default useGeoLocation;
