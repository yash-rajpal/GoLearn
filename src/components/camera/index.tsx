import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
  ActivityIndicator,
} from "react-native";
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker";
import { themes } from "../../constants/colors";
import { fontsSize } from "../../constants/fonts";
import { styles } from "./styles";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

const Camera = ({ navigation, route }) => {
  // eslint-disable no-unused-vars

  const isCamera = route.params.isCamera;

  const [img, setImg] = useState<ImageOrVideo>();
  const [base64, setBase64] = useState<string>("");
  const [path, setPath] = useState<string>();
  const [retake, setRetake] = useState<boolean>(false);
  const [ratio, setRatio] = useState<number>(1);
  const [quizLoading, setQuizLoading] = useState("");

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
    setQuizLoading("start");
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
      .catch((error) => {
        console.log("error", error);
        setQuizLoading("error");
      });
  };

  const openCamera = () => {
    ImagePicker.openCamera(imagePickerConfig)
      .then((image) => {
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
  };

  const openPicker = () => {
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
  };

  useEffect(() => {
    console.log("isCamera = ", isCamera);

    if (isCamera) {
      console.log("in if ");

      openCamera();
    } else {
      console.log("in else");

      openPicker();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [retake]);

  if (path?.length === 0) {
    return null;
  } else if (quizLoading === "start")
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Generating Quiz...</Text>
        <Text>Chunking Data...Understanding your bit...</Text>
        <ActivityIndicator
          style={{ marginTop: 20 }}
          size={50}
          color="rgba(91, 102, 255, 1)"
        />
        <Text style={{ marginTop: 20 }}>
          Please wait while we start the quiz
        </Text>
      </View>
    );
  else if (quizLoading === "error")
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error While Chunking. </Text>
        <Text>Give me a click I can Understand</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
          <Text style={{ marginTop: 20 }}>Try Again </Text>
        </TouchableOpacity>
      </View>
    );
  else return null;
};

export default Camera;
