import {Dimensions, StyleSheet} from 'react-native';
import {themes} from '../../../constants/colors';
const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  profilePicContainer: {
    width: width * 0.5,
    height: width * 0.5,
    backgroundColor: themes['light'].backgroundLight,
    borderRadius: width * 0.25,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: themes['light'].buttons,
  },
  profilePic: {
    width: width * 0.4,
    height: width * 0.4,
  },
});

export const settingRowStyles = StyleSheet.create({
  mainContainer: {
    height: height * 0.08,
    width: '100%',
    paddingLeft: 10,
    justifyContent: 'center',
  },
});
