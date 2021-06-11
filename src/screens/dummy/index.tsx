import React from 'react';
import {Text, View} from 'react-native';

const Dummy = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontFamily: 'Nunito-ExtraBoldItalic', fontSize: 30}}>
        GoLearn
      </Text>
    </View>
  );
};

export default Dummy;

// import React from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   Dimensions,
//   Image,
//   FlatList,
// } from 'react-native';
// import MaterialCommunityIconsI from 'react-native-vector-icons/MaterialCommunityIcons';
// import {themes} from '../../../constants/colors';
// import {styles, settingRowStyles} from './styles';

// const {width, height} = Dimensions.get('window');

// const SettingRow = (props) => {
//   const {
//     item: {title, icon, navigateTo},
//     navigateToRoute,
//   }: {item: settingsData} = props;
//   return (
//     <TouchableOpacity
//       style={settingRowStyles.mainContainer}
//       onPress={() => {
//         navigateToRoute(navigateTo);
//         if (title == 'Logout') {
//           auth()
//             .signOut()
//             .then(() => console.log('User signed out!'));
//           navigateToRoute(navigateTo);
//         }
//       }}>
//       <View style={{flexDirection: 'row'}}>
//         <MaterialCommunityIconsI
//           name={icon}
//           size={30}
//           color={themes['light'].headings}
//         />
//         <Text style={{fontSize: 20, marginLeft: 10}}>{title}</Text>
//       </View>
//     </TouchableOpacity>
//   );
// };

// type settingsData = {
//   id: number;
//   title: string;
//   navigateTo: string;
//   icon: string;
// };

// const Profile = ({navigation}) => {
//   const SETTINGS: settingsData[] = [
//     {
//       id: 1,
//       title: 'User Profile',
//       navigateTo: 'Dummy',
//       icon: 'home',
//     },
//     {
//       id: 2,
//       title: 'Plan Details',
//       navigateTo: 'Dummy',
//       icon: 'home',
//     },
//     {
//       id: 3,
//       title: 'Billing Information',
//       navigateTo: 'Dummy',
//       icon: 'home',
//     },
//     {
//       id: 4,
//       title: 'SomeThing',
//       navigateTo: 'Dummy',
//       icon: 'home',
//     },
//     {
//       id: 5,
//       title: 'Logout',
//       navigateTo: 'AuthFlow',
//       icon: 'home',
//     },
//   ];
//   const navigateTo = (route: any) => {
//     navigation.navigate(route);
//   };
//   const itemSeparator = () => {
//     return (
//       <View
//         style={{
//           width: width - 20,
//           height: 1,
//           backgroundColor: themes['light'].headings,
//           marginLeft: 10,
//           marginRight: 10,
//           opacity: 0.3,
//         }}
//       />
//     );
//   };
//   return (
//     <ScrollView>
//       <View style={{height: height * 0.1}} />
//       <View style={styles.profilePicContainer}>
//         <Image
//           source={require('../../../assets/Images/Assignment/card_cartoon_1.png')}
//           style={styles.profilePic}
//           resizeMode="contain"
//         />
//       </View>
//       <View style={{height: height * 0.08}} />
//       <FlatList
//         data={SETTINGS}
//         renderItem={(item: {item: settingsData}) => (
//           <SettingRow item={item['item']} navigateToRoute={navigateTo} />
//         )}
//         ItemSeparatorComponent={itemSeparator}
//       />
//     </ScrollView>
//   );
// };

// export default Profile;
