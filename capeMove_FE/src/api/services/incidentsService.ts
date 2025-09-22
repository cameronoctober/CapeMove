import axiosInstance from '../axiosInstance';

export interface Report {
  id: string;
  userId: string;
  description: string;
  location: { lat: number; lon: number; stopId?: string };
  photos?: string[];
  status: 'open' | 'in_progress' | 'closed';
  createdAt: string;
}

export async function reportIncident(payload: {
  description: string;
  location: { lat: number; lon: number; stopId?: string };
  photos?: File[];
}) {
  const fd = new FormData();
  fd.append('description', payload.description);
  fd.append('location', JSON.stringify(payload.location));
  if (payload.photos) {
    payload.photos.forEach((p) => fd.append('photos', p));
  }
  const res = await axiosInstance.post('/api/incidents', fd, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return res.data as Report;
}

export async function fetchUserReports() {
  const res = await axiosInstance.get('/api/incidents/user');
  return res.data as Report[];
}

export async function addIncidentComment(incidentId: string, comment: string) {
  const res = await axiosInstance.post(`/api/incidents/${encodeURIComponent(incidentId)}/comments`, { comment });
  return res.data;
}
