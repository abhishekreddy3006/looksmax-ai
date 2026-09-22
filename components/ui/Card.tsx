import React from 'react';
import { View, ViewStyle, StyleProp } from 'react-native';
import { useTheme } from '@/design/theme';

interface Props {
  children: React.ReactNode;
  elevated?: boolean;
  padding?: number;
  style?: StyleProp<ViewStyle>;
}

export function Card({ children, elevated, padding, style }: Props) {
  const theme = useTheme();
  return (
    <View
      style={[
        {
          backgroundColor: elevated ? theme.colors.surfaceElevated : theme.colors.surface,
          borderRadius: theme.radius.md,
          borderWidth: elevated ? 0 : 1,
          borderColor: theme.colors.border,
          padding: padding ?? theme.spacing.md,
        },
        elevated ? theme.shadows.sm : undefined,
        style as any,
      ]}
    >
      {children}
    </View>
  );
}

export function SurfaceSubtle({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  const theme = useTheme();
  return (
    <View style={[{ backgroundColor: theme.colors.surfaceSubtle, borderRadius: theme.radius.md, padding: theme.spacing.md }, style as any]}>
      {children}
    </View>
  );
}
