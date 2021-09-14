import React from 'react';
import { View, StyleSheet } from 'react-native';
import Cell from './Cell';

const Table = ({ squares, handleChangeText }) => {
  const renderSquare = (i) => (
    <Cell value={squares[i]} idx={i} handleChangeText={handleChangeText} />
  );

  return (
    <View>
      <View style={styles.boardRow}>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </View>
      <View style={styles.boardRow}>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </View>
      <View style={styles.boardRow}>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </View>

      <View style={styles.boardRow}>
        {renderSquare(9)}
        {renderSquare(10)}
        {renderSquare(11)}
      </View>
      <View style={styles.boardRow}>
        {renderSquare(12)}
        {renderSquare(13)}
        {renderSquare(14)}
      </View>
      <View style={styles.boardRow}>
        {renderSquare(15)}
        {renderSquare(16)}
        {renderSquare(17)}
      </View>
      <View style={styles.boardRow}>
        {renderSquare(18)}
        {renderSquare(19)}
        {renderSquare(20)}
      </View>
      <View style={styles.boardRow}>
        {renderSquare(21)}
        {renderSquare(22)}
        {renderSquare(23)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  boardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Table;
