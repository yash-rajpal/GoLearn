import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  BackHandler,
  ToastAndroid,
  ActivityIndicator,
  Text,
} from "react-native";
import Layout from "../../components/layout/index";
import { AuthNavProps } from "../../routes/paramLists";
import Login from "./login";
import OtpVerification from "./verification";
import SelectUserType from "./whoAreYou";
import { themes } from "../../constants/colors";

export type Routes = {
  Login: undefined;
  Verification: undefined;
  SelectUserType: undefined;
  SignUp: undefined;
  DashBoard: undefined;
};

const Validating = () => {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "30%",
        }}
      >
        <ActivityIndicator size={50} color={themes["light"].buttons} />
        <Text
          style={{
            alignSelf: "center",
            marginLeft: "5%",
            fontSize: 20,
            color: themes["light"].buttons,
          }}
        >
          Validating User...
        </Text>
      </View>
    </View>
  );
};

const Auth = ({ navigation }: AuthNavProps<"Auth">) => {
  const [route, setRoute] = useState<keyof Routes>("Login");
  const [quit, setQuit] = useState<boolean>(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  // async function signInWithPhoneNumber(phoneNumber) {
  //   console.log('OTP for firebase', phoneNumber);
  //   const confirmation = await auth().signInWithPhoneNumber(
  //     '+91' + phoneNumber,
  //   );
  //   console.log('confirm before comfirmation', confirmation);
  //   setConfirm(confirmation);
  // }

  useMemo(() => {
    if (quit)
      setTimeout(() => {
        setQuit(false);
      }, 2000);
  }, [quit]);

  const backAction = () => {
    if (quit) {
      return false;
    }
    if (route == "Login") {
      setQuit(true);
      ToastAndroid.show("Press again to quit!", ToastAndroid.SHORT);
      return true;
    }
    if (route == "Verification" || route == "SelectUserType") {
      setRoute("Login");
      return true;
    }
    if (route == "SignUp") {
      navigation.goBack();
      setRoute("SelectUserType");
    }
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);
    if (route == "DashBoard") {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    }
    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quit, route]);

  const goToSignUp = () => {
    navigation.navigate("SignUp", { setRoute: setRoute });
    setRoute("SignUp");
  };
  const AuthComponent = () => {
    if (route == "Login") {
      return (
        <Login
          setRoute={setRoute}
          email={email}
          setEmail={setEmail}
          // signInWithPhoneNumber={signInWithPhoneNumber}
        />
      );
    } else if (route == "Verification") {
      return (
        <OtpVerification
          setRoute={setRoute}
          navigation={navigation}
          email={email}
          setToken={setToken}
        />
      );
    } else if (route == "SelectUserType" || route == "SignUp") {
      return <SelectUserType goToSignUp={goToSignUp} />;
    }
    return <Validating />;
  };
  return (
    <View style={{ flex: 1 }}>
      <Layout>
        <AuthComponent />
      </Layout>
    </View>
  );
};

export default Auth;
