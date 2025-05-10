import { useEffect, useState } from 'react';

export const useGetLatLngFromPlace = (input : string) => {
  const [location, setLocation] = useState({ lat: null, lng: null });

  useEffect(() => {
    const fetchLatLng = async () => {
      const apiKey = 'YOUR_GOOGLE_API_KEY';
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(input)}&key=${apiKey}`
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        setLocation({ lat, lng });
      }
    };

    if (input) {
      fetchLatLng();
    }
  }, [input]);

  return location;
};
