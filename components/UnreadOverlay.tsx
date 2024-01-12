import { Text, ViewStyle, StyleSheet } from 'react-native';
import Animated, { AnimatedStyleProp } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  animatedStyle: AnimatedStyleProp<ViewStyle>;
}

const UnreadOverlay: React.FC<Props> = ({ animatedStyle }) => {
  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          ...StyleSheet.absoluteFillObject,
          justifyContent: 'center',
          alignItems: 'flex-end',
          zIndex: 1,
          backgroundColor: 'rgba(71, 126, 177, 1)',
          backfaceVisibility: 'visible',
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          borderBottomLeftRadius: 18,
          borderBottomRightRadius: 18,
          padding: 20,
        },
      ]}
    >
      <Ionicons name='arrow-undo-circle' size={48} color='white' />
      <Text
        style={{
          fontSize: 24,
          color: '#fff',
          fontWeight: 'bold',
          paddingTop: 10,
          textAlign: 'right',
        }}
      >
        Keep {'\n'}Unread
      </Text>
    </Animated.View>
  );
};

export default UnreadOverlay;
