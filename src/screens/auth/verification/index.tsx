import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, Dimensions} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {styles} from './styles';
import {fontFamily, fontsSize} from '../../../constants/fonts';
import {themes} from '../../../constants/colors';
import {Routes} from '../index';

const {width, height} = Dimensions.get('window');

/**
 *
 *  @param otp: any
 *  @param setotp: any
 *  @return View for otp input
 * */
const OtpView = (props: {otp: any; setotp: any}) => {
  let {otp, setotp} = props;
  return (
    <OTPInputView
      style={{
        width: width * 0.8,
        height: height * 0.08,
      }}
      pinCount={6}
      code={otp}
      onCodeChanged={(code) => {
        setotp(code);
      }}
      codeInputFieldStyle={{
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: themes['light'].broderDark,
        color: themes['light'].headings,
      }}
      codeInputHighlightStyle={{
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: themes['light'].broderDark,
        color: themes['light'].headings,
      }}
    />
  );
};


const OtpVerification = ({
  setRoute,
  navigation,
}: {
  setRoute: React.Dispatch<React.SetStateAction<keyof Routes>>;
  navigation: any;
}) => {
  const [otp, setotp] = useState<string>('');
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
        Enter Your OTP
      </Text>
      <View style={{paddingTop: '7%'}} />
      <OtpView otp={otp} setotp={setotp} />
      <TouchableOpacity
        style={
          otp.length === 6
            ? {...styles.continue, backgroundColor: themes['light'].buttons}
            : {...styles.continue, backgroundColor: themes['light'].buttons}
        }
        onPress={() => {
          setRoute('SelectUserType');
        }}
        disabled={!(otp.length === 6)}>
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

export default OtpVerification;
