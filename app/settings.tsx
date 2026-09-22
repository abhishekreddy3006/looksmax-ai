import React from 'react';
import { View, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '@/design/theme';
import { H1, H2, Body, BodySmall, Caption } from '@/design/typography';
import { Card, SurfaceSubtle } from '@/components/ui';
import { ChevronRight, Shield, Trash2, Download, Bell, User } from 'lucide-react-native';

export default function Settings() {
  const theme = useTheme();
  const router = useRouter();

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={{ marginTop: 24 }}>
      <Caption color={theme.colors.textMuted} style={{ marginBottom: 8, marginLeft: 4 }}>
        {title}
      </Caption>
      <Card style={{ padding: 0, overflow: 'hidden' }}>{children}</Card>
    </View>
  );

  const Row = ({ icon, label, desc, onPress, danger }: { icon: React.ReactNode; label: string; desc?: string; onPress?: () => void; danger?: boolean }) => (
    <Pressable onPress={onPress} style={({ pressed }) => [{ flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12, backgroundColor: pressed ? theme.colors.surfaceSubtle : theme.colors.surface }]}>
      <View style={[styles.iconBox, { backgroundColor: danger ? theme.colors.dangerSoft : theme.colors.surfaceSubtle }]}>{icon}</View>
      <View style={{ flex: 1 }}>
        <Body style={{ color: danger ? theme.colors.danger : theme.colors.textPrimary }}>{label}</Body>
        {desc && <BodySmall color={theme.colors.textSecondary}>{desc}</BodySmall>}
      </View>
      <ChevronRight size={16} color={theme.colors.textMuted} />
    </Pressable>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <H1>Settings</H1>

        <Section title="PROFILE">
          <Row icon={<User size={18} color={theme.colors.textSecondary} />} label="Edit Goals & Preferences" desc="Goals, maintenance, time, budget" onPress={() => router.push('/(onboarding)/goals')} />
          <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
          <Row icon={<Bell size={18} color={theme.colors.textSecondary} />} label="Notifications" desc="Weekly review, daily reminders (opt-in)" />
        </Section>

        <Section title="PRIVACY & DATA">
          <Row icon={<Shield size={18} color={theme.colors.textSecondary} />} label="Privacy & Data" desc="What we store, AI processing, deletion" />
          <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
          <Row icon={<Download size={18} color={theme.colors.textSecondary} />} label="Download My Data" desc="JSON export of profile, analyses, plan" />
          <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
          <Row icon={<Trash2 size={18} color={theme.colors.danger} />} label="Delete All Photos" desc="Immediate deletion from storage" danger />
          <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
          <Row icon={<Trash2 size={18} color={theme.colors.danger} />} label="Delete Account" desc="In-app deletion per Apple requirement" danger onPress={() => {}} />
        </Section>

        <Section title="SUBSCRIPTION">
          <Row icon={<Shield size={18} color={theme.colors.textSecondary} />} label="Manage Subscription" desc="Restore, cancel, billing" onPress={() => router.push('/paywall')} />
        </Section>

        <Section title="HELP & SAFETY">
          <Row icon={<Shield size={18} color={theme.colors.textSecondary} />} label="How Analysis Works" desc="AI-generated insights, not medical advice" />
          <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
          <Row icon={<Shield size={18} color={theme.colors.textSecondary} />} label="Report AI Content" desc="Flag inappropriate AI output" />
          <View style={[styles.divider, { backgroundColor: theme.colors.border }]} />
          <Row icon={<Shield size={18} color={theme.colors.textSecondary} />} label="Mental Health Resources" desc="US: 988, UK: 116123, Intl: findahelpline.org" />
        </Section>

        <SurfaceSubtle style={{ marginTop: 24 }}>
          <Caption color={theme.colors.textMuted}>PRIVACY-FIRST</Caption>
          <BodySmall color={theme.colors.textSecondary} style={{ marginTop: 8 }}>
            Photos private, encrypted, never sold. API keys server-side only. RLS enabled. You can delete anytime. AI processing requires explicit consent. Data Safety form accurate.
          </BodySmall>
          <BodySmall color={theme.colors.textMuted} style={{ marginTop: 8 }}>
            Version 1.0.0 • Build 1 • Expo + FastAPI + Supabase
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
  iconBox: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  divider: { height: 1, marginLeft: 60 },
});
