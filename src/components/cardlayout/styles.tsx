import {StyleSheet, Dimensions} from 'react-native';
import {themes} from '../../constants/colors';
const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    height: 0.53 * width,
    width: 0.75 * width,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: themes['light'].headings,
    marginBottom: 0.04 * height,
    backgroundColor: '#EF74AB',
    shadowRadius: 2,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowColor: 'black',
    elevation: 5,
  },
});
