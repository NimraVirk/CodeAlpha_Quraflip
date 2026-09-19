import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../assets/constants/colors";
import { RFValue } from "react-native-responsive-fontsize";
import AppFonts from "../../assets/constants/font";

const styles = StyleSheet.create({
  wrapper: {
    width: wp(85),
    marginBottom: hp(2),
  },
  label: {
    fontSize: RFValue(12),
    fontFamily: AppFonts.body_medium,
    color: Colors.text_light,
    marginBottom: hp(0.8),
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: wp(4),
    height: hp(6.5),
    backgroundColor: Colors.white,
  },
  inputContainerError: {
    borderColor: Colors.error,
  },
  inputContainerMultiline: {
    height: undefined,
    minHeight: hp(12),
    paddingVertical: hp(1.5),
    alignItems: "flex-start",
  },
  input: {
    flex: 1,
    fontSize: RFValue(14),
    fontFamily: AppFonts.body_regular,
    color: Colors.black,
    padding: 0,
  },
  inputMultiline: {
    height: "100%",
  },
  toggleText: {
    fontSize: RFValue(11),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.primary_blue,
    marginLeft: wp(2),
  },
  errorText: {
    fontSize: RFValue(10.5),
    fontFamily: AppFonts.body_regular,
    color: Colors.error,
    marginTop: hp(0.6),
  },
});

export default styles;
