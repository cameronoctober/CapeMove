import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import journeysReducer from '../slices/journeysSlice';
import realtimeReducer from '../slices/realtimeSlice';
import faresReducer from '../slices/faresSlice';
import incidentsReducer from '../slices/incidentsSlice';
import uiReducer from '../slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    journeys: journeysReducer,
    realtime: realtimeReducer,
    fares: faresReducer,
    incidents: incidentsReducer,
    ui: uiReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
