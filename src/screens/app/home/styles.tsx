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

  // Header + streak
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  greetingSmall: {
    fontSize: RFValue(12),
    fontFamily: AppFonts.body_regular,
    color: Colors.grey,
  },
  greetingName: {
    fontSize: RFValue(19),
    fontFamily: AppFonts.body_extraBold,
    color: Colors.black,
    marginTop: hp(0.3),
  },
  avatarButton: {
    width: wp(10.5),
    height: wp(10.5),
    borderRadius: wp(5.25),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary_blue,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  avatarText: {
    fontSize: RFValue(14),
    fontFamily: AppFonts.body_bold,
    color: Colors.white,
  },

  streakBanner: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    paddingVertical: hp(1.4),
    paddingHorizontal: wp(3.5),
    marginTop: hp(2.2),
    shadowColor: Colors.primary_orange,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 3,
  },
  streakIconWrap: {
    width: wp(8.5),
    height: wp(8.5),
    borderRadius: wp(4.25),
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp(2.8),
  },
  streakText: {
    fontSize: RFValue(13.5),
    fontFamily: AppFonts.body_extraBold,
    color: Colors.white,
  },
  streakSubtext: {
    fontSize: RFValue(11),
    fontFamily: AppFonts.body_medium,
    color: "rgba(255,255,255,0.85)",
    marginLeft: wp(2),
  },

  // Continue Studying
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: hp(3.2),
    marginBottom: hp(1.8),
  },
  sectionTitle: {
    fontSize: RFValue(15.5),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.black,
  },
  sectionLink: {
    fontSize: RFValue(11.5),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.primary_blue,
  },
  decksRow: {
    paddingRight: wp(5.5),
  },
  emptyDecksCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderStyle: "dashed",
    padding: wp(4),
  },
  emptyDecksIconWrap: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    backgroundColor: Colors.blue_tint,
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp(3.5),
  },
  emptyDecksTextWrap: {
    flex: 1,
  },
  emptyDecksTitle: {
    fontSize: RFValue(12.5),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.black,
  },
  emptyDecksSubtitle: {
    fontSize: RFValue(10.5),
    fontFamily: AppFonts.body_regular,
    color: Colors.grey,
    marginTop: hp(0.3),
  },
});

export default styles;
