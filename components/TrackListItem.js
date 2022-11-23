import { View, Text } from 'react-native';
import { formatTrackDuration } from '../utils/formatTrackDuration';

const TrackListItem = ({
  trackName,
  duration,
  artistName,
}) => {
  const trackDuration = formatTrackDuration(duration);

  return (

      <View className='my-2 px-4'>
        <View>
          <Text className='text-white text-lg'>{trackName}</Text>
          <Text className='text-gray-300 text-sm pb-1'>{artistName}</Text>
          <Text className='text-white text-xsm'>{trackDuration}</Text>
        </View>
        {/* <Image source={playBtn} className='w-6 h-6 bg-transparent' /> */}
      </View>

  );
};

export default TrackListItem;
