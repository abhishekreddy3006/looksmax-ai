import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/design/theme';
import { H1, H2, H3, Body, BodySmall, Caption } from '@/design/typography';
import { Card, ProgressRing, SurfaceSubtle } from '@/components/ui';
import { Check, Clock, Sparkles, Settings } from 'lucide-react-native';
import { useProfileStore } from '@/store/profileStore';

interface Task {
  id: string;
  title: string;
  time: string;
  category: string;
  completed: boolean;
}

export default function Today() {
  const theme = useTheme();
  const router = useRouter();
  const goals = useProfileStore((s) => s.goals);
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: '5-min grooming routine', time: '5 min', category: 'Grooming', completed: true },
    { id: '2', title: 'Skincare: cleanse + moisturize', time: '3 min', category: 'Skin', completed: false },
    { id: '3', title: 'Review saved hairstyle', time: '2 min', category: 'Hair', completed: false },
    { id: '4', title: 'Hydration + posture check', time: '1 min', category: 'Self-care', completed: false },
  ]);

  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = completedCount / tasks.length;

  const toggle = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topRow}>
          <View style={styles.greeting}>
            <BodySmall color={theme.colors.textMuted} style={{ letterSpacing: 0.8, textTransform: 'uppercase' }}>
              Good morning
            </BodySmall>
            <H1 style={{ marginTop: 4 }}>Your focus today</H1>
          </View>
          <Pressable onPress={() => router.push('/settings')} style={[styles.settingsBtn, { backgroundColor: theme.colors.surface, borderColor: theme.colors.border }]}>
            <Settings size={18} color={theme.colors.textSecondary} />
          </Pressable>
        </View>

        <View style={[styles.focusPill, { backgroundColor: theme.colors.accentSoft, borderColor: theme.colors.accent }]}>
          <Sparkles size={14} color={theme.colors.accent} />
          <BodySmall color={theme.colors.accentStrong} style={{ fontWeight: '600' }}>
            {goals.length ? goals.join(' + ') : 'Hair + Grooming'}
          </BodySmall>
        </View>

        <Card elevated style={styles.progressCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View>
              <H2>Today's progress</H2>
              <BodySmall color={theme.colors.textSecondary} style={{ marginTop: 4 }}>
                {completedCount} of {tasks.length} completed • Keep momentum
              </BodySmall>
              <SurfaceSubtle style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Clock size={14} color={theme.colors.textSecondary} />
                <BodySmall color={theme.colors.textSecondary}>~11 min total</BodySmall>
              </SurfaceSubtle>
            </View>
            <ProgressRing progress={progress} size={72} showLabel />
          </View>
        </Card>

        <View style={{ marginTop: 24 }}>
          <H3>Top priority</H3>
          <Card style={[styles.priorityCard, { borderLeftColor: theme.colors.accent, backgroundColor: theme.colors.accentSoft } as any]}>
            <Caption color={theme.colors.accentStrong}>HIGH IMPACT • LOW EFFORT</Caption>
            <Body style={{ marginTop: 6, fontWeight: '600' }}>Define hair texture with curl cream</Body>
            <BodySmall color={theme.colors.textSecondary} style={{ marginTop: 4 }}>
              Adds structure and intentionality. Apply dime-sized amount to damp hair.
            </BodySmall>
          </Card>
        </View>

        <View style={{ marginTop: 24 }}>
          <H3>Today's actions</H3>
          <View style={{ gap: 12, marginTop: 12 }}>
            {tasks.map((task) => (
              <Pressable key={task.id} onPress={() => toggle(task.id)} style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}>
                <Card style={[styles.taskCard, task.completed ? { backgroundColor: theme.colors.surfaceSubtle } : undefined] as any}>
                  <View style={[styles.checkbox, { borderColor: task.completed ? theme.colors.accent : theme.colors.border, backgroundColor: task.completed ? theme.colors.accent : 'transparent' }]}>
                    {task.completed && <Check size={14} color="#FFF" />}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Body style={{ textDecorationLine: task.completed ? 'line-through' : 'none', color: task.completed ? theme.colors.textMuted : theme.colors.textPrimary }}>
                      {task.title}
                    </Body>
                    <View style={{ flexDirection: 'row', gap: 8, marginTop: 4 }}>
                      <View style={[styles.tag, { backgroundColor: theme.colors.surfaceSubtle }]}>
                        <BodySmall color={theme.colors.textSecondary}>{task.category}</BodySmall>
                      </View>
                      <BodySmall color={theme.colors.textMuted}>{task.time}</BodySmall>
                    </View>
                  </View>
                </Card>
              </Pressable>
            ))}
          </View>
        </View>

        <Card style={{ marginTop: 24 }}>
          <BodySmall color={theme.colors.textMuted}>QUICK INSIGHT</BodySmall>
          <Body style={{ marginTop: 8 }}>"Your routine is becoming more consistent — 4-day streak!"</Body>
          <BodySmall color={theme.colors.textSecondary} style={{ marginTop: 8 }}>
            Consistency beats intensity. Small daily actions compound into visible change in 2-3 weeks.
          </BodySmall>
        </Card>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 20, paddingTop: 60 },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  greeting: { gap: 4 },
  settingsBtn: { width: 36, height: 36, borderRadius: 18, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  focusPill: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, marginTop: 12 },
  progressCard: { marginTop: 24, padding: 20 },
  priorityCard: { marginTop: 12, borderLeftWidth: 4, padding: 16 },
  taskCard: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  checkbox: { width: 24, height: 24, borderRadius: 12, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  tag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
});
