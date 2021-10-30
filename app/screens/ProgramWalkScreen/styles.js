import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 80,
    flexGrow: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  data: {
    width: '100%',
    paddingVertical: 10,
  },
  dataTitle: {
    paddingBottom: 5,
    fontSize: 16,
  },
  dataContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  details: {
    padding: 10,
    flexShrink: 1,
  },
  titleRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    alignItems: 'center',
  },
  icon: {
    height: 25,
    width: 25,
    margin: 12,
    resizeMode: 'contain',
  },
  pressable: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    flexWrap: 'wrap',
    flex: 1,
  },
  dataContent: {
    paddingVertical: 10,
  },
  reservationTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    lineHeight: 24,
  },
  reservationItem: {
    fontSize: 14,
    lineHeight: 21,
    width: '100%',
    flexWrap: 'wrap',
  },
  error: {
    textAlign: 'center',
    color: '#D32F2F',
  },
});
