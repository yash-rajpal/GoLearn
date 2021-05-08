import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import {themes} from '../../../constants/colors';
const {height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes['light'].backgroundLight,
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    height: 0.1 * height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    alignItems: 'center',
  },
});
