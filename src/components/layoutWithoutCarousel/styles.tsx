import {StyleSheet, Dimensions} from 'react-native';
import {themes} from '../../constants/colors';
const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes['light'].backgroundLight,
  },
  top: {
    height: 0.55 * height,
    backgroundColor: themes['light'].backgroundDark,
    borderBottomRightRadius: width * 0.18,
  },
  bottom: {
    flex: 1,
    height: 0.45 * height,
    top: -0.1,
  },
  topImage: {
    width: width * 0.7,
    height: height * 0.38,
    alignSelf: 'center',
    marginTop: '10%',
  },
});
