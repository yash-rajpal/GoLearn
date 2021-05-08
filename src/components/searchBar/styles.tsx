import {StyleSheet, Dimensions} from 'react-native';
import {themes} from '../../constants/colors';
const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    height: 0.06 * height,
    width: 0.9 * width,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: themes['light'].headings,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
