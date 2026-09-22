import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/store/authStore';
import { useTheme } from '@/design/theme';

export default function Index() {
  const router = useRouter();
  const theme = useTheme();
  const { isAuthenticated, isOnboarded } = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isOnboarded) {
        router.replace('/(onboarding)/welcome');
      } else if (!isAuthenticated) {
        router.replace('/(onboarding)/welcome');
      } else {
        router.replace('/(tabs)/today');
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [isAuthenticated, isOnboarded]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.background }}>
      <ActivityIndicator color={theme.colors.accent} size="large" />
    </View>
  );
}
