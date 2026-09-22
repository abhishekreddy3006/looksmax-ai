import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/design/theme';
import { H1, H2, H3, Body, BodySmall, Caption } from '@/design/typography';
import { Card, SurfaceSubtle, EmptyState } from '@/components/ui';
import { Shield, Star, Target, TrendingUp } from 'lucide-react-native';
import { useAnalysisStore } from '@/store/analysisStore';

export default function Analysis() {
  const theme = useTheme();
  const router = useRouter();
  const analysis = useAnalysisStore((s) => s.current);
  const hasAnalysis = !!analysis;

  if (!hasAnalysis) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <EmptyState title="No analysis yet" description="Take a photo to get your personalized profile, strengths, and Top 3 opportunities." actionLabel="Take Photo" onAction={() => router.push('/capture')} />
      </View>
    );
  }

  const data = analysis!;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Caption color={theme.colors.textMuted}>ANALYSIS • {data.is_demo ? 'DEMO — AI vision provider not configured' : `${data.provider.toUpperCase()} • ${data.confidence} confidence`}</Caption>
        <H1 style={{ marginTop: 8 }}>Your appearance profile</H1>
        <Body color={theme.colors.textSecondary} style={{ marginTop: 8 }}>
          {data.profile_summary}
        </Body>

        <View style={{ marginTop: 24 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Star size={18} color={theme.colors.accent} />
            <H2>Strengths</H2>
          </View>
          <View style={{ gap: 12, marginTop: 12 }}>
            {data.strengths.map((s, i) => (
              <Card key={i}>
                <Body style={{ fontWeight: '600' }}>{s.title}</Body>
                <BodySmall color={theme.colors.textSecondary} style={{ marginTop: 4 }}>
                  {s.evidence} • {s.leverage}
                </BodySmall>
              </Card>
            ))}
          </View>
        </View>

        <View style={{ marginTop: 24 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Target size={18} color={theme.colors.accent} />
            <H2>Top 3 Opportunities</H2>
          </View>
          <BodySmall color={theme.colors.textSecondary} style={{ marginTop: 4 }}>
            Highest-impact realistic improvements, not flaws to obsess over.
          </BodySmall>
          <View style={{ gap: 12, marginTop: 12 }}>
            {data.opportunities.slice(0, 3).map((o, i) => (
              <Card key={o.id} style={{ borderLeftWidth: 4, borderLeftColor: i === 0 ? theme.colors.accent : theme.colors.border }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Caption color={i === 0 ? theme.colors.accent : theme.colors.textMuted}>
                    {o.impact.toUpperCase()} IMPACT • {o.effort.toUpperCase()} EFFORT
                  </Caption>
                  <Caption color={theme.colors.textMuted}>#{i + 1}</Caption>
                </View>
                <H3 style={{ marginTop: 8 }}>{o.title}</H3>
                <BodySmall color={theme.colors.textSecondary} style={{ marginTop: 4 }}>
                  <BodySmall style={{ fontWeight: '600' }}>WHAT:</BodySmall> {o.what}
                </BodySmall>
                <BodySmall color={theme.colors.textSecondary}>
                  <BodySmall style={{ fontWeight: '600' }}>WHY:</BodySmall> {o.why}
                </BodySmall>
                <BodySmall color={theme.colors.textSecondary}>
                  <BodySmall style={{ fontWeight: '600' }}>HOW:</BodySmall> {o.how}
                </BodySmall>
                <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
                  <View style={[styles.tag, { backgroundColor: theme.colors.surfaceSubtle }]}>
                    <Caption color={theme.colors.textSecondary}>{o.timeline}</Caption>
                  </View>
                  <View style={[styles.tag, { backgroundColor: theme.colors.accentSoft }]}>
                    <Caption color={theme.colors.accentStrong}>{o.maintenance} maintenance</Caption>
                  </View>
                </View>
              </Card>
            ))}
          </View>
        </View>

        <View style={{ marginTop: 24 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <TrendingUp size={18} color={theme.colors.accent} />
            <H2>Impact Map</H2>
          </View>
          <BodySmall color={theme.colors.textSecondary} style={{ marginTop: 4 }}>
            Prevents obsession over tiny imperfections.
          </BodySmall>
          <Card style={{ marginTop: 12 }}>
            <View style={styles.impactRow}>
              <View style={[styles.impactDot, { backgroundColor: theme.colors.accent }]} />
              <BodySmall style={{ fontWeight: '600' }}>HIGH IMPACT</BodySmall>
            </View>
            <BodySmall color={theme.colors.textSecondary} style={{ marginTop: 4 }}>
              {data.impact_map.high.join(' • ')}
            </BodySmall>
            <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
            <View style={styles.impactRow}>
              <View style={[styles.impactDot, { backgroundColor: theme.colors.warning }]} />
              <BodySmall style={{ fontWeight: '600' }}>MEDIUM IMPACT</BodySmall>
            </View>
            <BodySmall color={theme.colors.textSecondary} style={{ marginTop: 4 }}>
              {data.impact_map.medium.join(' • ')}
            </BodySmall>
            <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
            <View style={styles.impactRow}>
              <View style={[styles.impactDot, { backgroundColor: theme.colors.textMuted }]} />
              <BodySmall style={{ fontWeight: '600' }}>LOW PRIORITY</BodySmall>
            </View>
            <BodySmall color={theme.colors.textSecondary} style={{ marginTop: 4 }}>
              {data.impact_map.low.join(' • ')}
            </BodySmall>
          </Card>
        </View>

        <SurfaceSubtle style={{ marginTop: 24, flexDirection: 'row', gap: 8 }}>
          <Shield size={16} color={theme.colors.textSecondary} />
          <BodySmall color={theme.colors.textSecondary} style={{ flex: 1 }}>
            AI-generated insights for self-care guidance, not medical advice. Results vary, not scientifically precise. Enhance, don't obsess.
          </BodySmall>
        </SurfaceSubtle>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingTop: 60 },
  impactRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  impactDot: { width: 8, height: 8, borderRadius: 4 },
  divider: { height: 1, marginVertical: 12 },
  tag: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
});
