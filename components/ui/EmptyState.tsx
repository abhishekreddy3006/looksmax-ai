import React from 'react';
import { View } from 'react-native';
import { Text } from '@/design/typography';
import { useTheme } from '@/design/theme';
import { Button } from './Button';

interface Props {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, actionLabel, onAction, icon }: Props) {
  const theme = useTheme();
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', padding: theme.spacing.xl, gap: theme.spacing.md }}>
      {icon}
      <Text variant="h3" align="center">{title}</Text>
      <Text variant="bodySmall" color={theme.colors.textSecondary} align="center">{description}</Text>
      {actionLabel && onAction && <Button title={actionLabel} onPress={onAction} variant="secondary" />}
    </View>
  );
}
