import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';

export default function Home() {
  const [search, setSearch] = useState('');

  const performSearch = () => {
    console.warn('Searched', search);
    router.push('/search');
  };
  return (
    <>
      <Stack.Screen options={{ title: 'Search' }} />

      <View className="flex-row">
        <View className="flex-1">
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search for a product"
            className="rounded border border-gray-300 bg-white p-3"
          />
        </View>

        <Pressable onPress={performSearch} className="rounded bg-teal-500 p-3 ">
          <Text className=" tracking-wider">Search</Text>
        </Pressable>
      </View>
    </>
  );
}
