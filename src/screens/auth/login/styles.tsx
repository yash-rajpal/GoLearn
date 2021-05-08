import {StyleSheet, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  textInput: {
    height: height * 0.04,
    width: width * 0.7,
    borderColor: 'black',
    marginLeft: '1%',
    color: 'black',
    padding: 1,
  },
  textInputBottomBorder: {
    borderBottomWidth: 1,
    padding: 2,
    opacity: 0.3,
  },
  getOTP: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: height * 0.05,
    width: width * 0.35,
    marginTop: height * 0.07,
    borderRadius: 10,
  },
});
