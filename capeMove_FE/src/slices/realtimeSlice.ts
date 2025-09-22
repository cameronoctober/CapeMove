import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Vehicle = {
  vehicleId: string;
  lat: number;
  lon: number;
  heading?: number;
  routeId?: string;
  speed?: number;
  lastSeen?: string;
};

export type Incident = {
  id: string;
  type: string;
  description: string;
  stopId?: string;
  timestamp: string;
  severity: 'low' | 'medium' | 'high';
};

interface RealtimeState {
  vehicles: Record<string, Vehicle>;
  incidents: Record<string, Incident>;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: RealtimeState = {
  vehicles: {},
  incidents: {},
  status: 'idle'
};

const slice = createSlice({
  name: 'realtime',
  initialState,
  reducers: {
    upsertVehicle(state, action: PayloadAction<Vehicle>) {
      state.vehicles[action.payload.vehicleId] = action.payload;
    },
    removeVehicle(state, action: PayloadAction<string>) {
      delete state.vehicles[action.payload];
    },
    addIncident(state, action: PayloadAction<Incident>) {
      state.incidents[action.payload.id] = action.payload;
    },
    resolveIncident(state, action: PayloadAction<string>) {
      if (state.incidents[action.payload]) {
        (state.incidents[action.payload] as Incident).severity = 'low';
      }
    },
    clearRealtime(state) {
      state.vehicles = {};
      state.incidents = {};
    }
  }
});

export const { upsertVehicle, removeVehicle, addIncident, resolveIncident, clearRealtime } = slice.actions;
export default slice.reducer;
