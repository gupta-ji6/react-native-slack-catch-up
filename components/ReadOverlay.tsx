import { Text, ViewStyle, StyleSheet } from 'react-native';
import Animated, { AnimatedStyleProp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  animatedStyle: AnimatedStyleProp<ViewStyle>;
}

const ReadOverlay: React.FC<Props> = ({ animatedStyle }) => {
  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          ...StyleSheet.absoluteFillObject,
          justifyContent: 'center',
          alignItems: 'baseline',
          zIndex: 1,
          backgroundColor: 'rgba(69, 142, 119, 0.9)',
          backfaceVisibility: 'visible',
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          borderBottomLeftRadius: 18,
          borderBottomRightRadius: 18,
          paddingLeft: 20,
        },
      ]}
    >
      <Ionicons name='checkmark-done-circle' size={48} color='white' />
      <Text
        style={{
          fontSize: 24,
          color: '#fff',
          fontWeight: 'bold',
          paddingTop: 10,
        }}
      >
        Mark as {'\n'}Read
      </Text>
    </Animated.View>
  );
};

export default ReadOverlay;
