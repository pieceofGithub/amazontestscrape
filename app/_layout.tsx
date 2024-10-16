import AuthContextProvider from '~/contexts/AuthContext';
import '../global.css';

import { Stack } from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <Stack>
        <Stack.Screen name="(app)/(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(app)/modal" options={{ presentation: 'modal' }} />
        <Stack.Screen
          name="(app)/search/[id]"
          options={{ title: 'Search Products', headerBackTitleVisible: false }}
        />
      </Stack>
    </AuthContextProvider>
  );
}
