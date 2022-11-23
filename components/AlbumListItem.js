import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import formatReleaseDate from '../utils/formatReleaseDate';

const AlbumItem = ({ name, albumId, artistName, trackCount, releaseDate }) => {
  const albumRelease = formatReleaseDate(releaseDate);
  const navigation = useNavigation();
  const imgUrl = `https://api.napster.com/imageserver/v2/albums/${albumId}/images/500x500.jpg`;
  const navigatePage = () => {
    navigation.navigate('Album', {
      name,
      albumId,
      artistName,
      albumRelease,
      imgUrl,
    });
  };
  return (
    <Pressable onPress={navigatePage}>
      <View className='flex-row justify-start items-start rounded-lg mb-2 mx-2 p-3 bg-slate-800'>
        <Image
          source={{
            uri: imgUrl,
          }}
          className='rounded-lg w-28 h-28 mr-4'
        />
        <View className='justify-between items-start h-28'>
          <View className='justify-start items-start'>
            <Text className='text-base font-bold text-white w-48'>{name}</Text>
            <Text className='text-white'>{artistName}</Text>
          </View>
          <View className='flex-row justify-between space-x-24'>
            <Text className='text-white'>{albumRelease}</Text>
            <Text className='text-white'>{trackCount} Tracks</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default AlbumItem;
