import React from 'react';
import {
  View,
  Text,
  Dimensions,
  ToastAndroid,
  TouchableOpacity,
  Share,
} from 'react-native';
import {fontsSize} from '../../../constants/fonts';
import LayoutWithoutCarousel from '../../../components/layoutWithoutCarousel';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {themes} from '../../../constants/colors';
import Clipboard from '@react-native-community/clipboard';

const {width, height} = Dimensions.get('window');

const ReferalScreen = ({navigation}) => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        title: 'App link',
        message:
          'Please install this app and stay safe , AppLink :https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en',
        url:
          'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log('error.message', error.message);
    }
  };
  return (
    <LayoutWithoutCarousel imgsrc={0} navigation={navigation}>
      <View
        style={{
          margin: '5%',
        }}>
        <Text style={{fontSize: fontsSize['large'], paddingLeft: '5%'}}>
          Refer a Friend :-
        </Text>
        <View
          style={{
            height: 0.1 * height,
            alignSelf: 'center',
            marginTop: 0.1 * width,
            borderWidth: 1,
            borderStyle: 'dashed',
            borderRadius: 15,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 20,
          }}>
          <MaterialCommunityIcons
            onPress={() => {
              Clipboard.setString('josheph5252');
              ToastAndroid.show(
                'Code Copied To Clipboard',
                ToastAndroid.BOTTOM,
              );
            }}
            name="content-save"
            size={30}
            color={themes['light'].headings}
          />
          <Text style={{fontSize: fontsSize['large'], marginLeft: 20}}>
            josheph5252
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            onShare();
          }}
          style={{
            height: 0.05 * height,
            alignSelf: 'center',
            marginTop: 0.1 * width,
            borderWidth: 1,
            borderRadius: 15,
            justifyContent: 'center',
            paddingHorizontal: 20,
          }}>
          <Text style={{fontSize: fontsSize['medium']}}>SHARE</Text>
        </TouchableOpacity>
      </View>
    </LayoutWithoutCarousel>
  );
};

export default ReferalScreen;
