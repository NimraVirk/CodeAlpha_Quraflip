import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../../../assets/constants/colors";
import { RFValue } from "react-native-responsive-fontsize";
import AppFonts from "../../../../assets/constants/font";

const styles = StyleSheet.create({
  flexFill: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: wp(5.5),
    paddingTop: hp(2),
    paddingBottom: hp(1.5),
  },
  iconButton: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  headerTitle: {
    fontSize: RFValue(15.5),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.black,
  },
  content: {
    paddingHorizontal: wp(5.5),
    paddingTop: hp(2),
  },
  emailNote: {
    marginTop: -hp(1.4),
    fontSize: RFValue(10.5),
    fontFamily: AppFonts.body_regular,
    color: Colors.grey,
  },
  footer: {
    paddingHorizontal: wp(5.5),
    paddingTop: hp(1.5),
    paddingBottom: hp(2.5),
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
});

export default styles;
