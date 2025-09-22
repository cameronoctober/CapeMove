import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

type Stop = { id: string; name: string; lat: number; lon: number };
type RouteShape = { routeId: string; name?: string; color?: string; shape: GeoJSON.LineString };
type Vehicle = { vehicleId: string; lat: number; lon: number; heading?: number; routeId?: string };

const DefaultCenter = { lat: -33.9249, lon: 18.4241, zoom: 12 };

function FitBounds({ stops, routes }: { stops?: Stop[]; routes?: RouteShape[] }) {
  const map = useMap();

  useEffect(() => {
    const points: L.LatLngExpression[] = [];
    if (stops) stops.forEach((s) => points.push([s.lat, s.lon]));
    if (routes) {
      routes.forEach((r) => {
        if (r.shape && r.shape.coordinates) {
          r.shape.coordinates.forEach((c) => points.push([c[1], c[0]]));
        }
      });
    }
    if (points.length > 0) {
      map.fitBounds(points as L.LatLngExpression[], { padding: [40, 40] });
    }
  }, [map, stops, routes]);

  return null;
}

interface MapViewProps {
  stops?: Stop[];
  routes?: RouteShape[];
  vehicles?: Vehicle[];
  initialCenter?: { lat: number; lon: number; zoom?: number };
  onStopClick?: (stopId: string) => void;
}

const MapView: React.FC<MapViewProps> = ({ stops = [], routes = [], vehicles = [], initialCenter }) => {
  const center = initialCenter ?? DefaultCenter;

  const stopMarkers = useMemo(
    () =>
      stops.map((s) => (
        <Marker key={s.id} position={[s.lat, s.lon]}>
          {/* popup could be added */}
        </Marker>
      )),
    [stops]
  );

  const vehicleMarkers = useMemo(
    () =>
      vehicles.map((v) => (
        <CircleMarker key={v.vehicleId} center={[v.lat, v.lon]} pathOptions={{ color: '#1976d2' }} radius={6}>
          {/* Optionally add tooltip */}
        </CircleMarker>
      )),
    [vehicles]
  );

  return (
    <MapContainer center={[center.lat, center.lon]} zoom={center.zoom ?? 12} style={{ height: '100%', width: '100%' }}>
      <TileLayer attribution="© OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {stopMarkers}
      {vehicleMarkers}
      {routes.map((r) => (
        <Polyline
          key={r.routeId}
          positions={r.shape.coordinates.map((c) => [c[1], c[0]] as [number, number])}
          pathOptions={{ color: r.color ?? '#ff5722', weight: 4, opacity: 0.8 }}
        />
      ))}
      <FitBounds stops={stops} routes={routes} />
    </MapContainer>
  );
};

export default MapView;
export type { Stop, RouteShape, Vehicle };
