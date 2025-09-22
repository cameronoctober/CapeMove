import axiosInstance from '../axiosInstance';

export type LatLon = { lat: number; lon: number; name?: string };

export interface JourneyPlan {
  id: string;
  origin: LatLon;
  destination: LatLon;
  routes: Array<{
    legId: string;
    mode: string;
    duration: number;
    distance: number;
    steps: Array<{ instruction: string; lat: number; lon: number }>;
  }>;
  createdAt: string;
}

export async function planJourney(payload: {
  origin: { lat: number; lon: number };
  destination: { lat: number; lon: number };
  preferences?: { mode?: string | string[]; maxTransfers?: number };
}) {
  const res = await axiosInstance.post('/api/journeys/plan', payload);
  return res.data as JourneyPlan;
}

export async function fetchSavedJourneys() {
  const res = await axiosInstance.get('/api/journeys');
  return res.data as JourneyPlan[];
}

export async function saveJourney(planId: string, name?: string) {
  const res = await axiosInstance.post('/api/journeys', { planId, name });
  return res.data;
}

export async function deleteJourney(planId: string) {
  const res = await axiosInstance.delete(`/api/journeys/${encodeURIComponent(planId)}`);
  return res.data;
}
