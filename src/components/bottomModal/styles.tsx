import {StyleSheet, Dimensions} from 'react-native';
import {themes} from '../../constants/colors';
import {fontFamily, fontsSize} from '../../constants/fonts';
const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: 'white',
    paddingTop: 12,
    paddingHorizontal: 12,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    minHeight: 600,
  },
  sliderIndicatorRow: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderIndicator: {
    backgroundColor: '#CECECE',
    height: 4,
    width: 45,
  },
  modalTopOption: {
    paddingHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedFont: {
    fontFamily: fontFamily.headings,
    fontSize: fontsSize.medium,
    color: themes['light'].activeTintColor,
    fontWeight: 'bold',
  },
  unselectedFont: {
    fontFamily: fontFamily.headings,
    fontSize: fontsSize.medium,
    color: themes['light'].inactiveTintColor,
    fontWeight: 'bold',
  },
  filterButton: {
    height: height * 0.06,
    justifyContent: 'center',
  },
  subFilters: {
    justifyContent: 'center',
    width: width * 0.25,
    height: height * 0.12,
    borderColor: 'black',
    borderWidth: 1,
    margin: '5%',
  },
  topModalBorder: {
    borderColor: 'black',
    borderBottomWidth: 1,
    marginTop: '2%',
  },

  modalLeftRightSeperator: {
    borderRightWidth: 1,
    borderColor: 'black',
    height: height * 0.735,
  },
});
