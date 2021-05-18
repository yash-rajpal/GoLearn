import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Image, Dimensions, Text } from "react-native";
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker";
import { themes } from "../../constants/colors";
import { fontsSize } from "../../constants/fonts";
import { styles } from "./styles";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const Camera = ({ navigation }) => {
  // eslint-disable no-unused-vars
  const [img, setImg] = useState<ImageOrVideo>();
  const [base64, setBase64] = useState<string>("");
  const [path, setPath] = useState<string>();
  const [retake, setRetake] = useState<boolean>(false);
  const [ratio, setRatio] = useState<number>(1);

  const imagePickerConfig = {
    width: 550,
    height: 750,
    cropping: true,
    includeBase64: true,
    cropperActiveWidgetColor: themes["light"].backgroundDark,
    showCropGuidelines: false,
    cropperTintColor: themes["light"].activeTintColor,
    // showCropFrame: false,
    freeStyleCropEnabled: true,
    enableRotationGesture: true,
    // hideBottomControls: true,
    cropperToolbarTitle: "Crop Image",
    compressImageQuality: 1,
    cropperStatusBarColor: themes["light"].backgroundDark,
  };
  useEffect(() => {
    ImagePicker.openCamera(imagePickerConfig)
      .then((image) => {
        setImg(image);
        setPath(image.path);
        setRatio(image.height / image.width);
        setBase64(image.data);
      })
      .catch((e) => {
        console.log("e = ", e);
        navigation.goBack();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retake]);
  if (path?.length === 0) {
    return null;
  }
  return (
    <View
      style={{
        flex: 1,
        marginTop: "5%",
        height: HEIGHT,
      }}
    >
      <View>
        <Image
          source={{ uri: path }}
          style={{
            height: ratio * WIDTH,
            width: WIDTH,
          }}
        />
      </View>
    </View>
  );
};

export default Camera;
