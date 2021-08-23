import { StyleSheet } from 'react-native';

export default class StyleSheetFactory {
  static getSheet(iconSize, iconColor) {
    return StyleSheet.create({
      icon: {
        color: iconColor,
        fontSize: iconSize,
      },
    });
  }
}
