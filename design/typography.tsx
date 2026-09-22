import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { useTheme } from './theme';
import { typography } from './tokens';

type Variant = keyof typeof typography;

interface TextProps extends RNTextProps {
  variant?: Variant;
  color?: string;
  align?: 'left' | 'center' | 'right';
}

export function Text({ variant = 'body', color, align = 'left', style, children, ...props }: TextProps) {
  const theme = useTheme();
  const typo = typography[variant];

  return (
    <RNText
      style={[
        {
          fontSize: typo.fontSize,
          lineHeight: typo.lineHeight,
          fontWeight: typo.fontWeight as any,
          letterSpacing: (typo as any).letterSpacing || 0,
          color: color || theme.colors.textPrimary,
          textAlign: align,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
}

// Convenience components
export const Display = (p: TextProps) => <Text variant="display" {...p} />;
export const H1 = (p: TextProps) => <Text variant="h1" {...p} />;
export const H2 = (p: TextProps) => <Text variant="h2" {...p} />;
export const H3 = (p: TextProps) => <Text variant="h3" {...p} />;
export const Body = (p: TextProps) => <Text variant="body" {...p} />;
export const BodySmall = (p: TextProps) => <Text variant="bodySmall" {...p} />;
export const Caption = (p: TextProps) => <Text variant="caption" {...p} />;
export const Label = (p: TextProps) => <Text variant="label" {...p} />;
