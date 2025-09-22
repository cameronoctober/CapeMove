import axiosInstance from '../axiosInstance';

export interface FareEstimate {
  id: string;
  origin: string;
  destination: string;
  price: number;
  currency: 'ZAR' | 'USD' | 'EUR';
  breakdown: Array<{ type: string; amount: number }>;
}

export async function getFareEstimate(payload: {
  origin: { lat: number; lon: number };
  destination: { lat: number; lon: number };
  passengers?: number;
  concessions?: boolean;
}) {
  const res = await axiosInstance.post('/api/fares/estimate', payload);
  return res.data as FareEstimate;
}

export async function getFareZones() {
  const res = await axiosInstance.get('/api/fares/zones');
  return res.data as Array<{ id: string; name: string; priceMultiplier: number }>;
}
