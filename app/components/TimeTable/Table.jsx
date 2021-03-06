import React from 'react';
import { View, StyleSheet } from 'react-native';
import Cell from './Cell';
import { RANGES_HEADER } from 'helpers/profileAndOnboarding';

const Table = ({
  squares,
  handleChangeText,
  handleAddDayRow,
  handleRemoveDayRow,
  addPlusIcon,
  addMinusIcon,
  isWalkerEdit,
}) => {
  const renderHeader = () => {
    return (
      <>
        {RANGES_HEADER.map((title, idx) => (
          <View style={styles.row} key={idx}>
            <Cell customStyles={titleStyles} value={title.day_of_week} isTitle />
            <Cell customStyles={headerStyles} value={title.start_at} isTitle />
            <Cell customStyles={headerStyles} value={title.end_at} isTitle />
          </View>
        ))}
      </>
    );
  };

  const renderTableRow = () => {
    return (
      <>
        {renderHeader()}
        {squares.map((day, idx) => (
          <View style={styles.row} key={idx}>
            <Cell
              customStyles={titleStyles}
              value={day.day_of_week}
              handleChangeText={handleChangeText}
              isTitle
              idx={idx}
              addPlusIcon={addPlusIcon}
              addMinusIcon={addMinusIcon}
              handleAddDayRow={handleAddDayRow}
              handleRemoveDayRow={handleRemoveDayRow}
            />
            <Cell
              customStyles={dataStyles}
              value={day.start_at}
              idx={idx}
              col="start_at"
              handleChangeText={handleChangeText}
              isWalkerEdit={isWalkerEdit}
            />
            <Cell
              customStyles={dataStyles}
              value={day.end_at}
              idx={idx}
              col="end_at"
              handleChangeText={handleChangeText}
              isWalkerEdit={isWalkerEdit}
            />
          </View>
        ))}
      </>
    );
  };

  if (squares.length) {
    return <View>{renderTableRow()}</View>;
  }

  return null;
};

const styles = StyleSheet.create({
  boardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    height: 50,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#F3F3EB',
  },
});

const titleStyles = StyleSheet.create({
  container: {
    backgroundColor: '#f4d7a3',
    borderColor: '#f3f3eb',
    justifyContent: 'center',
  },
  text: {
    textTransform: 'capitalize',
  },
});
const headerStyles = StyleSheet.create({
  container: {
    backgroundColor: '#f4d7a3',
    borderColor: '#f3f3eb',
  },
});
const dataStyles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderColor: '#f4d7a3',
  },
});

export default Table;
