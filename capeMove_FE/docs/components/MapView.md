# MapView Component

Props:
- stops?: Array<{ id: string; name: string; lat: number; lon: number }>
- routes?: Array<{ routeId: string; name?: string; color?: string; shape: GeoJSON.LineString }>
- vehicles?: Array<{ vehicleId: string; lat: number; lon: number; heading?: number; routeId?: string }>
- initialCenter?: { lat: number; lon: number; zoom?: number }
- onStopClick?: (stopId: string) => void

Usage:
