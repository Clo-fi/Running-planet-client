import { useEffect, useState } from 'react';

interface Coordinates {
  myLat: number;
  myLot: number;
}

const useGetLocation = (): Coordinates => {
  const [coordinates, setCoordinates] = useState<Coordinates>({
    myLat: 0,
    myLot: 0,
  });

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            const { latitude, longitude } = position.coords;
            setCoordinates({ myLat: latitude, myLot: longitude });
          },
          (error: GeolocationPositionError) => {
            console.error('Geolocation 오류:', error.message);
          }
        );
      } else {
        console.error('브라우저에서 Geolocation이 지원되지 않습니다.');
      }
    };

    getLocation();
  }, []);

  return coordinates;
};

export default useGetLocation;