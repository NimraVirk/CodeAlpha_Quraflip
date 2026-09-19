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
  closeButton: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  title: {
    fontSize: RFValue(15.5),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.black,
  },
  scrollContent: {
    paddingHorizontal: wp(5.5),
    paddingBottom: hp(4),
  },
  sectionLabel: {
    fontSize: RFValue(12),
    fontFamily: AppFonts.body_medium,
    color: Colors.text_light,
    marginBottom: hp(1.2),
  },
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: wp(2.5),
    marginBottom: hp(2.6),
  },
  chip: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderRadius: 20,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipActive: {
    backgroundColor: Colors.primary_blue,
    borderColor: Colors.primary_blue,
  },
  chipText: {
    fontSize: RFValue(11.5),
    fontFamily: AppFonts.body_medium,
    color: Colors.text_light,
  },
  chipTextActive: {
    color: Colors.white,
    fontFamily: AppFonts.body_semiBold,
  },
  swatchRow: {
    flexDirection: "row",
    gap: wp(3.5),
  },
  swatch: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(5.5),
    alignItems: "center",
    justifyContent: "center",
  },
  swatchActive: {
    borderWidth: 2,
    borderColor: Colors.black,
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
