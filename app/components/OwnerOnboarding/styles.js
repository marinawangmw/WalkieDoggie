import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrapper: {},
  scrollContainer: {
    paddingTop: 100,
    width: '100%',
    paddingHorizontal: 20,
    height: '100%',
  },
  container: {
    alignItems: 'center',
  },
  input: {
    fontSize: 16,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f4d7a3',
    borderRadius: 25,
  },
  space: {
    height: 10,
  },
  switchWrapper: {
    marginVertical: 10,
  },
  description: {
    paddingVertical: 20,
    height: 100,
    borderRadius: 10,
    letterSpacing: 0.6,
    lineHeight: 20,
  },
  button: {
    fontSize: 16,
    marginVertical: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f4d7a3',
    borderRadius: 25,
    width: '50%',
  },
  menuContainer: {
    backgroundColor: '#fff',
    borderColor: '#f4d7a3',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  petInfoContainer: {
    marginVertical: 10,
  },
  bottomSpace: {
    height: 400,
  },
  saveButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
