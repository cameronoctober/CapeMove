import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import * as journeyService from '../api/services/journeyService';

export type LatLon = { lat: number; lon: number; name?: string };

export type JourneyPlan = {
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
};

interface JourneysState {
  plans: Record<string, JourneyPlan>;
  currentPlanId?: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string | null;
}

const initialState: JourneysState = {
  plans: {},
  currentPlanId: null,
  status: 'idle',
  error: null
};

export const planJourney = createAsyncThunk(
  'journeys/plan',
  async (payload: { origin: LatLon; destination: LatLon; preferences?: any }, { rejectWithValue }) => {
    try {
      const res = await journeyService.planJourney(payload);
      return res;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchSavedJourneys = createAsyncThunk('journeys/fetchSaved', async (_, { rejectWithValue }) => {
  try {
    const res = await journeyService.fetchSavedJourneys();
    return res;
  } catch (err: any) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

const slice = createSlice({
  name: 'journeys',
  initialState,
  reducers: {
    addPlan(state, action: PayloadAction<JourneyPlan>) {
      state.plans[action.payload.id] = action.payload;
    },
    removePlan(state, action: PayloadAction<string>) {
      delete state.plans[action.payload];
      if (state.currentPlanId === action.payload) state.currentPlanId = undefined;
    },
    selectPlan(state, action: PayloadAction<string>) {
      state.currentPlanId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(planJourney.pending, (s) => {
        s.status = 'loading';
      })
      .addCase(planJourney.fulfilled, (s, action) => {
        s.status = 'succeeded';
        s.plans[action.payload.id] = action.payload;
        s.currentPlanId = action.payload.id;
      })
      .addCase(planJourney.rejected, (s, action) => {
        s.status = 'failed';
        s.error = (action.payload as any) || 'Failed to plan journey';
      })
      .addCase(fetchSavedJourneys.fulfilled, (s, action) => {
        action.payload.forEach((p: JourneyPlan) => {
          s.plans[p.id] = p;
        });
      });
  }
});

export const { addPlan, removePlan, selectPlan } = slice.actions;
export default slice.reducer;
