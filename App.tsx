import 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
  withSpring,
  Extrapolation,
  runOnJS,
  withTiming,
  SlideInDown,
} from 'react-native-reanimated';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ThreadCard from './components/ThreadCard';
import { SWIPE_VELOCITY_X, threads } from './constants';
import StackEnd from './components/StackEnd';
import ThreadActions from './components/ThreadActions';
import ReadOverlay from './components/ReadOverlay';

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
    })
    .onEnd((e) => {
      // If the swipe velocity is less than the threshold, snap back to the center. Added Math.abs() to make sure the velocity is always positive.
      if (Math.abs(e.velocityX) < SWIPE_VELOCITY_X) {
        currentThreadCardTranslateX.value = withSpring(0, {
          damping: 15,
        });
        return;
      }

      // If the swipe velocity is greater than the threshold, animate the card off the screen depending on the swipe direction.
      currentThreadCardTranslateX.value = withTiming(
        Math.sign(e.velocityX) * windowWidth,
        { duration: 250 },
        (isFinished) => {
          if (isFinished) {
            // Update the current and next thread indices. Since gestures run on UI thread, we need to update JS state with runOnJS function
            runOnJS(setCurrentThreadIndex)(currentThreadIndex + 1);
          }
        }
      );
    });

  // update the next thread index when the current thread index changes
  useEffect(() => {
    // reset the current thread card position when the current thread index changes
    currentThreadCardTranslateX.value = 0;
    setNextThreadIndex(currentThreadIndex + 1);
  }, [currentThreadIndex, currentThreadCardTranslateX]);

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
            [1, 0.9, 1],
            Extrapolation.CLAMP // clamped to not go beyond the range
          ),
        },
        {
          translateY: -16,
        },
      ],
      opacity: interpolate(
        currentThreadCardTranslateX.value,
        [-windowWidth / 2, 0, windowWidth / 2],
        [1, 0.5, 1],
        Extrapolation.CLAMP // clamped to not go beyond the range
      ),
    };
  });

  const readOverlayStyles = useAnimatedStyle(() => ({
    opacity: interpolate(
      currentThreadCardTranslateX.value,
      [0, windowWidth / 3],
      [0, 1]
    ),
  }));

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <View style={styles.root}>
          <View>
            {nextThread ? (
              <Animated.View
                style={[nextThreadCardStyle]}
                entering={SlideInDown.springify()
                  .mass(0.5)
                  .damping(15)
                  .delay(250)}
              >
                <ThreadCard
                  style={{ ...StyleSheet.absoluteFillObject }}
                  thread={nextThread}
                />
              </Animated.View>
            ) : null}

            {currentThread ? (
              <GestureDetector gesture={panGesture}>
                <Animated.View
                  style={[currentThreadCardStyle]}
                  entering={SlideInDown.springify().mass(0.5).damping(15)}
                >
                  <ReadOverlay animatedStyle={readOverlayStyles} />
                  <ThreadCard thread={currentThread} />
                </Animated.View>
              </GestureDetector>
            ) : null}
          </View>

          {currentThread ? <ThreadActions /> : null}

          {!currentThread && !nextThread ? <StackEnd /> : null}
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
});
