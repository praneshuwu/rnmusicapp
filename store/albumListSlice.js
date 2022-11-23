import { createSlice } from '@reduxjs/toolkit';

const albumListSlice = createSlice({
  name: 'albumList',
  initialState: {
    albums: {},
    isLoading: false,
    isError: false,
  },
  reducers: {
    loading: (state) => (state.isLoading = true),
    albumListFetched: (state, action) => {
      state.isLoading = false;
      state.albums = action.payload;
      state.isError = false;
    },
    albumListError: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});
export const { loading, albumListFetched, albumListError } =
  albumListSlice.actions;
export default albumListSlice.reducer;
