import { StyleSheet, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
    padding: 20,
    width: windowWidth,
    flex: 1,
  },
  title: {
    padding: 10,
    fontSize: 18,
    lineHeight: 25,
    fontWeight: 'bold',
  },
  data: {
    width: '100%',
    paddingVertical: 10,
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
    width: '100%',
  },
});
