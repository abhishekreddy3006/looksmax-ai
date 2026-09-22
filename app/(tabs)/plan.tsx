import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@/design/theme';
import { H1, H3, Body, BodySmall, Caption } from '@/design/typography';
import { Card, Chip } from '@/components/ui';
import { Check, Clock } from 'lucide-react-native';

interface PlanItem {
  id: string;
  title: string;
  explanation: string;
  time: string;
  frequency: string;
  difficulty: 'low' | 'medium' | 'high';
  week: number;
  completed: boolean;
}

export default function Plan() {
  const theme = useTheme();
  const [filter, setFilter] = useState<'7day' | '30day'>('30day');
  const [items, setItems] = useState<PlanItem[]>([
    { id: '1', title: 'Define hair texture', explanation: 'Apply curl cream to damp hair', time: '3 min', frequency: 'daily', difficulty: 'low', week: 1, completed: true },
    { id: '2', title: '5-min grooming routine', explanation: 'Cleanse, brow trim, lip balm', time: '5 min', frequency: 'daily', difficulty: 'low', week: 1, completed: false },
    { id: '3', title: 'Try rectangular eyewear', explanation: 'Visit optician with measurements', time: '30 min', frequency: 'once', difficulty: 'medium', week: 2, completed: false },
    { id: '4', title: 'Skincare consistency', explanation: 'AM/PM cleanse + moisturize', time: '4 min', frequency: 'daily', difficulty: 'low', week: 2, completed: false },
  ]);

  const toggle = (id: string) => setItems((prev) => prev.map((i) => (i.id === id ? { ...i, completed: !i.completed } : i)));

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <H1>Your 30-day plan</H1>
        <Body color={theme.colors.textSecondary} style={{ marginTop: 8 }}>
          Personalized based on your Top 3. WHAT/WHY/HOW for each action.
        </Body>

        <View style={{ flexDirection: 'row', gap: 8, marginTop: 20 }}>
          <Chip label="7-day" selected={filter === '7day'} onPress={() => setFilter('7day')} />
          <Chip label="30-day" selected={filter === '30day'} onPress={() => setFilter('30day')} />
          <Chip label="60-day" selected={false} onPress={() => {}} />
        </View>

        <View style={{ marginTop: 24, gap: 16 }}>
          {[1, 2].map((week) => (
            <View key={week}>
              <Caption color={theme.colors.textMuted}>WEEK {week}</Caption>
              <View style={{ gap: 12, marginTop: 8 }}>
                {items
                  .filter((i) => i.week === week)
                  .map((item) => (
                    <Pressable key={item.id} onPress={() => toggle(item.id)}>
                      <Card style={[styles.itemCard, item.completed && { backgroundColor: theme.colors.surfaceSubtle }]}>
                        <View style={[styles.check, { borderColor: item.completed ? theme.colors.accent : theme.colors.border, backgroundColor: item.completed ? theme.colors.accent : 'transparent' }]}>
                          {item.completed && <Check size={14} color="#FFF" />}
                        </View>
                        <View style={{ flex: 1 }}>
                          <H3 style={{ textDecorationLine: item.completed ? 'line-through' : 'none' }}>{item.title}</H3>
                          <BodySmall color={theme.colors.textSecondary} style={{ marginTop: 2 }}>
                            {item.explanation}
                          </BodySmall>
                          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8, alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                              <Clock size={12} color={theme.colors.textMuted} />
                              <BodySmall color={theme.colors.textMuted}>{item.time}</BodySmall>
                            </View>
                            <View style={[styles.diff, { backgroundColor: theme.colors.surfaceSubtle }]}>
                              <BodySmall color={theme.colors.textSecondary}>{item.difficulty}</BodySmall>
                            </View>
                            <BodySmall color={theme.colors.textMuted}>{item.frequency}</BodySmall>
                          </View>
                        </View>
                      </Card>
                    </Pressable>
                  ))}
              </View>
            </View>
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
  itemCard: { flexDirection: 'row', gap: 12 },
  check: { width: 24, height: 24, borderRadius: 12, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  diff: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
});
