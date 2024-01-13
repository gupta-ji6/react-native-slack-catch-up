import { Text, View, StyleSheet } from 'react-native';
import React from 'react';
import Animated, {
  SlideInDown,
  SlideOutDown,
  ZoomIn,
} from 'react-native-reanimated';
import Button from './Button';
import { StackEndProps } from '../types';

const StackEnd: React.FC<StackEndProps> = ({
  onReset,
  emoji = '🙌',
  heading = 'All Caught Up.',
}) => {
  return (
    <Animated.View entering={ZoomIn} style={styles.container}>
      <View style={styles.body}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={styles.heading}>{heading}</Text>
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    columnGap: 10,
    paddingTop: 60,
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  emoji: {
    fontSize: 64,
  },
  heading: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});
