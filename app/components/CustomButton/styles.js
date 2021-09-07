import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    fontSize: 16,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    width: '50%',
  },
  disabled: {
    borderColor: '#999999',
    backgroundColor: '#cccccc',
    color: '#666666',
  },
  enabled: {
    backgroundColor: '#364C63',
  },
  label: {
    textAlign: 'center',
    color: '#fff',
  },
});

export default styles;
