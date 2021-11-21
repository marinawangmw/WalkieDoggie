import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 100,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    flex: 1,
  },
  itemText: {
    flexShrink: 1,
    flexWrap: 'wrap',
    fontSize: 14,
  },
  checkbox: {},
  header: {
    padding: 10,
    paddingLeft: 30,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#e8e8e8',
    marginTop: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '700',
  },
  content: {
    padding: 10,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 18,
    paddingVertical: 10,
    paddingLeft: 10,
  },
  icon: {
    height: 20,
    width: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
  },
  modal: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    paddingTop: 0,
  },
  modalTitle: {
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  modalSubtitle: {
    textAlign: 'center',
    fontSize: 13,
    marginBottom: 20,
  },
  input: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: '#e8e8e8',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  acceptButton: {
    backgroundColor: '#f4d7a3',
  },
  logo: {
    height: 100,
    width: 100,
    alignSelf: 'center',
  },
  error: {
    color: '#D32F2F',
    paddingBottom: 20,
  },
});
