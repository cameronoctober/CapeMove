import axiosInstance from '../axiosInstance';

export interface Vehicle {
  vehicleId: string;
  lat: number;
  lon: number;
  heading?: number;
  routeId?: string;
  speed?: number;
  timestamp?: string;
}

export interface Incident {
  id: string;
  type: string;
  description: string;
  stopId?: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
}

export async function fetchInitialVehicles(bbox: { lat1: number; lon1: number; lat2: number; lon2: number }) {
  const bboxParam = `${bbox.lat1},${bbox.lon1},${bbox.lat2},${bbox.lon2}`;
  const res = await axiosInstance.get(`/api/realtime/vehicles?bbox=${encodeURIComponent(bboxParam)}`);
  return res.data as Vehicle[];
}

export async function fetchIncidents() {
  const res = await axiosInstance.get('/api/realtime/incidents');
  return res.data as Incident[];
}

export function getWebSocketUrl(token?: string) {
  const base = (import.meta.env.VITE_WS_BASE_URL as string) ?? 'ws://localhost:8080';
  const url = new URL(base);
  if (token) url.searchParams.set('token', token);
  return url.toString();
}

export function connectWebSocket(onMessage: (data: any) => void, onOpen?: () => void, onClose?: () => void) {
  const wsUrl = (import.meta.env.VITE_WS_BASE_URL as string) ?? 'ws://localhost:8080';
  const socket = new WebSocket(wsUrl.replace(/^http/, 'ws') + '/realtime');
  socket.addEventListener('open', () => onOpen?.());
  socket.addEventListener('message', (ev) => {
    try {
      const data = JSON.parse(ev.data);
      onMessage(data);
    } catch (e) {
      console.warn('Invalid WS message', e);
    }
  });
  socket.addEventListener('close', () => onClose?.());
  return () => socket.close();
}
