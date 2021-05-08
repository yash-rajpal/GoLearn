import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import storage from '@react-native-firebase/storage';
// import database from '@react-native-firebase/database';
import * as Progress from 'react-native-progress';
import ImageCropper, {ImageCropper as CropperType} from '../imageCropper';
import {fontsSize, fontFamily} from '../../constants/fonts';
import {themes} from '../../constants/colors';
import Canvas, {Image as CanvasImage} from 'react-native-canvas';
import {BoundingBox, VisionAPIResponse} from './types';
import AnnotateImage from './annotateImage';

const {width, height} = Dimensions.get('window');

const googleCloud = {
  api: 'https://vision.googleapis.com/v1/images:annotate?key=',
  apiKey: 'AIzaSyDsC3k1KRK0oazufFGOLELYAvBAd8ClEfU',
};
const visionApi = async (_image: string): Promise<VisionAPIResponse> => {
  return await (
    await fetch(googleCloud.api + googleCloud.apiKey, {
      method: 'POST',
      body: JSON.stringify({
        requests: [
          {
            image: {
              content: _image,
            },
            features: [{type: 'TEXT_DETECTION'}],
          },
        ],
      }),
    })
  ).json();
};

const googleToCanvasRect = (rect: BoundingBox) => {
  const googleRect = rect.vertices;
  const x0 = googleRect[0].x ? googleRect[0].x : 0;
  const y0 = googleRect[0].y ? googleRect[0].y : 0;

  const x1 = googleRect[2].x ? googleRect[2].x : 0;
  const y1 = googleRect[2].y ? googleRect[2].y : 0;

  const width = Math.abs(x1 - x0);
  const height = Math.abs(y1 - y0);
  return {
    x: x0,
    y: y0,
    width,
    height,
  };
};

const drawRect = (
  ctx,
  rect: {x: number; y: number; height: number; width: number},
  ratio: number,
) => {
  const {x, y, width, height} = rect;
  ctx.beginPath();
  ctx.rect(x * ratio, y * ratio, width, height);
  ctx.stroke();
};

export default function CropEquation({navigation, route}) {
  const cropperRef = useRef<CropperType>(null!);
  const originalImage = route.params.image;
  const [image, SetImage] = useState<string>(route.params.image);
  const [uploading, setuploading] = useState<boolean>(false);
  const [progress, setprogress] = useState<number>(0);
  const canvasRef = useRef<Canvas>(null!);
  const [bounds, setBounds] = useState<
    {x: number; y: number; height: number; width: number}[]
  >([]);
  useEffect(() => {
    canvasRef.current.height = 0;
    canvasRef.current.width = 0;
  }, []);

  const ProgressBar = () => {
    return (
      <View
        style={{
          // justifyContent: 'center',
          top: height / 2 - 50,
          left: width / 2 - 50,
          position: 'absolute',
          zIndex: 2,
        }}>
        {progress < 1 ? (
          <Progress.Circle
            color={themes['light'].activeTintColor}
            unfilledColor={themes['light'].inactiveTintColor}
            progress={progress}
            size={100}
            borderWidth={3}
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}
            showsText={true}
            formatText={() => (100 * progress).toFixed(0) + '%'}
            textStyle={{fontSize: 20, color: 'black', fontWeight: 'bold'}}
          />
        ) : (
          <ActivityIndicator
            size={100}
            color={themes['light'].activeTintColor}
          />
        )}
      </View>
    );
  };

  const uploadFirebase = (imageName: string) => {
    const res = storage()
      .ref('testImages/' + imageName)
      .putString(image, 'base64');
    res.on(
      storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        setprogress(snapshot.bytesTransferred / snapshot.totalBytes);
        console.log(`Upload is ${progress}% done`);

        switch (snapshot.state) {
          case storage.TaskState.SUCCESS: // or 'success'
            console.log('Upload is complete');
            break;
          case storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
          default:
            console.log(snapshot.state);
        }
      },
      (error) => {
        console.error(error);
      },
    );
  };

  // const responseToFirebase = (response: any, keyName: string) => {
  //   database()
  //     .ref(keyName)
  //     .set({
  //       response,
  //     })
  //     .then(() => console.log('Data updated.'));
  // };

  // const uploadMathPrix = (keyName: string) => {
  //   axios({
  //     method: 'POST',
  //     url: 'https://api.mathpix.com/v3/text',
  //     headers: {
  //       app_id: 'raviteja_trysolvio_ai_db16af_34fa46',
  //       app_key: '257d864d9b302e955831',
  //       'Content-Type': 'application/json',
  //     },
  //     data: {
  //       src: 'data:image/png;base64,' + image,
  //       formats: ['text', 'data', 'html'],
  //       include_line_data: true,
  //       rm_spaces: true,
  //       data_options: {
  //         include_asciimath: true,
  //         include_latex: true,
  //       },
  //     },
  //     onUploadProgress: function (progressEvent) {
  //       var percentCompletednew = Math.round(
  //         (progressEvent.loaded * 100) / progressEvent.total,
  //       );
  //       console.log('%% AMAN = ', percentCompletednew);
  //     },
  //   }).then((res) => {
  //     console.log('res.data', res.data);
  //     responseToFirebase(res.data, keyName);
  //   });
  // };

  const handleSubmit = async () => {
    setuploading(true);
    const imageName = new Date().getTime().toString();
    uploadFirebase(imageName);
    const page = (await visionApi(image)).responses[0].fullTextAnnotation
      .pages[0];
    const blocks = page.blocks;

    const _bounds = blocks.map((block) => {
      return googleToCanvasRect(block.boundingBox);
    });

    // console.log(_bounds);

    const canvasImage = new CanvasImage(canvasRef.current);
    canvasImage.crossOrigin = '';
    const canvas = canvasRef.current;
    canvasImage.addEventListener('load', () => {
      console.log('image loaded');
      const {height: H, width: W} = canvasImage;
      console.log('image height and width', height, width, H, W);
      canvas.height = H > height ? height - 50 : H;
      canvas.width = W > width ? width - 30 : W;
      const ctx = canvas.getContext('2d');

      //
      var hRatio = canvas.width / W;
      var vRatio = canvas.height / H;
      var ratio = Math.min(hRatio, vRatio);

      ctx.drawImage(canvasImage, 0, 0, W, H, 0, 0, W * ratio, H * ratio);
      _bounds.forEach((bound) => {
        drawRect(ctx, bound, ratio);
      });
      setBounds(_bounds);
    });
    canvasImage.src = 'data:image/png;base64,' + image;
    // uploadMathPrix(imageName);
    // responseToFirebase('test DATA', imageName);
  };

  if (bounds.length > 0)
    return (
      <AnnotateImage bounds={bounds} image={image} navigation={navigation} />
    );

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: 0.05 * height,
          width: width,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <MaterialCommunityIcons
          onPress={() => navigation.goBack()}
          name="keyboard-backspace"
          size={0.1 * width}
          color="#000"
        />
        <TouchableOpacity
          onPress={() => {
            cropperRef.current.getCroppedData().then((data) => {
              let res = data.data.substring(22);
              SetImage(res);
            });
          }}
          disabled={uploading}>
          <Text style={{fontSize: fontsSize.medium}}>CROP</Text>
        </TouchableOpacity>
      </View>
      {uploading ? <ProgressBar /> : null}
      <View
        style={[
          {
            justifyContent: 'center',
            alignItems: 'center',
            height: 0.8 * height,
            width: width,
          },
          // uploading ? {opacity: 0.2} : {},
        ]}>
        <Canvas ref={canvasRef} />
        {bounds.length == 0 ? (
          <ImageCropper
            url={'data:image/png;base64,' + image}
            ref={cropperRef}
          />
        ) : null}
      </View>
      <View
        style={{
          height: 0.15 * width,
          width: width,
          position: 'absolute',
          bottom: 0,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            SetImage(originalImage);
          }}
          style={{width: 0.5 * width, alignItems: 'center'}}
          disabled={uploading}>
          <Text
            style={{
              fontSize: fontsSize['large'],
              fontFamily: fontFamily['headings'],
            }}>
            RESET
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            cropperRef.current.getCroppedData().then((data) => {
              let res = data.data.substring(22);
              SetImage(res);
            });
            handleSubmit();
          }}
          style={{width: 0.5 * width, alignItems: 'center'}}
          disabled={uploading}>
          <Text
            style={{
              fontSize: fontsSize['large'],
              fontFamily: fontFamily['headings'],
            }}>
            SUBMIT
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
});
