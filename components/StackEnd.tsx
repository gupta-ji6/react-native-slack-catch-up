import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import Animated, {
  SlideInDown,
  SlideOutDown,
  ZoomIn,
} from 'react-native-reanimated';
import Button from './Button';

interface Props {
  onReset: () => void;
}

const StackEnd: React.FC<Props> = ({ onReset }) => {
  return (
    <Animated.View
      entering={ZoomIn}
      style={[{ flex: 1, alignItems: 'center', justifyContent: 'center' }]}
    >
      <View style={{ alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <Text style={{ fontSize: 64 }}>🙌</Text>
        <Text style={{ color: '#fff', fontSize: 28, fontWeight: 'bold' }}>
          All Caught Up.
        </Text>
      </View>

      <Animated.View
        style={[styles.buttonsContainer]}
        entering={SlideInDown.springify().mass(0.5).damping(15).delay(250)}
        exiting={SlideOutDown.springify().mass(0.5).damping(15)}
      >
        <Button title='Reset' variant='primary' onPress={onReset} />
      </Animated.View>
    </Animated.View>
  );
};

export default StackEnd;

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    columnGap: 10,
    paddingTop: 60,
  },
});
