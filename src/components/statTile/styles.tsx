import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../assets/constants/colors";
import { RFValue } from "react-native-responsive-fontsize";
import AppFonts from "../../assets/constants/font";

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: 16,
    paddingVertical: hp(2),
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  iconCircle: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp(1),
  },
  value: {
    fontSize: RFValue(15),
    fontFamily: AppFonts.body_extraBold,
    color: Colors.black,
  },
  label: {
    fontSize: RFValue(9.5),
    fontFamily: AppFonts.body_regular,
    color: Colors.grey,
    marginTop: hp(0.3),
  },
});

export default styles;
