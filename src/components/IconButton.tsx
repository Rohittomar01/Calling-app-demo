import React from 'react';
import { Pressable, Text, StyleProp, ViewStyle } from 'react-native';

type Props = {
  onPress?: () => void;
  label?: string;
  style?: StyleProp<ViewStyle>;
};

export default function IconButton({ onPress, label, style }: Props) {
  return (
    <Pressable onPress={onPress} style={[{ padding: 12, borderRadius: 8, backgroundColor: '#eee' }, style]}>
      <Text>{label}</Text>
    </Pressable>
  );
}
