import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ToastItem = { id: string; message: string; severity: 'info' | 'success' | 'warning' | 'error' };

interface UISliceState {
  toastQueue: ToastItem[];
  modal?: { id: string; props?: any } | null;
  isOffline: boolean;
  globalLoadingCount: number;
}

const initialState: UISliceState = {
  toastQueue: [],
  modal: null,
  isOffline: !navigator.onLine,
  globalLoadingCount: 0
};

const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    pushToast(state, action: PayloadAction<ToastItem>) {
      state.toastQueue.push(action.payload);
    },
    popToast(state) {
      state.toastQueue.shift();
    },
    openModal(state, action: PayloadAction<{ id: string; props?: any }>) {
      state.modal = action.payload;
    },
    closeModal(state) {
      state.modal = null;
    },
    setOffline(state, action: PayloadAction<boolean>) {
      state.isOffline = action.payload;
    },
    incrementLoading(state) {
      state.globalLoadingCount += 1;
    },
    decrementLoading(state) {
      if (state.globalLoadingCount > 0) state.globalLoadingCount -= 1;
    }
  }
});

export const { pushToast, popToast, openModal, closeModal, setOffline, incrementLoading, decrementLoading } =
  slice.actions;
export default slice.reducer;
