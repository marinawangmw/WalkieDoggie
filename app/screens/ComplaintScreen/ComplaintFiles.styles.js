import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scrollContainer: {
    width: '100%',
    paddingHorizontal: 20,
    height: '100%',
    marginTop: 20,
  },
  descriptionInput: {
    fontSize: 16,
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f4d7a3',
    borderRadius: 25,
  },
  viewDescriptionInput: {
    flex: 1,
    flexDirection: 'row',
  },

  icon: {
    height: 40,
    width: 40,
    resizeMode: 'cover',
  },

  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  filesContainer: {
    flexDirection: 'row',
  },
  text: {
    paddingHorizontal: 15,
    textDecorationLine: 'underline',
    color: 'blue',
  },
  btnContainer: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#f4d7a380',
  },
  hr: {
    paddingVertical: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderBottomColor: '#bfbfbf',
    borderBottomWidth: 1,
  },
  loader: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F3EBCC',
  },
  message: {
    padding: 20,
    margin: 10,
    color: 'gray',
    borderWidth: 1,
    backgroundColor: '#fff',
    textAlign: 'center',
    borderColor: '#f4d7a3',
    borderRadius: 10,
  },
});
