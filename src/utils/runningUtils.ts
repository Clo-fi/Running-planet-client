export interface Position {
  latitude: number;
  longitude: number;
}

function toRad(x: number) {
  return (x * Math.PI) / 180;
}

export function haversineDistance(coords1: Position, coords2: Position) {
  const R = 6371e3;
  const lat1 = toRad(coords1.latitude);
  const lat2 = toRad(coords2.latitude);
  const deltaLat = toRad(coords2.latitude - coords1.latitude);
  const deltaLon = toRad(coords2.longitude - coords1.longitude);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) *
    Math.cos(lat2) *
    Math.sin(deltaLon / 2) *
    Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return (R * c) / 1000;
}

export function getKcal(weight: number, speed: number, time: number): number {
  let met: number;
  if (speed <= 0) {
    met = 0;
  } else if (speed <= 8) {
    met = 8.3;
  } else if (speed <= 9.7) {
    met = 9.8;
  } else if (speed <= 11.3) {
    met = 11;
  } else if (speed <= 12.1) {
    met = 11.8;
  } else if (speed <= 12.9) {
    met = 12.3;
  } else if (speed <= 13.8) {
    met = 12.8;
  } else if (speed <= 14.5) {
    met = 13.3;
  } else if (speed <= 16.1) {
    met = 14.5;
  } else if (speed <= 17.5) {
    met = 15;
  } else {
    met = 16;
  }

  const timeInHours = time / 60 / 60;
  const caloriesBurned = met * weight * timeInHours;

  return caloriesBurned;
}