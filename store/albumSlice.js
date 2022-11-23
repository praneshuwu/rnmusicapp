import { createSlice } from '@reduxjs/toolkit';

const albumSlice = createSlice({
  name: 'album',
  initialState: {
    album: {},
    isLoading: false,
    isError: false,
  },
  reducers: {
    loading: (state) => (state.isLoading = true),
    albumDataFetched: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.album = action.payload;
    },
    albumDataError: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});
export const { loading, albumDataFetched, albumDataError } = albumSlice.actions;
export default albumSlice.reducer;
