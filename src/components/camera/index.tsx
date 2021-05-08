/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {RNCamera} from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {style} from './styles';

const flashIcons = ['flash-off', 'flash-auto', 'flash-on'];

export default function Camera({navigation}) {
  const [flash, setFlash] = useState(0);
  const [cameraState, setCameraState] = useState('BACK');
  const takePicture = async (camera) => {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    const image = data.base64;
    // console.log(image);
    navigation.navigate('CropEquation', {image});
    console.log(Object.keys(data));
  };

  return (
    <View style={style.container}>
      <RNCamera
        style={style.preview}
        flashMode={
          flash === 0
            ? RNCamera.Constants.FlashMode.off
            : flash === 1
            ? RNCamera.Constants.FlashMode.auto
            : RNCamera.Constants.FlashMode.on
        }
        type={
          cameraState === 'BACK'
            ? RNCamera.Constants.Type.back
            : RNCamera.Constants.Type.front
        }>
        {({camera, status}) => {
          if (status !== 'READY') {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  padding: 10,
                  zIndex: 1,
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: '100%',
                  height: '100%',
                }}>
                <ActivityIndicator size="large" color="#0D145B" />
              </View>
            );
          }
          return (
            <View
              style={{
                flex: 0,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: 'black',
                width: '100%',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setFlash((flash + 1) % 3);
                }}>
                <Icon name={flashIcons[flash]} size={35} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={style.capture}
              />
              <TouchableOpacity
                onPress={() => {
                  if (cameraState === 'BACK') {
                    setCameraState('FRONT');
                  } else {
                    setCameraState('BACK');
                  }
                }}>
                <Icon name="flip-camera-android" size={35} color="white" />
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
}
