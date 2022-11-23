import { View, Text, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLayoutEffect, useEffect } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import TrackList from '../components/TrackList';
import { fetchAlbumData } from '../utils/apiCalls';
import { useDispatch } from 'react-redux';
import AlbumDetails from '../components/AlbumDetails';

const Album = () => {
  const navigation = useNavigation();

  const {
    params: { albumId, name, imgUrl },
  } = useRoute();

  const dispatch = useDispatch();

  useEffect(() => {
    fetchAlbumData(dispatch, albumId);
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className='flex-1'>
      <ScrollView className='flex-1 bg-gray-800' showsVerticalScrollIndicator={false} alwaysBounceVertical={false} bounces={false}>
        <View className='relative'>
          <Image source={{ uri: imgUrl }} className='w-full h-96 aspect-auto' />
          <View className='absolute top-0 left-0 bottom-0 right-0 justify-center items-center'>
          <Text className='bg-[#3e3e3e80] text-white text-2xl px-4 py-2'>{name}</Text>
          </View>
        </View>
        <AlbumDetails />
        <TrackList albumId={albumId} imgUrl={imgUrl}/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Album;
