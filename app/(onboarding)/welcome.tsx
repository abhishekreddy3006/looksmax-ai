import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/design/theme';
import { Display, Body, BodySmall } from '@/design/typography';
import { Button, Card } from '@/components/ui';
import { Sparkles, Target, TrendingUp } from 'lucide-react-native';

export default function Welcome() {
  const router = useRouter();
  const theme = useTheme();
  const [step, setStep] = useState(0);

  const slides = [
    {
      icon: <Sparkles color={theme.colors.accent} size={32} />,
      title: 'Know what suits you.',
      desc: 'Understand your current appearance with personalized, respectful insights — not a 1-10 score.',
    },
    {
      icon: <Target color={theme.colors.accent} size={32} />,
      title: 'Know what to improve.',
      desc: 'We identify your Top 3 highest-impact opportunities, not 20 flaws to obsess over.',
    },
    {
      icon: <TrendingUp color={theme.colors.accent} size={32} />,
      title: 'Know what to do next.',
      desc: 'Get a clear 30-day plan with what, why, how, effort and maintenance. Track consistency, not vanity metrics.',
    },
  ];

  const current = slides[step];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={[styles.iconCircle, { backgroundColor: theme.colors.accentSoft }]}>{current.icon}</View>
          <Display style={{ marginTop: theme.spacing.lg }}>{current.title}</Display>
          <Body color={theme.colors.textSecondary} style={{ marginTop: theme.spacing.md, textAlign: 'center' }}>
            {current.desc}
          </Body>
        </View>

        <Card style={{ marginTop: theme.spacing.xl, width: '100%' }}>
          <BodySmall color={theme.colors.textMuted} style={{ textTransform: 'uppercase', letterSpacing: 0.8 }}>
            Philosophy
          </BodySmall>
          <Body style={{ marginTop: 8, fontStyle: 'italic' }}>"Enhance, don't obsess."</Body>
          <BodySmall color={theme.colors.textSecondary} style={{ marginTop: 8 }}>
            Refine helps you improve intentionally while maintaining healthy self-perception. No shaming, no hardmaxxing, no fake science.
          </BodySmall>
        </Card>

        <View style={styles.dots}>
          {slides.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor: i === step ? theme.colors.accent : theme.colors.border,
                  width: i === step ? 24 : 8,
                },
              ]}
            />
          ))}
        </View>
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: theme.colors.border, backgroundColor: theme.colors.surface }]}>
        <Button
          title={step < 2 ? 'Continue' : 'Start'}
          fullWidth
          size="lg"
          onPress={() => {
            if (step < 2) setStep(step + 1);
            else router.push('/(onboarding)/goals');
          }}
        />
        <BodySmall color={theme.colors.textMuted} align="center" style={{ marginTop: 12 }}>
          Premium appearance & self-care coach • Privacy-first
        </BodySmall>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingTop: 80, alignItems: 'center' },
  header: { alignItems: 'center', width: '100%' },
  iconCircle: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
  dots: { flexDirection: 'row', gap: 8, marginTop: 32 },
  dot: { height: 8, borderRadius: 4 },
  footer: { padding: 20, borderTopWidth: 1 },
});
