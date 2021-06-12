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

  const callApi = (image) => {
    console.log(image);
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "token cecb2a988c62eabba92b553e9d674ead46434e5f"
    );
    myHeaders.append(
      "Cookie",
      "csrftoken=CrtR6SZKsLpJyavNGPI8ILqofvpEwZ8AaZkOOPyxYNUTXr2M6QMi4quoRgDL5ic5; Cookie_1=value"
    );

    var formdata = new FormData();
    formdata.append("name", "kush bhi11");
    formdata.append("desc", "kafi hai11");
    formdata.append("perquestion", "30");
    // formdata.append("img", image.data, image.path);
    formdata.append("img", {
      uri: image.path,
      name: "image.jpg",
      type: image.mime,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("https://a82ef1a38e5e.ngrok.io/student/starttest/", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        result.map((element) => {
          element["numPeopleAnsweredOption"] = [];
          element["questionImgUrls"] = [];
          element["explanationImgUrls"] = [];
          element["userPhotoUrls"] = [null];
        });
        console.log("Waiting", result);
        navigation.navigate("PlayContest", { contestQuestions: result });
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    // ImagePicker.openCamera(imagePickerConfig)
    //   .then((image) => {
    //     setImg(image);
    //     setPath(image.path);
    //     setRatio(image.height / image.width);
    //     setBase64(image.data);
    //     callApi(image);
    //   })
    //   .catch((e) => {
    //     console.log("e = ", e);
    //     navigation.goBack();
    //   });

    ImagePicker.openPicker(imagePickerConfig)
      .then((image) => {
        // console.log(image);
        setImg(image);
        setPath(image.path);
        setRatio(image.height / image.width);
        setBase64(image.data);
        callApi(image);
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
