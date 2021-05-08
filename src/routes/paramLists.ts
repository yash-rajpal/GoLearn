import {RouteProp, CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type AuthParamList = {
  SplashScreen: undefined;
  Login: undefined;
  OtpVerification: undefined;
  WhoAreYouView: undefined;
  SignUp: undefined;
  AppStack: undefined;
  Auth: undefined;
};

export type TabParamList = {
  Dashboard: undefined;
  Worksheets: undefined;
  Profile: undefined;
};

export type MainAppParamList = {
  AuthFlow: undefined;
  AppFlow: undefined;
  ViewAssignment: {pdfURL: string};
  DisplayPDF: undefined;
  Camera: undefined;
  CropEquation: undefined;
  ReferalScreen: undefined;
};

export type AuthNavProps<T extends keyof AuthParamList> = {
  navigation: StackNavigationProp<AuthParamList, T>;
  route: RouteProp<AuthParamList, T>;
};

export type MainStackNavProps<
  authParam extends keyof AuthParamList,
  mainParam extends keyof MainAppParamList
> = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<MainAppParamList, mainParam>,
    StackNavigationProp<AuthParamList, authParam>
  >;
  route: CompositeNavigationProp<
    StackNavigationProp<MainAppParamList, mainParam>,
    StackNavigationProp<AuthParamList, authParam>
  >;
};
