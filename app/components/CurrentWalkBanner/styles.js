import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  banner: {
    margin: 20,
    marginVertical: 5,
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 5,
    elevation: 2,
    justifyContent: 'space-between',
    flex: 1,
  },
  icon: {
    height: 40,
    width: 40,
  },
  arrowContainer: {
    justifyContent: 'center',
    height: '100%',
    flex: 1,
  },
  arrowIcon: {
    height: 20,
    width: 20,
    tintColor: 'gray',
  },
  body: {
    paddingHorizontal: 20,
    flex: 10,
    alignSelf: 'center',
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
  },
  description: {
    fontSize: 11,
  },
});
