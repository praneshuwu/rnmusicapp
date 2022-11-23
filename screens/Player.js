import { View, Text} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLayoutEffect } from 'react';
import AudioPlayer from '../components/AudioPlayer';
import { useNavigation } from '@react-navigation/native';

const Player = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  
  return (
    <SafeAreaView className='bg-gray-800 flex-1'>
      <AudioPlayer />
    </SafeAreaView>
  );
};

export default Player;
