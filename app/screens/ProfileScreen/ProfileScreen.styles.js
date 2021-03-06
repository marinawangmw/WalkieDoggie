import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    marginVertical: 30,
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
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconAchievement: {
    flexDirection: 'column',
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
  allowsTrackingText: {
    marginLeft: 10,
    color: '#364C63',
    fontSize: 15,
  },
  achievementsText: {
    color: '#364C63',
    fontSize: 20,
  },
  achievementsIcons: {
    marginLeft: 5,
    height: 30,
    width: 30,
    resizeMode: 'cover',
  },
  achievementsLabel: {
    marginLeft: 10,
    color: '#364C63',
  },
  scoreContainer: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 10,
  },
  scoreIcon: {
    height: 15,
    width: 15,
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
