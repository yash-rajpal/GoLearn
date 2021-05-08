import React from 'react';
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  Alert,
  StatusBar,
} from 'react-native';
import Pdf from 'react-native-pdf';
import RNFetchBlob from 'rn-fetch-blob';
import {themes} from '../../../constants/colors';
const {width, height} = Dimensions.get('window');

const checkPermission = (pdfURL) => {
  if (Platform.OS === 'ios') {
    _downloadPDF(pdfURL);
  } else {
    try {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ).then((granted) => {
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //Once user grant the permission start downloading
          _downloadPDF(pdfURL);
        } else {
          Alert.alert('storage_permission');
        }
      });
    } catch (err) {
      //To handle permission related issue
    }
  }
};
const _downloadPDF = async (pdfURL) => {
  let DownloadDir = RNFetchBlob.fs.dirs.DownloadDir;
  let options = {
    fileCache: true,
    addAndroidDownloads: {
      //Related to the Android only
      useDownloadManager: true,
      notification: true,
      path: DownloadDir + '/selfy_' + 'Assignment' + '.pdf',
      description: 'Assignment File',
    },
  };
  RNFetchBlob.config(options).fetch('GET', pdfURL);
};
const DisplayPDF = ({
  route: {
    params: {pdfURL},
  },
}) => {
  const source = {uri: pdfURL, cache: true};
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
      }}>
      <TouchableOpacity
        style={{
          borderColor: themes['light'].backgroundDark,
          borderWidth: 1,
          borderRadius: 10,
          justifyContent: 'center',
          position: 'absolute',
          zIndex: 1,
          paddingHorizontal: 10,
          paddingVertical: 5,
          top: StatusBar.currentHeight ? StatusBar.currentHeight + 20 : 20,
          right: 10,
          backgroundColor: themes['light'].buttonDisable,
          alignItems: 'center',
        }}
        onPress={() => {
          checkPermission(pdfURL);
        }}>
        <Text
          style={{
            textAlign: 'center',
            alignSelf: 'center',
            color: themes['light'].activeTintColor,
            fontWeight: 'bold',
          }}>
          Download
        </Text>
      </TouchableOpacity>
      <Pdf
        source={source}
        style={{
          flex: 1,
          width: width,
          height: height,
        }}
      />
    </View>
  );
};

export default DisplayPDF;
