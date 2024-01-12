import 'react-native-gesture-handler';
import { View, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { threads } from './constants';
import ThreadStack from './components/ThreadStack';

const CatchUp = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider style={{ flex: 1 }}>
        <View style={styles.root}>
          <ThreadStack
            data={threads}
            onSwipeLeft={(item) => {
              // console.warn('left, ', item.id);
            }}
            onSwipeRight={(item) => {
              // console.warn('right', item.id);
            }}
            allowSwipe={true}
            showReset={true}
            showActionButtons={true}
          />
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
});
