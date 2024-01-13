import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Props {
  showNumberOfThreadsLeft?: boolean;
  showUndoButton?: boolean;
  showResetIconButton?: boolean;
  numberOfThreadsLeft: number;
  currentThreadIndex: number;
  onReset: () => void;
  onUndo: () => void;
}

const disbaledColor = 'rgba(255, 255, 255, 0.5)';

const Header: React.FC<Props> = ({
  showNumberOfThreadsLeft = true,
  showResetIconButton = true,
  showUndoButton = true,
  numberOfThreadsLeft = 0,
  currentThreadIndex = 0,
  onReset,
  onUndo,
}) => {
  const isDisabled = currentThreadIndex === 0;

  return (
    <React.Fragment>
      {numberOfThreadsLeft !== 0 ? (
        <View style={styles.container}>
          {showResetIconButton ? (
            <BorderlessButton onPress={onReset} style={styles.reset}>
              <MaterialCommunityIcons
                name='restart'
                size={24}
                color={isDisabled ? disbaledColor : 'white'}
              />
            </BorderlessButton>
          ) : null}

          {showNumberOfThreadsLeft ? (
            <Text style={[styles.text, {}]}>{numberOfThreadsLeft} Left</Text>
          ) : null}

          {showUndoButton ? (
            <BorderlessButton onPress={onUndo} style={styles.undo}>
              <Text
                style={[
                  styles.text,
                  {
                    color: isDisabled ? disbaledColor : '#fff',
                    textAlign: 'right',
                  },
                ]}
              >
                Undo
              </Text>
            </BorderlessButton>
          ) : null}
        </View>
      ) : null}
    </React.Fragment>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reset: {
    flex: 1 / 3,
  },
  undo: {
    flex: 1 / 3,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
  },
});
