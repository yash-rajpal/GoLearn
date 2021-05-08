import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ActionSheetIOS,
  Platform,
  StatusBar,
  Linking,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import auth from '@react-native-firebase/auth';
import {themes} from '../../../constants/colors';
import {styles} from './styles';
import CheckBox from '@react-native-community/checkbox';
import {MainStackNavProps} from '../../../routes/paramLists';
import {SafeAreaView} from 'react-native-safe-area-context';
const {height} = Dimensions.get('window');

const SignUp = ({
  navigation,
  route,
}: MainStackNavProps<'SignUp', 'AuthFlow'>) => {
  const AGE = ['3', '4', '5', '6', '7', '8'];
  const Class = ['I', 'II', 'III', 'IV', 'V'];
  const [selectedAge, setAge] = useState<string>(AGE[0]);
  const [selectedClass, setClass] = useState<string>(Class[0]);
  const [checkboxValue, setCheckboxValue] = useState(false);

  const [childName, setChildName] = useState<string>('');
  const [guardianName, setguardianName] = useState<string>('');

  const handleSignUP = async () => {
    const update = {
      displayName: childName || 'testuser',
      photoURL: 'https://my-cdn.com/assets/user/123.png',
    };

    try {
      await auth().currentUser.updateProfile(update);
    } catch (error) {
      console.log(error);
    }

    route.params.setRoute('DashBoard');
    navigation.navigate('AppFlow');
  };

  const onPressAge = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: AGE,
        destructiveButtonIndex: AGE.indexOf(selectedAge),
      },
      (buttonIndex) => {
        setAge(AGE[buttonIndex]);
      },
    );

  const onPressClass = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: Class,
        destructiveButtonIndex: Class.indexOf(selectedClass),
      },
      (buttonIndex) => {
        setClass(Class[buttonIndex]);
      },
    );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={themes['light'].backgroundLight}
      />
      <View style={styles.container}>
        <Text style={styles.labels}>Child's Name</Text>
        <TextInput
          style={{...styles.textInput}}
          placeholderTextColor={themes['light'].inactiveTintColor}
          placeholder="Child's name"
          value={childName}
          onChangeText={(text) => {
            setChildName(text);
          }}
        />

        <View style={{height: height * 0.05}}></View>

        <Text style={styles.labels}>Guardian's Name</Text>
        <TextInput
          style={{...styles.textInput}}
          placeholderTextColor={themes['light'].inactiveTintColor}
          placeholder="Guardian's name"
          value={guardianName}
          onChangeText={(text) => {
            setguardianName(text);
          }}
        />

        <View style={{height: height * 0.05}}></View>

        <Text style={styles.labels}>Mobile Number</Text>
        <TextInput
          style={{...styles.textInput}}
          placeholderTextColor={themes['light'].inactiveTintColor}
          value="1234567890"
          editable={false}
        />

        <View style={{height: height * 0.05}}></View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={[styles.labels, {marginRight: 10}]}>Age</Text>
            {Platform.OS == 'ios' ? (
              <TouchableOpacity onPress={() => onPressAge()}>
                <View style={{paddingHorizontal: 30, ...styles.textInput}}>
                  <Text>{selectedAge}</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: themes['light'].activeTintColor,
                  marginLeft: 20,
                }}>
                <Picker
                  selectedValue={selectedAge}
                  style={{
                    width: 80,
                    borderBottomColor: themes['light'].backgroundDark,
                  }}
                  onValueChange={(itemValue) => setAge(itemValue)}
                  // mode="dropdown"
                >
                  {AGE.map((index) => {
                    return (
                      <Picker.Item label={index} value={index} key={index} />
                    );
                  })}
                </Picker>
              </View>
            )}
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[styles.labels, {marginRight: 10}]}>Class</Text>
            {Platform.OS == 'ios' ? (
              <TouchableOpacity onPress={() => onPressClass()}>
                <View style={{paddingHorizontal: 30, ...styles.textInput}}>
                  <Text>{selectedClass}</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: themes['light'].activeTintColor,
                  marginLeft: 20,
                }}>
                <Picker
                  selectedValue={selectedClass}
                  style={{
                    width: 80,
                    borderBottomColor: themes['light'].backgroundDark,
                  }}
                  onValueChange={(itemValue) => setClass(itemValue)}
                  // mode="dropdown"
                >
                  {Class.map((index) => {
                    return (
                      <Picker.Item label={index} value={index} key={index} />
                    );
                  })}
                </Picker>
              </View>
            )}
          </View>
        </View>

        <View style={{height: height * 0.05}}></View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CheckBox
            style={{marginRight: 5}}
            hideBox={false}
            boxType="circle"
            tintColors={{
              true: themes['light'].buttons,
              false: themes['light'].headings,
            }}
            tintColor={themes['light'].headings}
            onCheckColor={themes['light'].buttons}
            onTintColor={themes['light'].buttons}
            value={checkboxValue}
            onValueChange={() => setCheckboxValue(!checkboxValue)}
          />
          <View style={{flexDirection: 'row'}}>
            <Text>Please accept </Text>
            <Text
              onPress={() => {
                Linking.openURL('https://trysolvio.ai/terms-of-use.html');
              }}
              style={{color: themes['light'].activeTintColor}}>
              Terms and conditions.
            </Text>
          </View>
        </View>

        <View style={{height: height * 0.05}}></View>

        <TouchableOpacity
          style={{
            ...styles.signUpButton,
            backgroundColor: checkboxValue
              ? themes['light'].buttons
              : themes['light'].headings,
          }}
          onPress={() => {
            handleSignUP();
          }}
          disabled={!checkboxValue}>
          <View>
            <Text
              style={{color: themes['light'].buttonText, fontWeight: 'bold'}}>
              Sign Up
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
