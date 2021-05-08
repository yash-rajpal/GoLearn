import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  Linking,
} from 'react-native';
import MaterialCommunityIconsI from 'react-native-vector-icons/MaterialCommunityIcons';
import {themes} from '../../../constants/colors';
import {styles, settingRowStyles} from './styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const {width, height} = Dimensions.get('window');

const Profile = ({navigation}) => {
  return (
    <ScrollView>
      <View style={{height: height * 0.1}} />
      <View style={styles.profilePicContainer}>
        <Image
          source={require('../../../assets/Images/Assignment/card_cartoon_1.png')}
          style={styles.profilePic}
          resizeMode="contain"
        />
      </View>
      <View style={{height: height * 0.08}} />
      <TouchableOpacity
        style={settingRowStyles.mainContainer}
        onPress={() => {}}>
        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIconsI
            name="face-profile"
            size={30}
            color={themes['light'].headings}
          />
          <Text style={{fontSize: 20, marginLeft: 10}}>User Profile</Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          width: width - 20,
          height: 1,
          backgroundColor: themes['light'].headings,
          marginLeft: 10,
          marginRight: 10,
          opacity: 0.3,
        }}
      />
      <TouchableOpacity
        style={settingRowStyles.mainContainer}
        onPress={() => {
          navigation.push('ReferalScreen');
        }}>
        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIconsI
            name="share-outline"
            size={30}
            color={themes['light'].headings}
          />
          <Text style={{fontSize: 20, marginLeft: 10}}>Referral code</Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          width: width - 20,
          height: 1,
          backgroundColor: themes['light'].headings,
          marginLeft: 10,
          marginRight: 10,
          opacity: 0.3,
        }}
      />
      <TouchableOpacity
        style={settingRowStyles.mainContainer}
        onPress={() => {
          Linking.openURL('mailto:support@trysolvio.ai');
        }}>
        <View style={{flexDirection: 'row'}}>
          <MaterialIcons
            name="support-agent"
            size={30}
            color={themes['light'].headings}
          />
          <Text style={{fontSize: 20, marginLeft: 10}}>Customer Support</Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          width: width - 20,
          height: 1,
          backgroundColor: themes['light'].headings,
          marginLeft: 10,
          marginRight: 10,
          opacity: 0.3,
        }}
      />
      <TouchableOpacity
        style={settingRowStyles.mainContainer}
        onPress={() => {
          Linking.openURL(
            'https://play.google.com/store/apps/details?id=nic.goi.aarogyasetu&hl=en',
          );
        }}>
        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIconsI
            name="cards-heart"
            size={30}
            color={themes['light'].headings}
          />
          <Text style={{fontSize: 20, marginLeft: 10}}>Rating</Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          width: width - 20,
          height: 1,
          backgroundColor: themes['light'].headings,
          marginLeft: 10,
          marginRight: 10,
          opacity: 0.3,
        }}
      />
      <TouchableOpacity
        style={settingRowStyles.mainContainer}
        onPress={() => {
          console.log("Sign Out")
        }}>
        <View style={{flexDirection: 'row'}}>
          <MaterialCommunityIconsI
            name="logout"
            size={30}
            color={themes['light'].headings}
          />
          <Text style={{fontSize: 20, marginLeft: 10}}>Logout</Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          width: width - 20,
          height: 1,
          backgroundColor: themes['light'].headings,
          marginLeft: 10,
          marginRight: 10,
          opacity: 0.3,
        }}
      />
    </ScrollView>
  );
};

export default Profile;
