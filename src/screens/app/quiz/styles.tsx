import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../../assets/constants/colors";
import { RFValue } from "react-native-responsive-fontsize";
import AppFonts from "../../../assets/constants/font";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    paddingHorizontal: wp(5.5),
    paddingTop: hp(2),
    paddingBottom: hp(4),
  },
  title: {
    fontSize: RFValue(20),
    fontFamily: AppFonts.body_extraBold,
    color: Colors.black,
  },
  subtitle: {
    fontSize: RFValue(12),
    fontFamily: AppFonts.body_regular,
    color: Colors.grey,
    marginTop: hp(0.4),
  },
  modeCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    padding: wp(4.5),
    marginTop: hp(2.8),
    shadowColor: Colors.primary_orange,
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  modeIcon: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(3),
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp(3.5),
  },
  modeTextWrap: {
    flex: 1,
  },
  modeTitle: {
    fontSize: RFValue(14),
    fontFamily: AppFonts.body_extraBold,
    color: Colors.white,
  },
  modeDescription: {
    fontSize: RFValue(10.5),
    fontFamily: AppFonts.body_medium,
    color: "rgba(255,255,255,0.85)",
    marginTop: hp(0.3),
  },
  sectionTitle: {
    fontSize: RFValue(15.5),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.black,
    marginTop: hp(3.4),
    marginBottom: hp(1.6),
  },
  emptyCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: Colors.card,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderStyle: "dashed",
    paddingVertical: hp(2.5),
    marginBottom: hp(1.4),
  },
  emptyCardText: {
    fontSize: RFValue(12),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.primary_blue,
  },
  deckRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: wp(3.5),
    marginBottom: hp(1.4),
    borderWidth: 1,
    borderColor: Colors.border,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  deckTextWrap: {
    flex: 1,
  },
  deckTitle: {
    fontSize: RFValue(12.5),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.black,
  },
  deckMeta: {
    fontSize: RFValue(10),
    fontFamily: AppFonts.body_regular,
    color: Colors.grey,
    marginTop: hp(0.3),
  },
  startButton: {
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderRadius: 999,
  },
  startButtonText: {
    fontSize: RFValue(11),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.white,
  },
});

export default styles;
