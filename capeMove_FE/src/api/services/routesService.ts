import axiosInstance from '../axiosInstance';

export async function fetchRouteDefinition(routeId: string) {
  const res = await axiosInstance.get(`/api/routes/${encodeURIComponent(routeId)}`);
  return res.data;
}

export async function fetchStopsByBBox(bbox: { lat1: number; lon1: number; lat2: number; lon2: number }) {
  const bboxParam = `${bbox.lat1},${bbox.lon1},${bbox.lat2},${bbox.lon2}`;
  const res = await axiosInstance.get(`/api/routes/stops?bbox=${encodeURIComponent(bboxParam)}`);
  return res.data;
}
