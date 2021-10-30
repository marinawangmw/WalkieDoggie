import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 100,
    padding: 20,
    flex: 1,
  },
  input: {
    fontSize: 16,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f4d7a3',
    borderRadius: 25,
  },
  description: {
    paddingVertical: 20,
    height: 100,
    borderRadius: 10,
    letterSpacing: 0.6,
    lineHeight: 20,
  },
  space: {
    height: 150,
  },
  saveButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: '#D32F2F',
    textAlign: 'center',
  },
  loader: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F3EBCC',
  },
  allowsTrackingView: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginVertical: 35,
  },
  allowsTrackingText: {
    fontSize: 14,
    marginTop: 12,
  },
});

export default styles;
