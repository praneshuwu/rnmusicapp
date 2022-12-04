import AlbumListItem from './AlbumListItem';
import { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { fetchAlbumList } from '../utils/apiCalls';
import { useDispatch } from 'react-redux';

const AlbumList = ({ data }) => {
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(10);
  const [endOfData, setEndOfData] = useState(false);

  const fetchMore = () => {
    setLimit((prevLimit) => (prevLimit += 5));
    fetchAlbumList(dispatch, limit);
    // if (limit >= data.meta.totalCount) {
    //   setEndOfData(true);
    // }
  };

  useEffect(() => {
    fetchMore();
  }, [])
  

  return (
    <View className='flex-1' showsVerticalScrollIndicator={false}>
      <FlatList
        data={data.albums}
        renderItem={({ item }) => {
          return (
            <AlbumListItem
              albumId={item?.id}
              name={item?.name}
              artistName={item?.artistName}
              trackCount={item?.trackCount}
              releaseDate={item?.released}
            />
          );
        }}
        keyExtractor={(item) => item.id}
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<AlbumListHeader />}
        ListFooterComponent={!endOfData ? <AlbumListFooter /> : null}
        onEndReachedThreshold={0.3}
        onEndReached={fetchMore}
      />
    </View>
  );
};

const AlbumListHeader = () => {
  return (
    <Text className='font-bold text-lg py-3 text-center text-white'>
      Top Albums
    </Text>
  );
};
const AlbumListFooter = () => {
  return (
    <Text className='font-bold text-lg pt-3 pb-5 text-center text-white'>
      Loading ...
    </Text>
  );
};

export default AlbumList;
