import React from 'react';
import {Text, View, Dimensions} from 'react-native';
import {fontsSize, fontFamily} from '../../../constants/fonts';
import LayoutWithoutCarousel from '../../../components/layoutWithoutCarousel';

const {width} = Dimensions.get('window');

const ViewAssignment = ({
  navigation,
  route: {
    params: {pdfURL},
  },
}) => {
  return (
    <LayoutWithoutCarousel imgsrc={0} navigation={navigation} pdfURL={pdfURL}>
      <View
        style={{
          margin: '5%',
          paddingLeft: '5%',
        }}>
        <Text
          style={{
            fontFamily: fontFamily['headings'],
            fontSize: fontsSize['large'],
          }}>
          Assignment 1
        </Text>
        <View style={{marginTop: 0.1 * width}}>
          <Text
            style={{
              fontSize: fontsSize['medium'],
            }}>
            Questions: 10
          </Text>
          <Text style={{marginTop: 0.04 * width}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lobortis
            tortor lobortis lacus, vestibulum quis.
          </Text>
        </View>
      </View>
    </LayoutWithoutCarousel>
  );
};

export default ViewAssignment;
