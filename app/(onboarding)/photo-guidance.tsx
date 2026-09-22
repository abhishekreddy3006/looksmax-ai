import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/design/theme';
import { H1, Body, BodySmall, H3 } from '@/design/typography';
import { Button, Card } from '@/components/ui';
import { useAuthStore } from '@/store/authStore';
import { Sun, Camera, Smile, Scissors } from 'lucide-react-native';

export default function PhotoGuidance() {
  const router = useRouter();
  const theme = useTheme();
  const setOnboarded = useAuthStore((s) => s.setOnboarded);

  const tips = [
    { icon: <Sun color={theme.colors.accent} size={20} />, title: 'Natural light', desc: 'Face a window, no overhead harsh light. Avoid filters.' },
    { icon: <Camera color={theme.colors.accent} size={20} />, title: 'Distance & angle', desc: '30-50cm away, eye level, neutral background.' },
    { icon: <Smile color={theme.colors.accent} size={20} />, title: 'Neutral expression', desc: 'Relaxed face, mouth closed, eyes open. Hair visible.' },
    { icon: <Scissors color={theme.colors.accent} size={20} />, title: 'Quality', desc: 'No blur, no hats/sunglasses, solo photo.' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <H1>Let's capture your baseline</H1>
        <Body color={theme.colors.textSecondary} style={{ marginTop: 8 }}>
          This helps us understand what suits you. Photos are private, encrypted, never sold, deletable anytime.
        </Body>

        <Card style={{ marginTop: 24 }}>
          <BodySmall color={theme.colors.textMuted}>PRIVACY CONSENT</BodySmall>
          <BodySmall color={theme.colors.textSecondary} style={{ marginTop: 8 }}>
            Your photo will be analyzed by AI for appearance coaching only. We send it to our AI provider (OpenAI/Gemini) with your consent. It's not used to train models and is deleted after processing per provider policy. You can delete it anytime in Settings → Privacy.
          </BodySmall>
        </Card>

        <View style={{ marginTop: 24, gap: 16 }}>
          {tips.map((tip, i) => (
            <View key={i} style={[styles.tipRow, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
              <View style={[styles.tipIcon, { backgroundColor: theme.colors.accentSoft }]}>{tip.icon}</View>
              <View style={{ flex: 1 }}>
                <H3>{tip.title}</H3>
                <BodySmall color={theme.colors.textSecondary}>{tip.desc}</BodySmall>
              </View>
            </View>
          ))}
        </View>

        <View style={[styles.exampleBox, { borderColor: theme.colors.border }]}>
          <View style={styles.exampleCol}>
            <View style={[styles.exampleImage, { backgroundColor: theme.colors.successSoft, borderColor: theme.colors.success }]}>
              <BodySmall color={theme.colors.success}>Good: bright, centered, neutral</BodySmall>
            </View>
          </View>
          <View style={styles.exampleCol}>
            <View style={[styles.exampleImage, { backgroundColor: theme.colors.dangerSoft, borderColor: theme.colors.danger }]}>
              <BodySmall color={theme.colors.danger}>Avoid: dark, blurry, angle, filter</BodySmall>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { borderTopColor: theme.colors.border, backgroundColor: theme.colors.surface }]}>
        <Button
          title="Take Photo"
          fullWidth
          size="lg"
          onPress={() => {
            setOnboarded(true);
            router.push('/capture');
          }}
        />
        <Button title="Upload from Gallery" variant="secondary" fullWidth style={{ marginTop: 12 }} onPress={() => { setOnboarded(true); router.push('/capture'); }} />
        <BodySmall color={theme.colors.textMuted} align="center" style={{ marginTop: 12 }}>
          By continuing you agree to our Privacy Policy • Photos private
        </BodySmall>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingTop: 60 },
  tipRow: { flexDirection: 'row', gap: 12, padding: 16, borderRadius: 16, borderWidth: 1, alignItems: 'center' },
  tipIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  exampleBox: { flexDirection: 'row', gap: 12, marginTop: 24, borderWidth: 1, borderStyle: 'dashed', borderRadius: 16, padding: 12 },
  exampleCol: { flex: 1 },
  exampleImage: { height: 80, borderRadius: 12, borderWidth: 1, alignItems: 'center', justifyContent: 'center', padding: 8 },
  footer: { padding: 20, borderTopWidth: 1 },
});
