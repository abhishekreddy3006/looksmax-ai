import React from 'react';
import { Pressable, ActivityIndicator, ViewStyle, StyleProp, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useTheme } from '@/design/theme';
import { Text } from '@/design/typography';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface Props {
  title: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function Button({ title, onPress, variant = 'primary', size = 'md', loading, disabled, fullWidth, icon, style }: Props) {
  const theme = useTheme();

  const handlePress = () => {
    if (disabled || loading) return;
    Haptics.selectionAsync();
    onPress?.();
  };

  const height = size === 'sm' ? 36 : size === 'lg' ? 56 : 48;
  const bg = variant === 'primary' ? theme.colors.accent : variant === 'secondary' ? theme.colors.surface : 'transparent';
  const borderColor = variant === 'secondary' ? theme.colors.border : 'transparent';
  const textColor = variant === 'primary' ? '#FFFFFF' : theme.colors.textPrimary;

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        {
          height,
          backgroundColor: bg,
          borderColor,
          borderWidth: variant === 'secondary' ? 1 : 0,
          borderRadius: theme.radius.sm,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: theme.spacing.lg,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
          width: fullWidth ? '100%' : undefined,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
        variant === 'primary' ? theme.shadows.sm : undefined,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          {icon}
          <Text variant="button" color={textColor}>
            {title}
          </Text>
        </View>
      )}
    </Pressable>
  );
}
