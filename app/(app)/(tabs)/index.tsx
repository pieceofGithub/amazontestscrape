import Octicons from '@expo/vector-icons/Octicons';
import dayjs from 'dayjs';
import { Link, router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, TextInput, View, Alert } from 'react-native';
import SearchListItem from '~/components/SearchListItem';
import { useAuth } from '~/contexts/AuthContext';
import { Tables } from '~/types/supabase';
import { supabase } from '~/utils/supabase';

export default function Home() {
  const [search, setSearch] = useState('');
  const [history, setHistory] = useState<Tables<'searches'>[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false); // Added state for refreshing
  const { user } = useAuth();

  const fetchHistory = async () => {
    if (!user) {
      return;
    }
    setIsRefreshing(true); // Show refreshing spinner
    const { data, error } = await supabase
      .from('searches')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching history:', error);
      Alert.alert('Error', 'Failed to fetch search history.');
    } else {
      setHistory(data || []);
    }
    setIsRefreshing(false); // Hide refreshing spinner
  };

  useEffect(() => {
    if (user?.id) {
      fetchHistory();
    }
  }, [user?.id]);

  const performSearch = async () => {
    if (!user) {
      return;
    }
    if (!search.trim()) {
      Alert.alert('Error', 'Please enter a search query.');
      return;
    }

    const { data, error } = await supabase
      .from('searches')
      .insert({
        query: search,
        user_id: user?.id,
      })
      .select()
      .single();

    if (error) {
      console.error('Error inserting search:', error);
      Alert.alert('Error', 'Failed to save the search.');
    } else if (data) {
      router.push(`/search/${data.id}`);
    }
  };

  return (
    <View className="flex-1 bg-white">
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
          <Text className="tracking-wider">Search</Text>
        </Pressable>
      </View>

      <FlatList
        data={history}
        contentContainerClassName="p-3 gap-2"
        onRefresh={fetchHistory}
        refreshing={isRefreshing} // Linked to refreshing state
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <SearchListItem search={item} />}
      />
    </View>
  );
}
