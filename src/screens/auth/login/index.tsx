/**
 * @author Aman Maheswari
 */

import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Dimensions,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TouchableOpacity,
  Image,
} from "react-native";
import { themes } from "../../../constants/colors";
import { styles } from "./styles";
import { fontsSize } from "../../../constants/fonts";
import { Routes } from "../index";
const { width } = Dimensions.get("window");

const _onChangeEmail = (e, setEmailLocal, setIsEmailValid) => {
  setEmailLocal(e.nativeEvent.text);
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  console.log(reg.test(e.nativeEvent.text));
  if (reg.test(e.nativeEvent.text) == true) {
    setIsEmailValid(true);
  } else {
    setIsEmailValid(false);
  }
};

const Login = ({
  setRoute,
  email,
  setEmail,
}: {
  setRoute: React.Dispatch<React.SetStateAction<keyof Routes>>;
  email: any;
  setEmail: any;
}) => {
  const [email_local, setEmailLocal] = useState<string>("");
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);

  const errorMsg = ["check the format of the Email address. "];
  return (
    <View
      style={{
        margin: "5%",
        paddingHorizontal: "5%",
        flex: 1,
      }}
    >
      <Text
        style={{
          fontSize: fontsSize["large"],
        }}
      >
        Welcome To Go-Learn
      </Text>
      {/* <Text
        style={{
          fontSize: fontsSize["small"],
          paddingTop: "3%",
        }}
      >
        Enter Your Email
      </Text> */}
      <View style={{ paddingTop: "5%" }} />
      <View style={{ flexDirection: "column" }}>
        <Text style={{ fontWeight: "500", marginLeft: "1%" }}>Email</Text>

        <View style={{ flexDirection: "row" }}>
          <TextInput
            style={styles.textInput}
            onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
              _onChangeEmail(e, setEmailLocal, setIsEmailValid);
            }}
            placeholderTextColor={themes["light"].inactiveTintColor}
            placeholder="someone@example.com"
            value={email_local}
          />
          {isEmailValid ? (
            <Image
              source={require("../../../assets/Images/Login/check.png")}
              style={{ height: 20, width: 20, right: 15 }}
            />
          ) : null}
        </View>
      </View>
      {/* textInput bottom border UI*/}
      <View
        style={{
          ...styles.textInputBottomBorder,
          width: width * 0.7,
          marginLeft: "1%",
        }}
      />

      {/* error message if email is wrong  */}
      {email_local.length > 0 ? (
        isEmailValid ? (
          <View style={{ marginBottom: "3%" }} />
        ) : (
          <View style={{ marginBottom: "3%" }}>
            <Text style={{ color: "red" }}>{errorMsg[0]}</Text>
          </View>
        )
      ) : (
        <View style={{ marginBottom: "3%" }} />
      )}

      <TouchableOpacity
        style={
          isEmailValid
            ? { ...styles.getOTP, backgroundColor: themes["light"].buttons }
            : { ...styles.getOTP, backgroundColor: themes["light"].buttons }
        }
        onPress={() => {
          setEmail(email_local);
          setRoute("Verification");
        }}
        // disabled={!isEmailValid}
      >
        <View>
          <Text
            style={{ color: themes["light"].buttonText, fontWeight: "bold" }}
          >
            Login
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          bottom: 30,
          marginHorizontal: "35.5%",
          marginTop: 40,
        }}
        onPress={() => {
          //navigate to signup page
        }}
      >
        <Text style={{ color: "blue" }}>Register User?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
