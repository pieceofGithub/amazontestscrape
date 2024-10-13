import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Linking, Pressable, Text, View } from 'react-native';
import dummySearchData from '~/assets/search.json';
import { supabase } from '~/utils/supabase';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const products = dummySearchData.slice(0, 20);

export default function SearchScreen() {
  const { id } = useLocalSearchParams();
  const [search, setSearch] = useState();

  useEffect(() => {
    supabase
      .from('searches')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data }) => setSearch(data));
  }, [id]);
  if (!search) {
    return <ActivityIndicator />;
  }
  return (
    <View>
      <View className="m-2 gap-2 rounded bg-white p-2 shadow-sm">
        <Text className="text-lg uppercase">{search.query}</Text>
        <Text className="text-lg uppercase">{dayjs(search.created_at).fromNow()}</Text>
        <Text className="text-lg uppercase">{search.status}</Text>
      </View>
      <FlatList
        contentContainerClassName="gap-2 p-2"
        keyExtractor={(item) => item.asin}
        data={products}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => Linking.openURL(item.url)}
            className="flex-row gap-3 bg-white p-3">
            <Image source={{ uri: item.image }} className="size-20" />
            <Text className="flex-1" numberOfLines={4}>
              {item.name}
            </Text>
            <Text>$ {item.final_price}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}
