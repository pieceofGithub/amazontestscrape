import { FlatList, Image, Linking, Pressable, Text, View } from 'react-native';
import dummySearchData from '../../assets/search.json';

const products = dummySearchData.slice(0, 20);

export default function SearchScreen() {
  return (
    <View>
      <Text className="text-lg">search result screen</Text>
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
