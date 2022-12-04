import { View, Text, Image } from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Audio,InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';

import axios from 'axios';

const AudioPlayer = () => {
  const {
    params: { trackId, trackName, imgUrl, trackList, returnedCount, index },
  } = useRoute();

  const [audio, setAudio] = useState({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [totalDuration, setTotalDuration] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(trackId);
  const [trackTitle, setTrackTitle] = useState(trackName);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isPreviousDisabled, setIsPreviousDisabled] = useState(false);

  const dispatch = useDispatch();

  // const track = useSelector((state) => state.track.track[0]);

  let currIndex = trackList.indexOf(currentTrack) + 1;

  const changeTrackHandler = (action) => {
    resetPlayer();
    if (action == 'next' && currIndex <= trackList.length) {
      setCurrentTrack(trackList[trackList.indexOf(currentTrack) + 1]);
    } else if (action == 'previous' && currIndex >= 0) {
      setCurrentTrack(trackList[trackList.indexOf(currentTrack) - 1]);
    } else {
      return;
    }
  };

  const resetPlayer = async () => {
    if (isPlaying) {
      await audio.stopAsync();
      await audio.unloadAsync();
    }
    setIsPlaying(false);
    setCurrentDuration(0);
    setTotalDuration(0);
  };

  const fetchAudio = async () => {
    if (currentTrack) {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.API_URL}/tracks/${currentTrack}?apikey=${process.env.API_KEY}`
        );
        const track = response.data.tracks[0];
        const { sound } = await Audio.Sound.createAsync(
          { uri: track?.previewURL || '' },
          { shouldPlay: false }
        );
        setTrackTitle(track?.name);
        // setIsPlaying(true);
        // await sound?.setAudioModeAsync({
        //   staysActiveInBackground: true,
        //   interruptionModeIOS: InterruptionModeIOS.DoNotMix,
        //   interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
        // });
        await sound?.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
        await setAudio(sound);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    try {
      resetPlayer();
    } catch (err) {
      console.log(err);
    }
    fetchAudio();
    setIsNextDisabled(currIndex >= trackList.length);
    setIsPreviousDisabled(currIndex <= 1);
  }, [currentTrack]);

  const playbackHandler = async (key) => {
    switch (key) {
      case 'pause':
        await audio.pauseAsync();
        setIsPlaying(false);
        break;
      case 'play':
        await audio.playAsync();
        setIsPlaying(true);
      default:
        break;
    }
  };

  const skipHandler = async (skipAction) => {
    let secondsToSkip = 5;
    try {
      if (
        isPlaying &&
        skipAction == 'backward'
        // &&
        // currentDuration < totalDuration - secondsToSkip * 1000
      ) {
        await audio.setPositionAsync(currentDuration - secondsToSkip * 1000);
      } else if (
        isPlaying &&
        skipAction == 'forward'
        // &&
        // currentDuration > secondsToSkip * 1000
      ) {
        await audio.setPositionAsync(currentDuration + secondsToSkip * 1000);
      } else {
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onPlaybackStatusUpdate = (playbackStatus) => {
    if (!playbackStatus.isLoaded) {
      console.log('Loading');
      if (playbackStatus.error) {
        console.log(
          `Encountered a fatal error during playback: ${playbackStatus.error}`
        );
        // Send Expo team the error on Slack or the forums so we can help you debug!
      }
    } else {
      setIsLoading(false);
      // Update your UI for the loaded state
      // console.log('Loaded');
      if (playbackStatus.isPlaying) {
        // Update your UI for the playing state
        // console.log('Playing');
      } else {
        // Update your UI for the paused state
        // console.log('Paused');
      }

      if (playbackStatus.isBuffering) {
        // Update your UI for the buffering state
        console.log('Buffering');
      }

      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        // The player has just finished playing and will stop. Maybe you want to play something else?
        console.log('Player Finished');
        resetPlayer();
      }

      if (
        playbackStatus.positionMillis &&
        playbackStatus.isPlaying &&
        playbackStatus.positionMillis <= playbackStatus.durationMillis
      ) {
        setCurrentDuration(playbackStatus.positionMillis);
      }
      if (playbackStatus.durationMillis) {
        setTotalDuration(playbackStatus.durationMillis);
      }
      // etc
    }
  };

  const navigation = useNavigation();

  return (
    <View className='bg-gray-800 flex-1 justify-between items-center w-full'>
      <View className='self-start ml-5 mt-5'>
        <Pressable
          onPress={async () => {
            navigation.goBack();
            // await audio.pauseAsync();
          }}
        >
          <View className='bg-slate-400 rounded-full p-3 '>
            <Image
              source={require('../assets/images/left-arrow.png')}
              className='w-3 h-3'
            />
          </View>
        </Pressable>
      </View>
      <View className='items-center'>
        <Image source={{ uri: imgUrl }} className='w-64 h-64 rounded-lg' />
        <Text className='text-white text-2xl my-5'>{trackTitle}</Text>
      </View>

      <View className='w-5/6 items-center'>
        <View className='h-2 bg-slate-500 opacity-40 w-full rounded-full my-3'>
          <View
            className='h-2 bg-slate-200 opacity-100 rounded-full'
            style={{
              width: `${Math.floor((currentDuration / totalDuration) * 100)}%`,
            }}
          ></View>
        </View>
        <View className='flex-row justify-between w-full'>
          <Text className='text-xl text-white'>
            {currentDuration ? `${Math.floor(currentDuration / 1000)}` : '0'} :{' '}
            {totalDuration ? `${Math.floor(totalDuration / 1000)}` : '00'}
          </Text>
          <Text className='text-xl text-white'>
            {currentTrack ? trackList.indexOf(currentTrack) + 1 : '0'} /{' '}
            {returnedCount ? returnedCount : '00'}
          </Text>
        </View>
      </View>

      {totalDuration ? (
        <View className='items-center w-full mb-20'>
          <View className='flex-row items-center justify-around w-4/6'>
            <Pressable
              onPress={() => {
                isPreviousDisabled ? null : changeTrackHandler('previous');
              }}
            >
              <View
                className={`bg-slate-400 rounded-full p-5 ${
                  isPreviousDisabled ? 'opacity-30' : ''
                }`}
              >
                <Image
                  source={require('../assets/images/previous.png')}
                  className='w-4 h-4'
                  key={trackId}
                />
              </View>
            </Pressable>

            {!isPlaying ? (
              <Pressable
                onPress={() => {
                  resetPlayer();
                  playbackHandler('play');
                }}
              >
                <View className='bg-slate-400 rounded-full p-5'>
                  <Image
                    source={require('../assets/images/play-icon.png')}
                    className='w-10 h-10'
                    key={trackId}
                  />
                </View>
              </Pressable>
            ) : (
              <Pressable
                onPress={() => {
                  playbackHandler('pause');
                }}
              >
                <View className='bg-slate-400 rounded-full p-5'>
                  <Image
                    source={require('../assets/images/pause-icon.png')}
                    className='w-10 h-10'
                    key={trackId}
                  />
                </View>
              </Pressable>
            )}
            <Pressable
              onPress={() => {
                isNextDisabled ? null : changeTrackHandler('next');
              }}
            >
              <View
                className={`bg-slate-400 rounded-full p-5 ${
                  isNextDisabled ? 'opacity-30' : ''
                }`}
              >
                <Image
                  source={require('../assets/images/next.png')}
                  className='w-4 h-4 '
                  key={trackId}
                />
              </View>
            </Pressable>
          </View>
          <View className='flex-row justify-around items-center mx-auto mt-5'>
            <Pressable onPress={() => skipHandler('backward')}>
              <View className='bg-slate-400 rounded-full p-3 mx-10'>
                <Image
                  source={require('../assets/images/skip.png')}
                  className='w-4 h-4'
                />
              </View>
            </Pressable>
            <Pressable onPress={() => skipHandler('forward')}>
              <View className='bg-slate-400 rounded-full p-3 mx-10'>
                <Image
                  source={require('../assets/images/skip.png')}
                  className='w-4 h-4'
                  style={{ transform: [{ rotateY: '180deg' }] }}
                />
              </View>
            </Pressable>
          </View>
        </View>
      ) : (
        <View className='bg-slate-100 rounded-full p-3 mb-[155px]'>
          <Image
            source={require('../assets/images/1488.gif')}
            className='w-10 h-10 '
          />
        </View>
      )}
    </View>
  );
};

export default AudioPlayer;
