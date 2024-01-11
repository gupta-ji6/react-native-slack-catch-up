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

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

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
        <View style={styles.container}>
          <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.card, cardStyle]}>
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: threads[0].backgroundColor,
                  borderTopLeftRadius: 18,
                  borderTopRightRadius: 18,
                  borderBottomLeftRadius: 18,
                  borderBottomRightRadius: 18,
                }}
              />
            </Animated.View>
          </GestureDetector>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 20,
              paddingHorizontal: 20,
              columnGap: 10,
            }}
          >
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#81438E',
    padding: 10,
  },
  card: {
    height: windowHeight - 220,
    width: windowWidth - 60,
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
});
