import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "../../assets/constants/colors";
import AppFonts from "../../assets/constants/font";

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: hp(6.5),
    borderRadius: 999,
    paddingHorizontal: 24,
    shadowColor: Colors.primary_blue,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  disabled: {
    shadowOpacity: 0,
    elevation: 0,
  },
  text: {
    fontSize: RFValue(13.5),
    fontFamily: AppFonts.body_extraBold,
    color: Colors.white,
  },
  textDisabled: {
    color: Colors.grey,
  },
});

export default styles;
