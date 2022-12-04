import { createSlice } from '@reduxjs/toolkit';

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    track: {},
    isLoading: false,
    isError: false,
    isPlaying: false,
    isPaused: true,
  },
  reducers: {
    loading: (state) => (state.isLoading = true),
    trackFetched: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.track = action.payload;
    },
    trackError: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    trackIsPlaying: (state) => {
      state.isPlaying = true;
      state.isPaused = false;
    },
  },
});
export const { loading, trackFetched, trackError } = playerSlice.actions;
export default playerSlice.reducer;
