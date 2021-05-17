import { StyleSheet, Dimensions } from "react-native";
import { themes } from "../../constants/colors";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  capture: {
    flex: 0,
    backgroundColor: "#fff",
    borderRadius: 35,
    width: 70,
    height: 70,
    alignSelf: "center",
    margin: 20,
  },
  bottomButtom: {
    marginTop: "5%",
    alignSelf: "center",
    width: WIDTH * 0.35,
    height: HEIGHT * 0.05,
    backgroundColor: themes["light"].buttons,
    borderRadius: 10,
    justifyContent: "center",
  },
  bottomButtonText: {
    color: themes["light"].buttonText,
    textAlign: "center",
  },
  LoaderAndProgress: {
    top: HEIGHT / 6,
    left: WIDTH / 8,
    position: "absolute",
  },
});
