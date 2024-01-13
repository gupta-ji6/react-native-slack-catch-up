import { Text, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { OverlayProps } from '../types';

const UnreadOverlay: React.FC<OverlayProps> = ({ animatedStyle }) => {
  return (
    <Animated.View style={[animatedStyle, styles.overlayContainer]}>
      <Ionicons name='arrow-undo-circle' size={48} color='white' />
      <Text style={styles.overlayText}>Keep {'\n'}Unread</Text>
    </Animated.View>
  );
};

export default UnreadOverlay;

const styles = StyleSheet.create({
  overlayContainer: {
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
  overlayText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    paddingTop: 10,
    textAlign: 'right',
  },
});
