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
  headerTextWrap: {
    flex: 1,
    marginLeft: wp(3),
  },
  title: {
    fontSize: RFValue(14.5),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.black,
  },
  subtitle: {
    fontSize: RFValue(10.5),
    fontFamily: AppFonts.body_regular,
    color: Colors.grey,
    marginTop: hp(0.2),
  },
  countPill: {
    minWidth: wp(8),
    height: wp(8),
    paddingHorizontal: wp(2),
    borderRadius: wp(4),
    backgroundColor: Colors.blue_tint,
    alignItems: "center",
    justifyContent: "center",
  },
  countPillText: {
    fontSize: RFValue(12.5),
    fontFamily: AppFonts.body_bold,
    color: Colors.primary_blue,
  },
  scrollContent: {
    paddingHorizontal: wp(5.5),
    paddingBottom: hp(4),
  },
  cardCounter: {
    fontSize: RFValue(11.5),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.primary_blue,
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: hp(1.6),
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: hp(6.3),
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.primary_blue,
    borderStyle: "dashed",
    marginTop: hp(0.5),
  },
  addButtonText: {
    fontSize: RFValue(13),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.primary_blue,
  },
  addedList: {
    marginTop: hp(3),
  },
  addedListTitle: {
    fontSize: RFValue(12.5),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.text_light,
    marginBottom: hp(1.2),
  },
  addedRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 12,
    paddingVertical: hp(1.4),
    paddingHorizontal: wp(3.5),
    marginBottom: hp(1),
    borderWidth: 1,
    borderColor: Colors.border,
  },
  addedIndex: {
    width: wp(6),
    fontSize: RFValue(11.5),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.grey,
  },
  addedText: {
    flex: 1,
    fontSize: RFValue(12),
    fontFamily: AppFonts.body_regular,
    color: Colors.black,
    marginRight: wp(2),
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
