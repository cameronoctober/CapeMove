import { useEffect, useState, useRef } from 'react';

export function useGeolocation() {
  const [position, setPosition] = useState<{ lat: number; lon: number } | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const watcher = useRef<number | null>(null);

  const requestPermission = () => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported');
      return;
    }
    watcher.current = navigator.geolocation.watchPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      (err) => {
        setError(err.message);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
    ) as unknown as number;
  };

  useEffect(() => {
    return () => {
      if (watcher.current !== null && navigator.geolocation) {
        navigator.geolocation.clearWatch(watcher.current);
      }
    };
  }, []);

  return { position, error, requestPermission };
}
