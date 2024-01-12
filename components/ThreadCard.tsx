import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  Dimensions,
  Text,
} from 'react-native';
import React from 'react';

interface Props {
  style?: StyleProp<ViewStyle>;
  thread: { id: number; uri: string; backgroundColor: string };
}

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

const ThreadCard: React.FC<Props> = ({ style, thread }) => {
  return (
    <View
      style={[
        styles.card,
        style,
        { backgroundColor: thread.backgroundColor ?? '#fff' },
      ]}
    >
      <Text style={styles.hash}>#{thread.id}</Text>
    </View>
  );
};

export default ThreadCard;

const styles = StyleSheet.create({
  card: {
    height: windowHeight - 220,
    width: windowWidth - 60,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 1)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    overflow: 'hidden',
  },
  hash: {
    fontWeight: 'bold',
    fontSize: 220,
    position: 'absolute',
    left: -40,
    top: -40,
    // left: thread.id % 2 === 0 ? null : -40,
    // top: thread.id % 2 === 0 ? null : -40,
    // right: thread.id % 2 === 0 ? -40 : null,
    // bottom: thread.id % 2 === 0 ? -40 : null,
    transform: [{ rotate: '15deg' }],
    color: 'rgba(0,0,0,0.75)',
    textDecorationStyle: 'dotted',
    textDecorationColor: 'black',
    elevation: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.5,
    textShadowRadius: 1,
  },
});
