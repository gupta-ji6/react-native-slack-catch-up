import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  Dimensions,
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
    />
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
  },
});
