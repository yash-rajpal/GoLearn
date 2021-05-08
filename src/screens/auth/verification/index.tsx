import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, Dimensions} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import auth from '@react-native-firebase/auth';
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

async function confirmCode(confirm, otp) {
  console.log('confirm is', confirm);
  console.log('otp is', otp);
  try {
    await confirm.confirm(otp);
  } catch (error) {
    console.log('Invalid code.', error);
  }
}

const OtpVerification = ({
  setRoute,
  confirm,
  navigation,
}: {
  setRoute: React.Dispatch<React.SetStateAction<keyof Routes>>;
  confirm: any;
  navigation: any;
}) => {
  const [otp, setotp] = useState<string>('');
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  console.log('Console', user);
  function onAuthStateChanged(user) {
    if (user) {
      setUser(user);
      if (user.displayName !== null) {
        navigation.navigate('AppFlow');
        setRoute('DashBoard');
      } else {
        setRoute('SelectUserType');
      }
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirm]);
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
          confirmCode(confirm, otp);
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
