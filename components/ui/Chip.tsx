import React from 'react';
import { Pressable, ViewStyle, StyleProp } from 'react-native';
import { useTheme } from '@/design/theme';
import { Text } from '@/design/typography';

interface Props {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function Chip({ label, selected, onPress, style }: Props) {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          height: 32,
          paddingHorizontal: 14,
          borderRadius: theme.radius.full,
          backgroundColor: selected ? theme.colors.accentSoft : theme.colors.surface,
          borderWidth: 1,
          borderColor: selected ? theme.colors.accent : theme.colors.border,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: pressed ? 0.8 : 1,
        },
        style,
      ]}
    >
      <Text variant="bodySmall" color={selected ? theme.colors.accent : theme.colors.textSecondary} style={{ fontWeight: selected ? '600' : '400' }}>
        {label}
      </Text>
    </Pressable>
  );
}
