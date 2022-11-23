import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

const AlbumDetails = () => {
  const album = useSelector((state) => state.album.album.albums);
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default AlbumDetails;
