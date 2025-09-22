import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as faresService from '../api/services/faresService';

export type FareEstimate = {
  id: string;
  origin: string;
  destination: string;
  price: number;
  currency: 'ZAR' | 'USD' | 'EUR';
  breakdown: Array<{ type: string; amount: number }>;
};

interface FaresState {
  estimates: Record<string, FareEstimate>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string | null;
}

const initialState: FaresState = {
  estimates: {},
  status: 'idle',
  error: null
};

export const getFareEstimate = createAsyncThunk(
  'fares/getEstimate',
  async (payload: { origin: any; destination: any; passengers?: number; concessions?: boolean }, { rejectWithValue }) => {
    try {
      const res = await faresService.getFareEstimate(payload);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const slice = createSlice({
  name: 'fares',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFareEstimate.pending, (s) => {
        s.status = 'loading';
      })
      .addCase(getFareEstimate.fulfilled, (s, action) => {
        s.status = 'succeeded';
        s.estimates[action.payload.id] = action.payload;
      })
      .addCase(getFareEstimate.rejected, (s, action) => {
        s.status = 'failed';
        s.error = (action.payload as any) || 'Failed to get fare estimate';
      });
  }
});

export default slice.reducer;
