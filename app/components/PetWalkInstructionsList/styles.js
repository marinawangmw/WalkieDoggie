import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    flex: 1,
  },
  itemText: {
    flexShrink: 1,
    flexWrap: 'wrap',
    fontSize: 14,
  },
  checkbox: {},
  header: {
    padding: 5,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
});
