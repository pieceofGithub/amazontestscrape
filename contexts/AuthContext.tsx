import { Session } from '@supabase/supabase-js';
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { supabase } from '~/utils/supabase';

// 1. Context'in oluşturulması
export const AuthContext = createContext();

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsReady(true);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe(); // Sadece cleanup fonksiyonu döndürüyoruz
  }, []);

  // isReady false iken yükleme göstergesi render ediyoruz
  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ session, user: session?.user }}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
