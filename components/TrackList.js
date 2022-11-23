import { View, Text, Pressable } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import TrackListItem from './TrackListItem';

const TrackList = ({ albumId, imgUrl }) => {
  const [trackData, settrackData] = useState([]);
  const navigation = useNavigation();
  let trackList = [];
  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    const response = await axios.get(
      `${process.env.API_URL}/albums/${albumId}/tracks?apikey=${process.env.API_KEY}`
    );
    settrackData(response.data);
  };

  trackData?.tracks?.map((track) => {
    trackList.push(track.id);
  });

  console.log(trackList);
  return (
    <View>
      <Text className='text-center my-1 text-white text-xl font-bold'>
        {trackData.tracks?.length ? trackData.tracks.length + ' Tracks' : ''}
      </Text>
      {trackData.tracks?.map((track, index) => {
        return (
          <Pressable
            onPress={() =>
              navigation.navigate('Player', {
                index,
                trackId: track.id,
                trackName: track.name,
                imgUrl,
                trackList,
                returnedCount: trackData.meta.returnedCount,
              })
            }
            key={track.id}
          >
            <TrackListItem
              duration={track.playbackSeconds}
              trackName={track.name}
              artistName={track.artistName}
              trackId={track.id}
              imgUrl={imgUrl}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

export default TrackList;
