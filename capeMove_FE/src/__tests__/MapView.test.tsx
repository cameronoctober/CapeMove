import React from 'react';
import { render } from '@testing-library/react';
import MapView from '../components/Map/MapView';

// Mock react-leaflet MapContainer and children to avoid full DOM requirements
jest.mock('react-leaflet', () => {
  const React = require('react');
  return {
    MapContainer: ({ children, ...rest }: any) => React.createElement('div', { ...rest, 'data-testid': 'map' }, children),
    TileLayer: () => React.createElement('div', { 'data-testid': 'tilelayer' }),
    Marker: ({ children }: any) => React.createElement('div', { className: 'leaflet-marker-icon' }, children),
    Polyline: () => React.createElement('div', { className: 'leaflet-polyline' }),
    CircleMarker: ({ children }: any) => React.createElement('div', { className: 'leaflet-marker-icon' }, children),
    useMap: () => ({ fitBounds: () => {} })
  };
});

describe('MapView', () => {
  it('renders stops and vehicles markers', () => {
    const stops = [
      { id: 's1', name: 'Stop 1', lat: -33.9, lon: 18.4 },
      { id: 's2', name: 'Stop 2', lat: -33.91, lon: 18.41 }
    ];
    const vehicles = [
      { vehicleId: 'v1', lat: -33.92, lon: 18.42 },
      { vehicleId: 'v2', lat: -33.93, lon: 18.43 }
    ];
    const { container } = render(<MapView stops={stops} vehicles={vehicles} />);
    const markers = container.querySelectorAll('.leaflet-marker-icon');
    expect(markers.length).toBe(4); // 2 stops + 2 vehicles
  });
});
