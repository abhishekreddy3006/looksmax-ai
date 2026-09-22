import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/design/theme';
import { H1, H2, Body, BodySmall, Caption } from '@/design/typography';
import { Card, Button } from '@/components/ui';
import { Check, Sparkles, Shield } from 'lucide-react-native';

export default function Paywall() {
  const router = useRouter();
  const theme = useTheme();

  const features = [
    'Unlimited AI analyses (fair use 50/mo)',
    'Full 30/60/90-day adaptive plans',
    'Advanced Look Lab + unlimited saves',
    'Unlimited AI Coach with context',
    'Advanced progress insights + weekly AI summary',
    'Barber cards unlimited + PDF export',
    'Priority support',
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.iconCircle, { backgroundColor: theme.colors.accentSoft }]}>
          <Sparkles size={28} color={theme.colors.accent} />
        </View>
        <H1 align="center" style={{ marginTop: 16 }}>
          Unlock Refine+
        </H1>
        <Body color={theme.colors.textSecondary} align="center" style={{ marginTop: 8 }}>
          Deeper personalization, unlimited coaching, advanced Look Lab. No dark patterns, cancel anytime.
        </Body>

        <Card style={{ marginTop: 24 }}>
          <Caption color={theme.colors.textMuted}>WHAT YOU GET</Caption>
          <View style={{ gap: 12, marginTop: 12 }}>
            {features.map((f, i) => (
              <View key={i} style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                <View style={[styles.checkCircle, { backgroundColor: theme.colors.successSoft }]}>
                  <Check size={12} color={theme.colors.success} />
                </View>
                <BodySmall style={{ flex: 1 }}>{f}</BodySmall>
              </View>
            ))}
          </View>
        </Card>

        <View style={{ gap: 12, marginTop: 24 }}>
          <Card style={[styles.priceCard, { borderColor: theme.colors.accent, borderWidth: 2 }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <H2>Yearly</H2>
                <BodySmall color={theme.colors.textSecondary}>$39.99/year • $3.33/month • 60% savings</BodySmall>
                <Caption color={theme.colors.accent} style={{ marginTop: 4 }}>
                  3-day free trial, then $39.99/year
                </Caption>
              </View>
              <View style={[styles.badge, { backgroundColor: theme.colors.accent }]}>
                <Caption color="#FFF">BEST VALUE</Caption>
              </View>
            </View>
          </Card>

          <Card>
            <H2>Monthly</H2>
            <BodySmall color={theme.colors.textSecondary}>$9.99/month • Flexible</BodySmall>
          </Card>
        </View>

        <View style={[styles.transparencyBox, { backgroundColor: theme.colors.surfaceSubtle, borderColor: theme.colors.border }]}>
          <Shield size={16} color={theme.colors.textSecondary} />
          <BodySmall color={theme.colors.textSecondary} style={{ flex: 1 }}>
            Price: $39.99/year auto-renews yearly. Trial: 3-day free, then $39.99/year unless cancelled 24h before end. Cancel anytime in Settings → Subscriptions. No hidden fees. Reminder before trial ends. Restore purchases available.
          </BodySmall>
        </View>

        <BodySmall color={theme.colors.textMuted} align="center" style={{ marginTop: 16 }}>
          By subscribing you agree to our Terms & Privacy. Photos private, never sold. AI insights labeled, not medical advice.
        </BodySmall>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: theme.colors.surface, borderTopColor: theme.colors.border }]}>
        <Button title="Start 3-day Free Trial" fullWidth size="lg" onPress={() => router.back()} />
        <Button title="Restore Purchases" variant="ghost" fullWidth style={{ marginTop: 8 }} onPress={() => router.back()} />
        <Button title="Maybe Later" variant="ghost" fullWidth style={{ marginTop: 4 }} onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingTop: 60, alignItems: 'center' },
  iconCircle: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  checkCircle: { width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  priceCard: { width: '100%' },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  transparencyBox: { flexDirection: 'row', gap: 8, padding: 12, borderRadius: 12, borderWidth: 1, marginTop: 24, width: '100%' },
  footer: { padding: 20, borderTopWidth: 1 },
});
