import 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
  withSpring,
} from 'react-native-reanimated';
import { View, StyleSheet, Dimensions } from 'react-native';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Button from './components/Button';
import ThreadCard from './components/ThreadCard';

const threads = [
  {
    id: 1,
    uri: 'https://picsum.photos/200/300?random=1"',
    backgroundColor: 'white',
  },
  {
    id: 2,
    uri: 'https://picsum.photos/200/300?random=2"',
    backgroundColor: 'red',
  },
  {
    id: 3,
    uri: 'https://picsum.photos/200/300?random=3"',
    backgroundColor: 'pink',
  },
  {
    id: 4,
    uri: 'https://picsum.photos/200/300?random=4"',
    backgroundColor: 'green',
  },
  {
    id: 5,
    uri: 'https://picsum.photos/200/300?random=5"',
    backgroundColor: 'blue',
  },
];

const { width: windowWidth } = Dimensions.get('window');

const CatchUp = () => {
  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);
  const rotate = useDerivedValue(
    () => interpolate(translateX.value, [0, windowWidth * 2], [0, 60]) + 'deg'
  );

  const panGesture = Gesture.Pan()
    .onTouchesDown(() => {
      scale.value = withSpring(0.98);
    })
    .onTouchesUp(() => {
      scale.value = withSpring(1);
    })
    .onStart((event) => {
      event.absoluteX = translateX.value;
    })
    .onChange((e) => {
      translateX.value = e.changeX + translateX.value;
    });

  const cardStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { rotate: rotate.value },
        { scale: scale.value },
      ],
    };
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <View style={styles.root}>
          <View>
            <ThreadCard
              style={{ backgroundColor: 'green', position: 'absolute' }}
              thread={}
            />

            <GestureDetector gesture={panGesture}>
              <Animated.View style={[cardStyle]}>
                <ThreadCard thread={} />
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
