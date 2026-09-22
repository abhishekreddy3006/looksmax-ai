import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { useTheme } from '@/design/theme';
import { H1, H3, Body, BodySmall, Caption } from '@/design/typography';
import { Card, Chip, Button } from '@/components/ui';

const LOOKS = [
  { id: '1', name: 'Textured Crop', category: 'hair', maintenance: 'low', why: 'Suits oval face + wavy texture, low maintenance' },
  { id: '2', name: 'Short Beard Fade', category: 'beard', maintenance: 'medium', why: 'Adds definition, complements jawline' },
  { id: '3', name: 'Rectangular Glasses', category: 'eyewear', maintenance: 'low', why: 'Balances proportions, professional' },
  { id: '4', name: 'Curtain Bangs', category: 'hair', maintenance: 'medium', why: 'Softens forehead, versatile styling' },
];

export default function LookLab() {
  const theme = useTheme();
  const [filter, setFilter] = useState('all');

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <H1>Look Lab</H1>
        <Body color={theme.colors.textSecondary} style={{ marginTop: 8 }}>
          Explore hairstyles, facial hair, eyewear that suit you. Each with why it may suit, maintenance, what to tell barber.
        </Body>

        <View style={{ flexDirection: 'row', gap: 8, marginTop: 20 }}>
          {['all', 'hair', 'beard', 'eyewear'].map((f) => (
            <Chip key={f} label={f} selected={filter === f} onPress={() => setFilter(f)} />
          ))}
        </View>

        <View style={styles.grid}>
          {LOOKS.filter((l) => filter === 'all' || l.category === filter).map((look) => (
            <Card key={look.id} style={styles.lookCard}>
              <View style={[styles.lookImage, { backgroundColor: theme.colors.surfaceSubtle }]}>
                <BodySmall color={theme.colors.textMuted}>{look.category}</BodySmall>
              </View>
              <H3 style={{ marginTop: 12 }}>{look.name}</H3>
              <Caption color={theme.colors.textMuted} style={{ marginTop: 4 }}>
                {look.maintenance.toUpperCase()} MAINTENANCE
              </Caption>
              <BodySmall color={theme.colors.textSecondary} style={{ marginTop: 8 }}>
                {look.why}
              </BodySmall>
              <View style={{ marginTop: 12, gap: 8 }}>
                <Button title="Save" variant="secondary" size="sm" onPress={() => {}} />
                <Button title="Barber Mode" variant="ghost" size="sm" onPress={() => {}} />
              </View>
              <View style={[styles.barberHint, { backgroundColor: theme.colors.accentSoft, borderColor: theme.colors.accent }]}>
                <Caption color={theme.colors.accentStrong}>WHAT TO TELL BARBER</Caption>
                <BodySmall color={theme.colors.textSecondary} style={{ marginTop: 4 }}>
                  Sides: low fade #2, Top: 3cm textured, Texture: natural wave
                </BodySmall>
              </View>
            </Card>
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingTop: 60 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 20 },
  lookCard: { width: '48%', minWidth: 160 },
  lookImage: { height: 100, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  barberHint: { marginTop: 12, padding: 10, borderRadius: 10, borderWidth: 1 },
});
