import React from 'react';
import L from 'leaflet';
import { Marker, Tooltip } from 'react-leaflet';

export type Vehicle = {
  vehicleId: string;
  lat: number;
  lon: number;
  heading?: number;
  routeId?: string;
  lastSeen?: string;
};

function createIcon(heading?: number) {
  const svg = `<svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <g transform="rotate(${heading ?? 0} 12 12)">
      <path d="M12 2 L15 12 L12 10 L9 12 Z" fill="#1976d2" stroke="#0d47a1" stroke-width="1"/>
    </g>
  </svg>`;
  return L.divIcon({
    html: svg,
    className: '',
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  });
}

const VehicleMarker: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
  return (
    <Marker key={vehicle.vehicleId} position={[vehicle.lat, vehicle.lon]} icon={createIcon(vehicle.heading)}>
      <Tooltip direction="top" offset={[0, -8]} opacity={0.9}>
        {vehicle.routeId ?? 'Vehicle'} • {vehicle.vehicleId}
      </Tooltip>
    </Marker>
  );
};

export default VehicleMarker;
