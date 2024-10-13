import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { Text, TextInput, View, Pressable, Alert } from 'react-native';
import { supabase } from '~/utils/supabase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      Alert.alert('Sign in başarisiz');
    } else {
      router.push('/');
    }
  };

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      Alert.alert('Sign up başarisiz');
    } else {
      router.push('/');
    }
  };

  return (
    <View className="gap-3 p-3">
      <Stack.Screen options={{ title: 'Sign In' }} />
      <View>
        <Text>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="email"
          keyboardType="email-address"
          className="rounded border border-gray-300 bg-white p-3"
        />
      </View>
      <View>
        <Text>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          placeholder="password"
          className="rounded border border-gray-300 bg-white p-3"
        />
      </View>
      <View className="flex-row gap-3">
        <Pressable onPress={handleSignIn} className="flex-1 rounded bg-teal-500 p-3">
          <Text className="text-center text-white">Sign IN</Text>
        </Pressable>
        <Pressable onPress={handleSignUp} className="flex-1 rounded bg-teal-500 p-3">
          <Text className="text-center text-white">Sign UP</Text>
        </Pressable>
      </View>
    </View>
  );
}
