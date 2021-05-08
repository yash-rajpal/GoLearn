import React, {useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import {fontFamily, fontsSize} from '../../../constants/fonts';
import {themes} from '../../../constants/colors';

const SelectUserType = ({goToSignUp}: {goToSignUp: any}) => {
  const [type, settype] = useState<'Parent' | 'Student'>('Parent');
  return (
    <View
      style={{
        margin: '5%',
        paddingHorizontal: '5%',
      }}>
      <Text
        style={{
          fontSize: fontsSize['large'],
          fontFamily: fontFamily.headings,
          color: themes['light'].headings,
        }}>
        Who are you ?
      </Text>
      <View style={{paddingTop: '7%'}} />
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <TouchableOpacity
          style={
            type === 'Parent'
              ? [
                  styles.typeContainer,
                  {backgroundColor: themes['light'].buttons},
                ]
              : [
                  styles.typeContainer,
                  {backgroundColor: themes['light'].buttonDisable},
                ]
          }
          onPress={() => {
            settype('Parent');
          }}>
          <Text
            style={type === 'Parent' ? styles.selected : styles.notSelected}>
            Parent
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            type === 'Student'
              ? [
                  styles.typeContainer,
                  {backgroundColor: themes['light'].buttons},
                ]
              : [
                  styles.typeContainer,
                  {backgroundColor: themes['light'].buttonDisable},
                ]
          }
          onPress={() => {
            settype('Student');
          }}>
          <Text
            style={type === 'Student' ? styles.selected : styles.notSelected}>
            Student
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          ...styles.continue,
          backgroundColor: themes['light'].buttons,
        }}
        onPress={() => {
          goToSignUp();
        }}>
        <View>
          <Text
            style={{
              color: themes['light'].buttonText,
              fontFamily: fontFamily.buttonText,
            }}>
            Continue
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SelectUserType;
