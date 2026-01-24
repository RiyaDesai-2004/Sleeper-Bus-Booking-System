// Station configuration with distances (in km from Ahmedabad)
export const stations = [
  { name: 'Ahmedabad', distance: 0 },
  { name: 'Nadiad', distance: 65 },
  { name: 'Anand', distance: 85 },
  { name: 'Vadodara', distance: 110 },
  { name: 'Bharuch', distance: 180 },
  { name: 'Surat', distance: 265 },
  { name: 'Vapi', distance: 355 },
  { name: 'Mumbai', distance: 525 },
];

// Base price per km
const PRICE_PER_KM = 2.5;
const BASE_PRICE = 200; // Minimum fare

/**
 * Calculate seat price based on origin and destination stations
 */
export function calculateSeatPrice(from: string, to: string): number {
  const fromStation = stations.find(s => s.name === from);
  const toStation = stations.find(s => s.name === to);
  
  if (!fromStation || !toStation) {
    return 1200; // Default fallback price
  }
  
  const distance = toStation.distance - fromStation.distance;
  const price = BASE_PRICE + (distance * PRICE_PER_KM);
  
  // Round to nearest 50
  return Math.round(price / 50) * 50;
}

/**
 * Get list of intermediate stations between origin and destination
 */
export function getIntermediateStations(from: string, to: string): string[] {
  const fromIndex = stations.findIndex(s => s.name === from);
  const toIndex = stations.findIndex(s => s.name === to);
  
  if (fromIndex === -1 || toIndex === -1 || fromIndex >= toIndex) {
    return [];
  }
  
  return stations
    .slice(fromIndex, toIndex + 1)
    .map(s => s.name);
}

/**
 * Calculate distance between two stations
 */
export function getDistance(from: string, to: string): number {
  const fromStation = stations.find(s => s.name === from);
  const toStation = stations.find(s => s.name === to);
  
  if (!fromStation || !toStation) {
    return 0;
  }
  
  return toStation.distance - fromStation.distance;
}

/**
 * Get all station names
 */
export function getAllStations(): string[] {
  return stations.map(s => s.name);
}
