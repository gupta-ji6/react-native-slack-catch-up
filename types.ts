import { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import Animated, { AnimatedStyleProp } from 'react-native-reanimated';

export interface Thread {
  id: number;
  backgroundColor: string;
}

export interface ThreadStackProps {
  /**
   * The data to be rendered in the stack
   */
  data: Array<Thread>;
  /**
   * Callback on swipe left action
   * @param item the value of item which was swiped left
   */
  onSwipeLeft?: (item: Thread) => void;
  /**
   * Callback on swipe right action
   * @param item the value of item which was swiped right
   * @returns
   */
  onSwipeRight?: (item: Thread) => void;
  /**
   * Whether to allow swipe gestures or not
   */
  allowSwipe?: boolean;
  /**
   * Header configuration
   */
  header?: {
    /**
     * Whether to show the header or not
     */
    visible: boolean;
    /**
     * Whether to show the number of threads left or not
     */
    showNumberOfThreadsLeft: boolean;
    /**
     * Whether to show the undo button or not
     */
    showUndoButton: boolean;
    /**
     * Whether to show the reset icon button or not
     */
    showResetIconButton: boolean;
  };
  /**
   * To toggle visibility of action buttons at the bottom
   */
  showActionButtons?: boolean;
  /**
   * Configuration for the stack end view
   */
  stackEnd?: {
    /**
     * Emoji to be shown
     */
    emoji: string;
    /**
     * Heading to be shown
     */
    heading: string;
    /**
     * Whether to show the reset button or not
     */
    showReset: boolean;
  };
}

export interface ThreadCardProps {
  style?: StyleProp<ViewStyle>;
  thread: Thread;
}

export interface ButtonProps {
  title: string;
  variant?: 'primary' | 'secondary';
  onPress?:
    | ((event: GestureResponderEvent) => void)
    | Animated.SharedValue<(event: GestureResponderEvent) => void>;
}

export interface HeaderProps {
  showNumberOfThreadsLeft?: boolean;
  showUndoButton?: boolean;
  showResetIconButton?: boolean;
  numberOfThreadsLeft: number;
  currentThreadIndex: number;
  onReset: () => void;
  onUndo: () => void;
}

export interface OverlayProps {
  animatedStyle: AnimatedStyleProp<ViewStyle>;
}

export interface StackEndProps {
  onReset: () => void;
  emoji?: string;
  heading?: string;
}

export interface ThreadActionsProps {
  onMarkRead: () => void;
  onMarkUnread: () => void;
}
