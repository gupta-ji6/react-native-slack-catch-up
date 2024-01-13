import { StyleSheet } from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import Button from './Button';
import { ThreadActionsProps } from '../types';

const ThreadActions: React.FC<ThreadActionsProps> = ({
  onMarkRead,
  onMarkUnread,
}) => {
  return (
    <Animated.View
      style={styles.cardActionsContainer}
      entering={SlideInDown.springify().mass(0.5).damping(15).delay(250)}
      exiting={SlideOutDown.springify().mass(0.5).damping(15)}
    >
      <Button title='Keep Unread' variant='secondary' onPress={onMarkUnread} />
      <Button title=' Mark as Read' variant='primary' onPress={onMarkRead} />
    </Animated.View>
  );
};

export default ThreadActions;

const styles = StyleSheet.create({
  cardActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 20,
    columnGap: 10,
  },
});
