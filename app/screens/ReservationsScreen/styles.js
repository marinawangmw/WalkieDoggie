import { StyleSheet, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: windowWidth,
  },
  data: {
    width: '100%',
    paddingVertical: 10,
  },
  dataTitle: {
    paddingBottom: 5,
    fontSize: 16,
  },
  dataContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  details: {
    padding: 10,
    flexShrink: 1,
  },
  checkbox: {
    marginRight: 10,
  },
  reservationTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24,
  },
  reservationItem: {
    fontSize: 14,
    lineHeight: 21,
    width: '100%',
    flexWrap: 'wrap',
  },
  btnContainer: {
    flexDirection: 'row',
  },
  errorMessage: {
    textAlign: 'center',
    color: '#D32F2F',
  },
});
