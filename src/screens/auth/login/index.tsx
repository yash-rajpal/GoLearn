import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Dimensions,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableOpacity,
} from 'react-native';
import _getConstantDeviceInfo from '../deviceInfo/index';
import {themes} from '../../../constants/colors';
import {styles} from './styles';
import {fontsSize} from '../../../constants/fonts';
import {Routes} from '../index';
const {width} = Dimensions.get('window');

/**
 *  set states for isMobilevalid,isMobileLengthValid,isMobileNumeric,MobileNum
 *  @param e: event
 *  @param setisMobileValid: setStateAction
 *  @param setisMobileLenghtValid: setStateAction
 *  @param setisMobileNumeric: setStateAction
 *  @param setMobileNum: setStateAction
 *  @return null
 * */
const _onChange = (
  e: NativeSyntheticEvent<TextInputChangeEventData>,
  setisMobileValid: {
    (value: React.SetStateAction<boolean>): void;
    (arg0: boolean): void;
  },
  setisMobileLenghtValid: {
    (value: React.SetStateAction<boolean | null>): void;
    (arg0: boolean): void;
  },
  setisMobileNumeric: {
    (value: React.SetStateAction<boolean | null>): void;
    (arg0: boolean): void;
  },
  setMobileNum: {
    (value: React.SetStateAction<string>): void;
    (arg0: any): void;
  },
) => {
  setMobileNum(e.nativeEvent.text);
  let num = e.nativeEvent.text;
  let isnum = /^\d+$/.test(num);
  if (num.length === 10 && isnum) {
    setisMobileValid(true);
    setisMobileNumeric(true);
    setisMobileLenghtValid(true);
  } else {
    setisMobileValid(false);
    if (!isnum) {
      setisMobileNumeric(false);
    }
    if (num.length !== 10) {
      setisMobileLenghtValid(false);
    }
  }
};

const Login = ({
  setRoute,
  signInWithPhoneNumber,
}: {
  setRoute: React.Dispatch<React.SetStateAction<keyof Routes>>;
}) => {
  const [mobileNum, setMobileNum] = useState<string>('');
  const [isMobileValid, setisMobileValid] = useState<boolean>(false);
  const [isMobileLenghtValid, setisMobileLenghtValid] = useState<
    boolean | null
  >(null!);
  const [isMobileNumeric, setisMobileNumeric] = useState<boolean | null>(null!);

  const errorMsg = [
    'Phone Number must be of length 10.',
    'Phone Number must be numeric.',
    'Phone Number is numeric of lenght 10.',
  ];

  /**
   *  for capturing the device information
   *  @param device_unique_id: string,
   *  @param device_model: string,
   *  @param device_id: string,
   *  @param device_system_name: string,
   *  @param device_system_version: string,
   *  @param device_bundle_id: string,
   *  @param device_build_number: string,
   *  @param device_readable_version: string,
   *  @return null
   * */
  _getConstantDeviceInfo({
    device_unique_id: '',
    device_model: '',
    device_id: '',
    device_system_name: '',
    device_system_version: '',
    device_bundle_id: '',
    device_build_number: '',
    device_readable_version: '',
  });
  return (
    <View
      style={{
        margin: '5%',
        paddingHorizontal: '5%',
      }}>
      <Text
        style={{
          fontSize: fontsSize['large'],
        }}>
        Welcome To Selfy
      </Text>
      <Text
        style={{
          fontSize: fontsSize['small'],
          paddingTop: '3%',
        }}>
        Enter Your Mobile Number
      </Text>
      <View style={{paddingTop: '7%'}} />
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TextInput
          style={{...styles.textInput, width: width * 0.07}}
          placeholderTextColor={themes['light'].inactiveTintColor}
          placeholder="+91"
          editable={false}
          keyboardType="number-pad"
        />
        {/* verticle border */}
        <View style={{borderRightWidth: 1, padding: 2, opacity: 0.5}} />

        <TextInput
          style={styles.textInput}
          onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
            _onChange(
              e,
              setisMobileValid,
              setisMobileLenghtValid,
              setisMobileNumeric,
              setMobileNum,
            );
          }}
          placeholderTextColor={themes['light'].inactiveTintColor}
          placeholder="Phone number"
          value={mobileNum}
          keyboardType="number-pad"
        />
      </View>

      {/* textInput bottom border UI*/}
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            ...styles.textInputBottomBorder,
            width: width * 0.08,
            marginRight: '1%',
          }}
        />
        <View
          style={{
            ...styles.textInputBottomBorder,
            width: width * 0.7,
            marginLeft: '1%',
          }}
        />
      </View>

      {!isMobileLenghtValid &&
      isMobileLenghtValid !== null &&
      isMobileNumeric !== false ? (
        <Text style={{color: themes['light'].error}}>{errorMsg[0]}</Text>
      ) : null}

      {!isMobileNumeric &&
      isMobileNumeric !== null &&
      isMobileLenghtValid !== false ? (
        <Text style={{color: themes['light'].error}}>{errorMsg[1]}</Text>
      ) : null}

      {!isMobileLenghtValid &&
      isMobileLenghtValid !== null &&
      !isMobileNumeric &&
      isMobileNumeric !== null ? (
        <Text style={{color: themes['light'].error}}>{errorMsg[2]}</Text>
      ) : null}

      <TouchableOpacity
        style={
          isMobileValid
            ? {...styles.getOTP, backgroundColor: themes['light'].buttons}
            : {...styles.getOTP, backgroundColor: themes['light'].buttons}
        }
        onPress={() => {
          signInWithPhoneNumber(mobileNum);
          setRoute('Verification');
        }}
        disabled={!isMobileValid}>
        <View>
          <Text style={{color: themes['light'].buttonText, fontWeight: 'bold'}}>
            Get OTP
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={
          isMobileValid
            ? {...styles.getOTP, backgroundColor: themes['light'].buttons}
            : {...styles.getOTP, backgroundColor: themes['light'].buttons}
        }
        onPress={() => {
          // signInWithPhoneNumber(mobileNum);
          setRoute('SelectUserType');
        }}
        disabled={!isMobileValid}>
        <View>
          <Text style={{color: themes['light'].buttonText, fontWeight: 'bold'}}>
            Test Without OTP
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
