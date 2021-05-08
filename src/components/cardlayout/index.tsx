import React from 'react';
import {Text, View, Dimensions, Image, TouchableOpacity} from 'react-native';
import {styles} from './styles';
const {width, height} = Dimensions.get('window');
import {data} from '../../screens/app/searchAssignment';

export interface Props {}

const CardLayout = ({
  datasent: {title, noOfQuestions, Rating, type, Description, Class, pdfURL},
  navigation,
}: {
  datasent: data;
}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ViewAssignment', {pdfURL: pdfURL})}
      style={styles.container}>
      <Image
        source={require('../../assets/Images/Assignment/card_cartoon_1.png')}
        style={{
          position: 'absolute',
          top: 0.12 * width,
          left: -0.08 * width,
          height: 0.25 * width,
          width: 0.22 * width,
        }}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{paddingLeft: 0.05 * width}}>
          <Text style={{paddingTop: 0.01 * height, color: '#fff'}}>
            {title}
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: '#fff',
              width: 0.55 * width,
              alignSelf: 'center',
              marginTop: 0.01 * height,
            }}
          />
        </View>
        <Image
          source={require('../../assets/Images/Assignment/Addition.png')}
          style={{margin: 0.02 * width, height: 0.1 * width}}
        />
      </View>
      <View style={{marginLeft: 0.13 * width, paddingLeft: 0.02 * width}}>
        <Text style={{paddingTop: 0.01 * height, color: '#fff'}}>
          No. of Questions :- {noOfQuestions}
        </Text>
        <Text style={{paddingTop: 0.01 * height, color: '#fff'}}>
          Class / Grade :- {Class}
        </Text>
        <Text
          numberOfLines={2}
          style={{paddingTop: 0.01 * height, color: '#fff'}}>
          {Description}
        </Text>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0.01 * height,
          left: 0.01 * height,
        }}>
        <Text style={{color: '#fff'}}>{type}</Text>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: 0.01 * height,
          right: 0.01 * height,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={require('../../assets/Images/Assignment/star_rating.png')}
          />
          <Text style={{paddingLeft: 0.02 * width, color: '#fff'}}>
            {Rating}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardLayout;
