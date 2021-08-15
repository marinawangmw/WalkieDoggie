import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  authentication__btn: {
    backgroundColor: '#364C63',
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    padding: 10,
  },
  authentication__btnLabel: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  authentication__messageContainer: {
    flexDirection: 'row',
  },
  authentication__message: {
    fontSize: 16,
    paddingVertical: 20,
  },

  authentication__input: {
    fontSize: 16,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f4d7a3',
    borderRadius: 25,
  },
  authentication__pwVisibility: {
    position: 'absolute',
    right: 20,
    bottom: 15,
  },
  authentication__clickable: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 20,
    paddingLeft: 5,
    color: '#364C63',
  },
  authentication__errorMsg: {
    color: 'red',
  },
});

export default styles;
