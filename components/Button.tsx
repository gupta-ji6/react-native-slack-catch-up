import { GestureResponderEvent, Pressable, StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { Text } from 'react-native';
import React from 'react';

interface Props {
  title: string;
  variant?: 'primary' | 'secondary';
  onPress?:
    | ((event: GestureResponderEvent) => void)
    | Animated.SharedValue<(event: GestureResponderEvent) => void>;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Button: React.FC<Props> = ({ title, variant = 'primary', onPress }) => {
  const buttonScale = useSharedValue(1);

  const buttonStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });

  return (
    <AnimatedPressable
      style={[
        styles.button,
        { backgroundColor: variant === 'primary' ? '#398268' : '#fff' },
        buttonStyles,
      ]}
      onPressIn={() => (buttonScale.value = withSpring(0.94))}
      onPressOut={() => (buttonScale.value = withSpring(1))}
      onPress={onPress}
    >
      <Text
        style={{
          fontWeight: 'bold',
          color: variant === 'primary' ? 'white' : 'black',
        }}
      >
        {title}
      </Text>
    </AnimatedPressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 10,
    paddingVertical: 14,
    borderCurve: 'continuous',
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
    flex: 1 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 1,
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.7,
    shadowRadius: 1,
  },
});
