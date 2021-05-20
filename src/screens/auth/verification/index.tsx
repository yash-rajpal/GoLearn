import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  TextInput,
} from "react-native";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import { styles } from "./styles";
import { fontFamily, fontsSize } from "../../../constants/fonts";
import { themes } from "../../../constants/colors";
import { Routes } from "../index";
import { tokenLogin } from "../../../api";

const { width, height } = Dimensions.get("window");

const _onChangePassword = (e, setPassword) => {
  setPassword(e.nativeEvent.text);
};

const OtpVerification = ({
  setRoute,
  navigation,
  email,
  setToken,
}: {
  setRoute: React.Dispatch<React.SetStateAction<keyof Routes>>;
  navigation: any;
  email: any;
  setToken: any;
}) => {
  const [otp, setotp] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  return (
    <View
      style={{
        margin: "5%",
        paddingHorizontal: "5%",
      }}
    >
      <Text
        style={{
          fontSize: fontsSize["large"],
          fontFamily: fontFamily.headings,
          color: themes["light"].headings,
        }}
      >
        Enter Your Password
      </Text>
      <View style={{ paddingTop: "7%" }} />
      <View style={{ flexDirection: "column" }}>
        <Text style={{ fontWeight: "500", marginLeft: "1%" }}>Password</Text>
        <TextInput
          style={styles.textInput}
          onChange={(e: NativeSyntheticEvent<TextInputChangeEventData>) => {
            _onChangePassword(e, setPassword);
          }}
          placeholderTextColor={themes["light"].inactiveTintColor}
          placeholder="password"
          value={password}
        />
      </View>
      {/* textInput bottom border UI*/}
      <View
        style={{
          ...styles.textInputBottomBorder,
          width: width * 0.7,
          marginLeft: "1%",
        }}
      />
      <TouchableOpacity
        style={
          otp.length === 6
            ? { ...styles.continue, backgroundColor: themes["light"].buttons }
            : { ...styles.continue, backgroundColor: themes["light"].buttons }
        }
        onPress={async () => {
          const token = await tokenLogin({ email, password });
          if (token) {
            setToken(token);
            setRoute("DashBoard");
            navigation.navigate("AppFlow");
          }
        }}
        // disabled={!(otp.length === 6)}
      >
        <View>
          <Text
            style={{
              color: themes["light"].buttonText,
              fontFamily: fontFamily.buttonText,
            }}
          >
            Continue
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default OtpVerification;
