import 'react-native-gesture-handler';
import { useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
  withSpring,
} from 'react-native-reanimated';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Button from './components/Button';
import ThreadCard from './components/ThreadCard';
import { threads } from './constants';

const CatchUp = () => {
  const [currentThreadIndex, setCurrentThreadIndex] = useState(0);
  const [nextThreadIndex, setNextThreadIndex] = useState(
    currentThreadIndex + 1
  );
  const { width: windowWidth } = useWindowDimensions();

  const currentThread = threads[currentThreadIndex];
  const nextThread = threads[nextThreadIndex];

  const currentThreadCardTranslateX = useSharedValue(0);
  const currentThreadCardScale = useSharedValue(1);
  const currentThreadCardRotate = useDerivedValue(
    () =>
      interpolate(
        currentThreadCardTranslateX.value,
        [0, windowWidth * 2],
        [0, 60]
      ) + 'deg'
  );

  const panGesture = Gesture.Pan()
    .onTouchesDown(() => {
      currentThreadCardScale.value = withSpring(0.98);
    })
    .onTouchesUp(() => {
      currentThreadCardScale.value = withSpring(1);
    })
    .onStart((event) => {
      event.absoluteX = currentThreadCardTranslateX.value;
    })
    .onChange((e) => {
      currentThreadCardTranslateX.value =
        e.changeX + currentThreadCardTranslateX.value;
    });

  const currentThreadCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: currentThreadCardTranslateX.value },
        { rotate: currentThreadCardRotate.value },
        { scale: currentThreadCardScale.value },
      ],
    };
  });

  const nextThreadCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            currentThreadCardTranslateX.value,
            [-windowWidth, 0, windowWidth],
            [1, 0.9, 1]
          ),
        },
        {
          translateY: -10,
        },
      ],
      opacity: interpolate(
        currentThreadCardTranslateX.value,
        [-windowWidth / 2, 0, windowWidth / 2],
        [1, 0.5, 1]
      ),
    };
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <View style={styles.root}>
          <View>
            <Animated.View style={[nextThreadCardStyle]}>
              <ThreadCard
                style={{ ...StyleSheet.absoluteFillObject }}
                thread={nextThread}
              />
            </Animated.View>

            <GestureDetector gesture={panGesture}>
              <Animated.View style={[currentThreadCardStyle]}>
                <ThreadCard thread={currentThread} />
              </Animated.View>
            </GestureDetector>
          </View>

          <View style={styles.cardActionsContainer}>
            <Button title='Keep Unread' variant='secondary' />
            <Button title=' Mark as Read' variant='primary' />
          </View>
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default CatchUp;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#81438E',
    padding: 10,
  },
  cardActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    columnGap: 10,
  },
});
