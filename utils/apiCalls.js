import axios from 'axios';
import { loading, albumDataFetched } from '../store/albumSlice';
import { albumListFetched } from '../store/albumListSlice';
import { trackFetched } from '../store/trackSlice';

export const fetchAlbumData = async (dispatch, albumId) => {
  dispatch(loading);
  try {
    const response = await axios.get(
      `${process.env.API_URL}/albums/${albumId}?apikey=${process.env.API_KEY}`
    );
    const data = response.data;
    dispatch(albumDataFetched(data));
  } catch (err) {
    console.log(err);
  }
};

export const fetchAlbumList = async (dispatch, limit) => {
  dispatch(loading);

  try {
    const response = await axios.get(
      `${process.env.API_URL}/albums/new?apikey=${process.env.API_KEY}&limit=${
        limit ? limit : 10
      }`
    );
    dispatch(albumListFetched(response.data));
  } catch (err) {
    console.log(err);
  }
};


// export const fetchTrack = async (dispatch, trackId) => {
//   dispatch(loading);
//   try {
//     const response = await axios.get(
//       `${process.env.API_URL}/tracks/${trackId}?apikey=${process.env.API_KEY}`
//     );
//     dispatch(trackFetched(response.data.tracks));
//   } catch (err) {
//     console.log(err);
//   }
// };
