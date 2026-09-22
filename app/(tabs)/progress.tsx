import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useTheme } from '@/design/theme';
import { H1, H2, H3, Body, BodySmall, Caption } from '@/design/typography';
import { Card, SurfaceSubtle } from '@/components/ui';

export default function Progress() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <H1>Progress</H1>
        <Body color={theme.colors.textSecondary} style={{ marginTop: 8 }}>
          Track consistency, not fake scores. Visible progress builds confidence.
        </Body>

        <Card style={{ marginTop: 24 }}>
          <H3>Consistency</H3>
          <View style={{ flexDirection: 'row', gap: 4, marginTop: 12 }}>
            {Array.from({ length: 30 }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.day,
                  {
                    backgroundColor: i % 7 < 5 ? theme.colors.accent : theme.colors.surfaceSubtle,
                  },
                ]}
              />
            ))}
          </View>
          <BodySmall color={theme.colors.textSecondary} style={{ marginTop: 12 }}>
            24/30 days • 80% consistency • 4-day streak
          </BodySmall>
        </Card>

        <View style={{ marginTop: 24 }}>
          <H2>Timeline</H2>
          <View style={{ marginTop: 12, gap: 12 }}>
            {[
              { date: 'Sep 22', type: 'Analysis', desc: 'Initial analysis completed' },
              { date: 'Sep 20', type: 'Milestone', desc: '7-day streak achieved!' },
              { date: 'Sep 18', type: 'Photo', desc: 'Progress photo added' },
              { date: 'Sep 15', type: 'Look', desc: 'Saved Textured Crop + Barber Card' },
            ].map((item, i) => (
              <View key={i} style={{ flexDirection: 'row', gap: 12 }}>
                <View style={{ alignItems: 'center' }}>
                  <View style={[styles.dot, { backgroundColor: theme.colors.accent }]} />
                  {i < 3 && <View style={[styles.line, { backgroundColor: theme.colors.border }]} />}
                </View>
                <Card style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Caption color={theme.colors.textMuted}>{item.date}</Caption>
                    <Caption color={theme.colors.accent}>{item.type}</Caption>
                  </View>
                  <BodySmall style={{ marginTop: 4 }}>{item.desc}</BodySmall>
                </Card>
              </View>
            ))}
          </View>
        </View>

        <SurfaceSubtle style={{ marginTop: 24 }}>
          <BodySmall color={theme.colors.textMuted}>WEEKLY REVIEW</BodySmall>
          <Body style={{ marginTop: 8 }}>You've improved grooming consistency by 40% this week.</Body>
          <BodySmall color={theme.colors.textSecondary} style={{ marginTop: 4 }}>
            No fake attractiveness scores — just real habits compounding.
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
  day: { width: 8, height: 8, borderRadius: 2, flex: 1 },
  dot: { width: 12, height: 12, borderRadius: 6 },
  line: { width: 2, flex: 1, marginTop: 4 },
});
