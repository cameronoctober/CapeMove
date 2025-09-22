import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as incidentsService from '../api/services/incidentsService';

export type Report = {
  id: string;
  userId: string;
  description: string;
  location: { lat: number; lon: number; stopId?: string };
  photos?: string[];
  status: 'open' | 'in_progress' | 'closed';
  createdAt: string;
};

interface IncidentsState {
  reports: Record<string, Report>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string | null;
}

const initialState: IncidentsState = {
  reports: {},
  status: 'idle',
  error: null
};

export const reportIncident = createAsyncThunk(
  'incidents/report',
  async (payload: { description: string; location: any; photos?: File[] }, { rejectWithValue }) => {
    try {
      const res = await incidentsService.reportIncident(payload);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchReports = createAsyncThunk('incidents/fetch', async (_, { rejectWithValue }) => {
  try {
    const res = await incidentsService.fetchUserReports();
    return res;
  } catch (err: any) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

const slice = createSlice({
  name: 'incidents',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(reportIncident.fulfilled, (s, action) => {
        s.reports[action.payload.id] = action.payload;
      })
      .addCase(fetchReports.fulfilled, (s, action) => {
        action.payload.forEach((r: Report) => {
          s.reports[r.id] = r;
        });
      });
  }
});

export default slice.reducer;
