import { StyleSheet, Dimensions } from "react-native";
import { themes } from "../../../constants/colors";
import { fontsSize } from "../../../constants/fonts";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: themes["light"].backgroundLight,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 20,
    // alignItems: 'center',
  },
  labels: {
    fontSize: fontsSize.medium,
    color: themes["light"].headings,
    // alignSelf: 'flex-start',
  },
  textInput: {
    borderBottomColor: themes["light"].activeTintColor,
    borderBottomWidth: 2,
    paddingVertical: 5,
    // alignSelf: 'center',
  },
  signUpButton: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: height * 0.05,
    width: width * 0.35,
    borderRadius: 10,
  },
});
