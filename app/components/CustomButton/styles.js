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
    backgroundColor: '#f4d7a3',
  },
  label: {
    textAlign: 'center',
    color: '#364C63',
  },
});

export default styles;
