import React, { useEffect, useState } from 'react';
import { View, useWindowDimensions, StyleSheet } from 'react-native';
import Animated, {
  Extrapolation,
  SlideInDown,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import ThreadCard from './ThreadCard';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { SWIPE_VELOCITY_X, Thread } from '../constants';
import ReadOverlay from './ReadOverlay';
import UnreadOverlay from './UnreadOverlay';
import ThreadActions from './ThreadActions';
import StackEnd from './StackEnd';

interface Props {
  data: Array<any>;
  onSwipeLeft?: (item: Thread) => void;
  onSwipeRight?: (item: Thread) => void;
}

const ThreadStack: React.FC<Props> = ({
  data = [],
  onSwipeLeft,
  onSwipeRight,
}) => {
  const [currentThreadIndex, setCurrentThreadIndex] = useState(0);
  const [nextThreadIndex, setNextThreadIndex] = useState(
    currentThreadIndex + 1
  );
  const { width: windowWidth } = useWindowDimensions();

  const currentThread = data[currentThreadIndex];
  const nextThread = data[nextThreadIndex];

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

  // update the next thread index when the current thread index changes
  useEffect(() => {
    // reset the current thread card position when the current thread index changes
    currentThreadCardTranslateX.value = 0;
    setNextThreadIndex(currentThreadIndex + 1);
  }, [currentThreadIndex, currentThreadCardTranslateX]);

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

      const onSwipe = e.velocityX > 0 ? onSwipeRight : onSwipeLeft;
      onSwipe && runOnJS(onSwipe)(currentThread);
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

  const currentThreadCardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: currentThreadCardTranslateX.value },
        { rotate: currentThreadCardRotate.value },
        { scale: currentThreadCardScale.value },
      ],
    };
  });

  const readOverlayStyles = useAnimatedStyle(() => ({
    opacity: interpolate(
      currentThreadCardTranslateX.value,
      [0, windowWidth / 3],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  const unreadOverlayStyles = useAnimatedStyle(() => ({
    opacity: interpolate(
      currentThreadCardTranslateX.value,
      [0, -windowWidth / 3],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));

  const handleMarkRead = () => {
    'worklet';
    currentThreadCardTranslateX.value = withTiming(
      windowWidth,
      { duration: 250 },
      (isFinished) => {
        if (isFinished) {
          // Update the current and next thread indices. Since gestures run on UI thread, we need to update JS state with runOnJS function
          runOnJS(setCurrentThreadIndex)(currentThreadIndex + 1);
        }
      }
    );

    runOnJS(onSwipeRight)(currentThread);
  };

  const handleMarkUnread = () => {
    'worklet';
    currentThreadCardTranslateX.value = withTiming(
      -windowWidth,
      { duration: 250 },
      (isFinished) => {
        if (isFinished) {
          // Update the current and next thread indices. Since gestures run on UI thread, we need to update JS state with runOnJS function
          runOnJS(setCurrentThreadIndex)(currentThreadIndex + 1);
        }
      }
    );

    runOnJS(onSwipeLeft)(currentThread);
  };

  return (
    <React.Fragment>
      <View>
        {nextThread ? (
          <Animated.View
            style={[nextThreadCardStyle]}
            entering={SlideInDown.springify().mass(0.5).damping(15).delay(250)}
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
              <UnreadOverlay animatedStyle={unreadOverlayStyles} />
              <ThreadCard thread={currentThread} />
            </Animated.View>
          </GestureDetector>
        ) : null}
      </View>

      {currentThread ? (
        <ThreadActions
          onMarkRead={handleMarkRead}
          onMarkUnread={handleMarkUnread}
        />
      ) : null}

      {!currentThread && !nextThread ? <StackEnd /> : null}
    </React.Fragment>
  );
};

export default ThreadStack;
