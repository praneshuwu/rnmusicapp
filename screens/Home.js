import { View } from 'react-native';
import { useEffect, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import AlbumList from '../components/AlbumList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAlbumList } from '../utils/apiCalls';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.albumList.albums);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    fetchAlbumList(dispatch);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);


  return (
    <SafeAreaView className='flex-1'>
      <View className='flex-1 bg-gray-900'>
      {/* <Image source={{uri:'assets:/images/sound.png'}} style={{width:60,height:60}} className='z-10'/> */}
        <AlbumList data={data} />
      </View>
      </SafeAreaView>
  );
};

export default Home;
