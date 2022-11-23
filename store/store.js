import { configureStore } from '@reduxjs/toolkit';
import albumReducer from './albumSlice';
import albumListReducer from './albumListSlice';
import trackReducer from './trackSlice';

export default configureStore({
  reducer: {
    album: albumReducer,
    albumList: albumListReducer,
    track: trackReducer
  },
});
