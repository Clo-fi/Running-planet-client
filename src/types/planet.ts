export interface Planet {
  planetId : number;
  planetName : string;
  planetImage : string;
  demandDistance : number;
  distance : number;
}

export interface PlanetList {
  planets : Planet[];
}