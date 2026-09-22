import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/design/theme';
import { H1, Body, BodySmall } from '@/design/typography';
import { Button, Chip } from '@/components/ui';
import { useProfileStore } from '@/store/profileStore';

const GOALS = [
  'Grooming',
  'Hair',
  'Facial Hair',
  'Skin',
  'Style',
  'Smile',
  'Posture',
  'Confidence',
  'Routine',
];

export default function Goals() {
  const router = useRouter();
  const theme = useTheme();
  const { goals, setGoals } = useProfileStore();

  const toggle = (g: string) => {
    if (goals.includes(g)) setGoals(goals.filter((x) => x !== g));
    else if (goals.length < 3) setGoals([...goals, g]);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <H1>What do you want to focus on?</H1>
        <Body color={theme.colors.textSecondary} style={{ marginTop: 8 }}>
          Choose up to 3. We'll personalize your Top 3 opportunities around these.
        </Body>

        <View style={styles.chipGrid}>
          {GOALS.map((g) => (
            <Chip key={g} label={g} selected={goals.includes(g)} onPress={() => toggle(g)} style={{ margin: 4 }} />
          ))}
        </View>

        {goals.length > 0 && (
          <View style={[styles.preview, { backgroundColor: theme.colors.accentSoft, borderColor: theme.colors.accent }]}>
            <BodySmall color={theme.colors.accentStrong}>Selected: {goals.join(', ')}</BodySmall>
            <BodySmall color={theme.colors.textSecondary} style={{ marginTop: 4 }}>
              Example: If you pick Hair + Grooming, we'll prioritize hairstyles that suit you and a 5-min grooming routine.
            </BodySmall>
          </View>
        )}
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: theme.colors.border, backgroundColor: theme.colors.surface }]}>
        <Button title="Continue" fullWidth size="lg" disabled={goals.length === 0} onPress={() => router.push('/(onboarding)/preferences')} />
        <BodySmall color={theme.colors.textMuted} align="center" style={{ marginTop: 12 }}>
          {goals.length}/3 selected • You can change this anytime
        </BodySmall>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingTop: 60 },
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 24 },
  preview: { marginTop: 24, padding: 16, borderRadius: 12, borderWidth: 1 },
  footer: { padding: 20, borderTopWidth: 1 },
});
