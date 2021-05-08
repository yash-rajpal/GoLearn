import {StyleSheet, Dimensions} from 'react-native';
import {themes} from '../../../constants/colors';
import {fontsSize} from '../../../constants/fonts';
const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  continue: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: height * 0.05,
    width: width * 0.35,
    marginTop: height * 0.07,
    borderRadius: 10,
  },
  selected: {
    color: themes['light'].buttonText,
    fontSize: fontsSize.medium,
  },
  notSelected: {
    color: themes['light'].buttonDisableText,
    fontSize: fontsSize.medium,
  },
  typeContainer: {
    width: width * 0.35,
    height: height * 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
