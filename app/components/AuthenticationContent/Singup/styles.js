import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  authentication__input: {
    fontSize: 16,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f4d7a3',
    borderRadius: 25,
  },
  authentication__userTypeContainer: {
    flexDirection: 'row',
  },
  authentication__userType: {
    fontSize: 18,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f4d7a3',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
  },
  authentication__userTypeText: {
    color: '#354d65',
  },
  authentication__userTypeSelected: {
    backgroundColor: '#f4b445',
  },
  authentication__userTypeTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
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
  authentication__clickable: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 20,
    paddingLeft: 5,
    color: '#364C63',
  },
});

export default styles;
