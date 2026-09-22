import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TextInput, Pressable } from 'react-native';
import { useTheme } from '@/design/theme';
import { H1, Body, BodySmall, Caption } from '@/design/typography';
import { Card, Chip } from '@/components/ui';
import { Send, Sparkles } from 'lucide-react-native';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function Coach() {
  const theme = useTheme();
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', content: "Hi! I'm your Refine Coach. I know your goals (Hair + Grooming), Top 3 opportunities, and your 30-day plan. Ask me anything like 'What should I focus this week?' or 'Would this haircut suit me?'" },
  ]);
  const [input, setInput] = useState('');

  const suggestions = ['What should I focus this week?', 'Would this haircut suit me?', 'How do I maintain this?', 'Why did you recommend this?'];

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');

    // Mock response for Phase 1
    setTimeout(() => {
      const responses: Record<string, string> = {
        'What should I focus this week?': "Based on your Top 3, focus on defining hair texture (low effort, high impact) and your 5-min grooming routine. You've completed 1 of 4 today — keep momentum! Try curl cream tomorrow morning.",
        'Would this haircut suit me?': "Textured Crop suits you: oval face + wavy texture + low maintenance tolerance. Maintenance low, styling 3 min. Tell barber: sides low fade #2, top 3cm textured, natural wave. Want a barber card?",
        default: "Great question! Since you prefer low maintenance and 10 min/day, I'd suggest focusing on high-impact, low-effort actions first. Your Top 3 is hair texture, grooming routine, and eyewear fit. Want me to break down any of these into WHAT/WHY/HOW?",
      };
      const reply = responses[text] || responses.default;
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: reply }]);
    }, 800);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border, backgroundColor: theme.colors.surface }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={[styles.coachIcon, { backgroundColor: theme.colors.accentSoft }]}>
            <Sparkles size={18} color={theme.colors.accent} />
          </View>
          <View>
            <Body style={{ fontWeight: '600' }}>Refine Coach</Body>
            <Caption color={theme.colors.textSecondary}>Context-aware • Knows your Top 3 + plan</Caption>
          </View>
        </View>
        <View style={[styles.contextPill, { backgroundColor: theme.colors.surfaceSubtle }]}>
          <Caption color={theme.colors.textMuted}>3 messages/day free</Caption>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.messages} showsVerticalScrollIndicator={false}>
        {messages.map((m) => (
          <View key={m.id} style={[styles.bubble, m.role === 'user' ? { alignSelf: 'flex-end', backgroundColor: theme.colors.accent } : { alignSelf: 'flex-start', backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border }]}>
            <BodySmall color={m.role === 'user' ? '#FFF' : theme.colors.textPrimary}>{m.content}</BodySmall>
          </View>
        ))}

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
          {suggestions.map((s) => (
            <Chip key={s} label={s} onPress={() => send(s)} />
          ))}
        </View>

        <Card style={{ marginTop: 16 }}>
          <Caption color={theme.colors.textMuted}>SAFETY</Caption>
          <BodySmall color={theme.colors.textSecondary} style={{ marginTop: 4 }}>
            I can't diagnose medical conditions or recommend unsafe practices like bone smashing. I'll redirect to safer alternatives + resources if asked.
          </BodySmall>
        </Card>
      </ScrollView>

      <View style={[styles.inputBar, { borderTopColor: theme.colors.border, backgroundColor: theme.colors.surface }]}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Ask about your plan, haircut, maintenance..."
          placeholderTextColor={theme.colors.textMuted}
          style={[styles.input, { backgroundColor: theme.colors.surfaceSubtle, color: theme.colors.textPrimary }]}
          multiline
        />
        <Pressable onPress={() => send(input)} style={[styles.sendBtn, { backgroundColor: theme.colors.accent }]}>
          <Send size={18} color="#FFF" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 16, paddingTop: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1 },
  coachIcon: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  contextPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  messages: { padding: 16, gap: 12, paddingBottom: 100 },
  bubble: { maxWidth: '85%', padding: 12, borderRadius: 16, borderTopLeftRadius: 4 },
  inputBar: { flexDirection: 'row', gap: 8, padding: 12, borderTopWidth: 1, alignItems: 'flex-end' },
  input: { flex: 1, borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10, maxHeight: 100 },
  sendBtn: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
});
