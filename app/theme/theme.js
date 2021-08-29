import { DefaultTheme } from '@react-navigation/native';

const defaultColors = {
  primary: '#f4b445',
  secondary: '#f4d7a3',
  background: '#F3F3EB',
  text: '#364C63',
  error: '#D32F2F',
  border: '#212121',
  activeTab: '#1976D2',
  inactiveTab: '#757575',
};

export const theme = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...defaultColors,
    },
  },
  dark: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      ...defaultColors,
    },
  },
};
