import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/design/theme';
import { H1, Body, H3, BodySmall } from '@/design/typography';
import { Button, Chip, Card } from '@/components/ui';
import { useProfileStore } from '@/store/profileStore';

export default function Preferences() {
  const router = useRouter();
  const theme = useTheme();
  const { maintenance, time, budget, setMaintenance, setTime, setBudget } = useProfileStore();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <H1>Personalize your plan</H1>
        <Body color={theme.colors.textSecondary} style={{ marginTop: 8 }}>
          So we recommend what actually fits your life, not generic advice.
        </Body>

        <View style={{ marginTop: 32 }}>
          <H3>Maintenance tolerance</H3>
          <BodySmall color={theme.colors.textSecondary} style={{ marginTop: 4 }}>
            How much daily effort do you want?
          </BodySmall>
          <View style={styles.row}>
            {(['low', 'medium', 'high'] as const).map((m) => (
              <Chip key={m} label={m} selected={maintenance === m} onPress={() => setMaintenance(m)} />
            ))}
          </View>
        </View>

        <View style={{ marginTop: 24 }}>
          <H3>Time per day</H3>
          <View style={styles.row}>
            {(['5', '10', '15+'] as const).map((t) => (
              <Chip key={t} label={`${t} min`} selected={time === t} onPress={() => setTime(t)} />
            ))}
          </View>
        </View>

        <View style={{ marginTop: 24 }}>
          <H3>Budget</H3>
          <View style={styles.row}>
            {(['$', '$$', '$$$'] as const).map((b) => (
              <Chip key={b} label={b} selected={budget === b} onPress={() => setBudget(b)} />
            ))}
          </View>
        </View>

        <Card style={{ marginTop: 32 }}>
          <BodySmall color={theme.colors.textMuted}>HOW WE USE THIS</BodySmall>
          <BodySmall color={theme.colors.textSecondary} style={{ marginTop: 8 }}>
            Low maintenance → we suggest textured crop, not high-fade requiring weekly barber. 5 min/day → 5-min grooming routine, not 30-min skincare. $$ → drugstore + mid-range, not luxury only.
          </BodySmall>
        </Card>
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: theme.colors.border, backgroundColor: theme.colors.surface }]}>
        <Button title="Continue" fullWidth size="lg" onPress={() => router.push('/(onboarding)/photo-guidance')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingTop: 60 },
  row: { flexDirection: 'row', gap: 8, marginTop: 12 },
  footer: { padding: 20, borderTopWidth: 1 },
});
