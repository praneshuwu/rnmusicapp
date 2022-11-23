import { createSlice } from '@reduxjs/toolkit';

const trackSlice = createSlice({
  name: 'track',
  initialState: {
    track: {},
    isLoading: false,
    isError: false,
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
  },
});
export const { loading, trackFetched, trackError } = trackSlice.actions;
export default trackSlice.reducer;