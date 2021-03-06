import React, { useState } from "react";
import { Text, View, Dimensions, TouchableOpacity, Alert } from "react-native";
import { fontsSize, fontFamily } from "../../../constants/fonts";
import LayoutWithoutCarousel from "../../../components/layoutWithoutCarousel";
import { themes } from "../../../constants/colors";
import BottomModal from "../../../components/bottomModal";
import { startQuiz } from "../../../api";

const { width } = Dimensions.get("window");

const ViewAssignment = ({ navigation, route }) => {
  const selectAndNavigate = () => {
    Alert.alert("Choose/Capture", "Select one option to proceed", [
      {
        text: "Camera",
        onPress: () => navigation.navigate("Camera", { isCamera: true }),
      },
      {
        text: "Gallery",
        onPress: () => navigation.navigate("Camera", { isCamera: false }),
      },
    ]);
  };

  console.log("route", route.params.token);
  const [visible, SetVisible] = useState<boolean>(false);
  return (
    <LayoutWithoutCarousel imgsrc={0} navigation={navigation}>
      <View
        style={{
          margin: "5%",
          paddingLeft: "5%",
        }}
      >
        <Text
          style={{
            fontFamily: fontFamily["headings"],
            fontSize: fontsSize["large"],
          }}
        >
          Create Quiz
        </Text>

        <View
          style={{
            marginTop: "10%",
            width: "90%",
            flexDirection: "column",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              width: 0.5 * width,
              alignItems: "center",
              borderRadius: 10,
              borderWidth: 0.2,
              borderColor: "#e5e5e5",
              padding: 10,
              elevation: 2,
              backgroundColor: "rgba(91, 102, 255, 0.8)",
            }}
            onPress={async () => {
              SetVisible(true);
              // const quizdata = await startQuiz({}, "");
            }}
          >
            <Text
              style={{
                fontSize: fontsSize["large"],
                fontFamily: fontFamily["headings"],
                color: themes["light"].buttonText,
              }}
            >
              With Text
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              selectAndNavigate();
            }}
            style={{
              width: 0.5 * width,
              alignItems: "center",
              marginTop: "10%",
              borderRadius: 10,
              borderWidth: 0.2,
              borderColor: "#e5e5e5",
              padding: 10,
              elevation: 2,
              backgroundColor: "rgba(91, 102, 255, 0.8)",
            }}
          >
            <Text
              style={{
                fontSize: fontsSize["large"],
                fontFamily: fontFamily["headings"],
                color: themes["light"].buttonText,
              }}
            >
              With Image
            </Text>
          </TouchableOpacity>
        </View>
        <BottomModal
          visible={visible}
          SetVisible={SetVisible}
          token={route.params.token}
          navigation={navigation}
        />
      </View>
    </LayoutWithoutCarousel>
  );
};

export default ViewAssignment;
