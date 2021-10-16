import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginVertical: 12,
  },
  picture: {
    height: 90,
    width: 90,
    borderRadius: 100,
  },
  personal: {
    flex: 1,
    flexDirection: 'row',
    padding: 20,
  },
  personalRight: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  nameContainer: {
    flexDirection: 'row',
  },
  icon: {
    height: 20,
    width: 20,
    resizeMode: 'cover',
  },
  iconAndData: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingVertical: 8,
  },
  btn: {
    alignItems: 'center',
  },
  btnContainer: {
    flexGrow: 1,
    padding: 10,
    paddingLeft: 20,
  },
  btnLabel: {
    fontSize: 18,
    color: '#D32F2F',
  },
  email: {
    color: '#364C63',
    fontSize: 16,
    fontWeight: '400',
  },
  hr: {
    paddingVertical: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    borderBottomColor: '#bfbfbf',
    borderBottomWidth: 1,
  },
  petTitle: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    color: '#757575',
    fontSize: 16,
  },
  petDataRow: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
  },
  petDataRowTitle: {
    flexDirection: 'row',
  },
  petName: {
    paddingLeft: 20,
    color: '#364C63',
    fontSize: 16,
  },
  message: {
    padding: 20,
    margin: 10,
    color: 'black',
    borderWidth: 1,
    backgroundColor: '#fff',
    textAlign: 'left',
    borderColor: '#f4d7a3',
    borderRadius: 10,
  },
  saveButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  authentication__errorMsg: {
    paddingHorizontal: 10,
    color: 'red',
  },
});

export const name = StyleSheet.create({
  label: {
    color: '#364C63',
    paddingRight: 5,
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});

export const personal = StyleSheet.create({
  label: {
    color: '#364C63',
    fontSize: 16,
    fontWeight: '400',
    paddingHorizontal: 15,
    flexWrap: 'wrap',
    flex: 1,
  },
});
