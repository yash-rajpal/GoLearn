import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  Text,
} from 'react-native';
import {styles} from './styles';
import {themes} from '../../constants/colors';
import {fontsSize, fontFamily} from '../../constants/fonts';

import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const {width, height} = Dimensions.get('window');

const LayoutWithoutCarousel = ({
  children,
  imgsrc,
  navigation,
  pdfURL,
}: {
  children: any;
  imgsrc: number;
  pdfURL: string;
}) => {
  const imgarr = [
    {
      item: require('../../assets/Images/Assignment/card_cartoon_1.png'),
    },
  ];

  return (
    <>
      <SafeAreaView
        style={{flex: 0, backgroundColor: themes['light'].backgroundDark}}
      />
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={themes['light'].backgroundDark} />
        <KeyboardAvoidingView behavior="height">
          <ScrollView>
            <View style={styles.top}>
              <Image
                source={imgarr[imgsrc].item}
                style={styles.topImage}
                resizeMode="contain"
              />
              <MaterialCommunityIcons
                onPress={() => navigation.goBack()}
                name="keyboard-backspace"
                size={0.1 * width}
                color="#fff"
                style={{
                  position: 'absolute',
                  top: StatusBar.currentHeight,
                  left: 0.04 * width,
                }}
              />
            </View>
            <View style={styles.bottom}>
              <View
                style={{
                  ...StyleSheet.absoluteFillObject,
                  backgroundColor: themes['light'].backgroundDark,
                }}
              />
              <View
                style={{
                  height: 0.46 * height,
                  backgroundColor: themes['light'].backgroundLight,
                  borderTopLeftRadius: width * 0.18,
                }}>
                {children}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        {pdfURL && (
          <View
            style={{
              height: 0.15 * width,
              width: width,
              position: 'absolute',
              bottom: 0,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{width: 0.5 * width, alignItems: 'center'}}
              onPress={() => {
                navigation.navigate('DisplayPDF', {pdfURL: pdfURL});
              }}>
              <Text
                style={{
                  fontSize: fontsSize['large'],
                  fontFamily: fontFamily['headings'],
                }}>
                PRINT
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Camera')}
              style={{width: 0.5 * width, alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: fontsSize['large'],
                  fontFamily: fontFamily['headings'],
                }}>
                SUBMIT
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

export default LayoutWithoutCarousel;
