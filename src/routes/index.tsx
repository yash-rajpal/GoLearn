import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIconsI from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIconsI from "react-native-vector-icons/MaterialIcons";
import { NavigationContainer } from "@react-navigation/native";
import { themes } from "../constants/colors";
import SearchAssignment from "../screens/app/searchAssignment";
import Dummy from "../screens/dummy";
import { AuthParamList, MainAppParamList, TabParamList } from "./paramLists";
import ViewAssignment from "../screens/app/viewAssignment";
import SignUp from "../screens/auth/signup";
import Camera from "../components/camera";
import Auth from "../screens/auth/index";
import Profile from "../screens/app/Profile";
import DisplayPDF from "../screens/app/viewAssignment/displayPDF";
import ReferalScreen from "../screens/app/referalScreen";
import PlayContest from "../screens/app/PlayContest";

const AuthStack = createStackNavigator<AuthParamList>();
const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Auth"
    >
      <AuthStack.Screen name="SplashScreen" component={Dummy} />
      <AuthStack.Screen name="Auth" component={Auth} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
    </AuthStack.Navigator>
  );
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let color: string;
          let iconName: string = "home";
          if (route.name === "Dashboard") {
            color = focused
              ? themes["light"].activeTintColor
              : themes["light"].inactiveTintColor;
            iconName = "view-dashboard";
            return (
              <MaterialCommunityIconsI
                name={iconName}
                size={30}
                color={color}
              />
            );
          } else if (route.name === "Worksheets") {
            color = focused
              ? themes["light"].activeTintColor
              : themes["light"].inactiveTintColor;
            iconName = "assignment";
            return <MaterialIconsI name={iconName} size={30} color={color} />;
          } else if (route.name === "Profile") {
            color = focused
              ? themes["light"].activeTintColor
              : themes["light"].inactiveTintColor;
            iconName = "account-circle";
            return (
              <MaterialCommunityIconsI
                name={iconName}
                size={30}
                color={color}
              />
            );
          }
          return (
            <MaterialCommunityIconsI name={iconName} size={30} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: themes["light"].activeTintColor,
        inactiveTintColor: themes["light"].inactiveTintColor,
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen name="Dashboard" component={Dummy} />
      <Tab.Screen name="Worksheets" component={SearchAssignment} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const MainAppStack = createStackNavigator<MainAppParamList>();

const MainAppStackNavigator = () => {
  return (
    <NavigationContainer>
      <MainAppStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="AuthFlow"
      >
        <MainAppStack.Screen name="AuthFlow" component={AuthStackNavigator} />
        <MainAppStack.Screen name="AppFlow" component={TabNavigator} />
        <MainAppStack.Screen name="ViewAssignment" component={ViewAssignment} />
        <MainAppStack.Screen name="DisplayPDF" component={DisplayPDF} />
        <MainAppStack.Screen name="Dummy" component={PlayContest} />
        <MainAppStack.Screen name="Camera" component={Camera} />
        <MainAppStack.Screen name="ReferalScreen" component={ReferalScreen} />
      </MainAppStack.Navigator>
    </NavigationContainer>
  );
};

export default MainAppStackNavigator;
