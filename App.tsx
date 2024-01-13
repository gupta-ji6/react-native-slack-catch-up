import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { threads } from './constants';
import ThreadStack from './components/ThreadStack';

const CatchUp = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.root}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <ThreadStack
            data={threads}
            onSwipeLeft={(item) => {
              // console.warn('left, ', item.id);
            }}
            onSwipeRight={(item) => {
              // console.warn('right', item.id);
            }}
            allowSwipe
            showActionButtons
            stackEnd={{
              emoji: '🙌',
              heading: 'All Caught Up.',
              showReset: true,
            }}
            header={{
              visible: true,
              showNumberOfThreadsLeft: true,
              showUndoButton: true,
              showResetIconButton: true,
            }}
          />
        </GestureHandlerRootView>
      </SafeAreaView>
    </SafeAreaProvider>
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
});
