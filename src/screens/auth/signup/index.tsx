import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  ActionSheetIOS,
  Platform,
  StatusBar,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { themes } from "../../../constants/colors";
import { styles } from "./styles";
import CheckBox from "@react-native-community/checkbox";
import { MainStackNavProps } from "../../../routes/paramLists";
import { SafeAreaView } from "react-native-safe-area-context";
import { studentCreateUser, tokenCreateUser, tokenLogin } from "../../../api";
const { height } = Dimensions.get("window");

const SignUp = ({
  navigation,
  route,
}: MainStackNavProps<"SignUp", "AuthFlow">) => {
  const AGE = ["3", "4", "5", "6", "7", "8"];
  const Gender = ["Male", "Female", "Others"];
  const [selectedAge, setAge] = useState<string>(AGE[0]);
  const [selectedGender, setGender] = useState<string>("");
  const [checkboxValue, setCheckboxValue] = useState(false);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [dob, setDOB] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSignUP = async () => {
    const update = {
      displayName: firstName || "testuser",
    };

    const token_createUser = {
      email: email,
      username: firstName,
      password: password,
      first_name: firstName,
      last_name: lastName,
    };

    const token_login = {
      email,
      username: firstName,
      password,
    };

    const student_createUser = {
      first_name: firstName,
      last_name: lastName,
      date_of_birth: dob,
      gender: selectedGender,
      phone: phone,
      user: 2,
    };

    console.log(token_createUser, token_login, student_createUser);
    const success = await tokenCreateUser(token_createUser);
    if (success) {
      const token = await tokenLogin(token_login);
      if (token) {
        const redirectToApp = await studentCreateUser(
          student_createUser,
          token
        );
        if (redirectToApp) {
          route.params.setRoute("DashBoard");
          navigation.navigate("AppFlow");
        }
      }
    }
  };

  const onPressClass = () =>
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: Gender,
        destructiveButtonIndex: Gender.indexOf(selectedGender),
      },
      (buttonIndex) => {
        setGender(Gender[buttonIndex]);
      }
    );

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={themes["light"].backgroundLight}
        />
        <View style={styles.container}>
          <Text style={styles.labels}>First Name</Text>
          <TextInput
            style={{ ...styles.textInput }}
            placeholderTextColor={themes["light"].inactiveTintColor}
            placeholder="Child's name"
            value={firstName}
            onChangeText={(text) => {
              setFirstName(text);
            }}
          />

          <View style={{ height: height * 0.03 }}></View>

          <Text style={styles.labels}>Last Name</Text>
          <TextInput
            style={{ ...styles.textInput }}
            placeholderTextColor={themes["light"].inactiveTintColor}
            placeholder="Guardian's name"
            value={lastName}
            onChangeText={(text) => {
              setLastName(text);
            }}
          />

          <View style={{ height: height * 0.03 }}></View>

          <Text style={styles.labels}>Mobile Number</Text>
          <TextInput
            style={{ ...styles.textInput }}
            placeholderTextColor={themes["light"].inactiveTintColor}
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
            }}
            placeholder={"9999999999"}
          />

          <View style={{ height: height * 0.03 }}></View>

          <Text style={styles.labels}>Email</Text>
          <TextInput
            style={{ ...styles.textInput }}
            placeholderTextColor={themes["light"].inactiveTintColor}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            placeholder={"someon@example.com"}
          />
          <View style={{ height: height * 0.03 }}></View>

          <Text style={styles.labels}>Password</Text>
          <TextInput
            style={{ ...styles.textInput }}
            placeholderTextColor={themes["light"].inactiveTintColor}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
            placeholder={"Atleast 8 characters long"}
          />
          <View style={{ height: height * 0.03 }}></View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "2%",
            }}
          >
            <Text style={[styles.labels, { marginRight: 10 }]}>DOB</Text>
            <TextInput
              style={{ ...styles.textInput, width: 180, marginLeft: "12%" }}
              placeholderTextColor={themes["light"].inactiveTintColor}
              value={dob}
              placeholder={"yyyy-mm-dd"}
              onChangeText={(text) => {
                setDOB(text);
              }}
            />
          </View>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={[styles.labels, { marginRight: 10 }]}>Gender</Text>
            {Platform.OS == "ios" ? (
              <TouchableOpacity onPress={() => onPressClass()}>
                <View style={{ paddingHorizontal: 30, ...styles.textInput }}>
                  <Text>{selectedGender}</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: themes["light"].activeTintColor,
                  marginLeft: 20,
                }}
              >
                <Picker
                  selectedValue={selectedGender}
                  style={{
                    width: 180,
                    borderBottomColor: themes["light"].backgroundDark,
                  }}
                  onValueChange={(itemValue) => {
                    setGender(itemValue);
                    console.log(selectedGender, itemValue);
                  }}
                  // mode="dropdown"
                >
                  {Gender.map((index) => {
                    return (
                      <Picker.Item label={index} value={index} key={index} />
                    );
                  })}
                </Picker>
              </View>
            )}
          </View>

          <View style={{ height: height * 0.05 }}></View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CheckBox
              style={{ marginRight: 5 }}
              hideBox={false}
              boxType="circle"
              tintColors={{
                true: themes["light"].buttons,
                false: themes["light"].headings,
              }}
              tintColor={themes["light"].headings}
              onCheckColor={themes["light"].buttons}
              onTintColor={themes["light"].buttons}
              value={checkboxValue}
              onValueChange={() => setCheckboxValue(!checkboxValue)}
            />
            <View style={{ flexDirection: "row" }}>
              <Text>Please accept </Text>
              <Text style={{ color: themes["light"].activeTintColor }}>
                Terms and conditions.
              </Text>
            </View>
          </View>

          <View style={{ height: height * 0.05 }}></View>

          <TouchableOpacity
            style={{
              ...styles.signUpButton,
              backgroundColor: checkboxValue
                ? themes["light"].buttons
                : themes["light"].headings,
            }}
            onPress={() => {
              handleSignUP();
            }}
            disabled={!checkboxValue}
          >
            <View>
              <Text
                style={{
                  color: themes["light"].buttonText,
                  fontWeight: "bold",
                }}
              >
                Sign Up
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
