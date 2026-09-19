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
    paddingBottom: hp(4),
  },
  content: {
    paddingHorizontal: wp(5.5),
  },
  hero: {
    alignItems: "center",
    paddingTop: hp(2),
    paddingBottom: hp(10),
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    marginBottom: -hp(7),
  },
  title: {
    alignSelf: "flex-start",
    marginLeft: wp(5.5),
    fontSize: RFValue(20),
    fontFamily: AppFonts.body_extraBold,
    color: Colors.white,
    marginBottom: hp(2),
  },
  name: {
    fontSize: RFValue(19),
    fontFamily: AppFonts.body_extraBold,
    color: Colors.white,
  },
  email: {
    fontSize: RFValue(11.5),
    fontFamily: AppFonts.body_regular,
    color: "rgba(255,255,255,0.8)",
    marginTop: hp(0.4),
  },
  memberSince: {
    backgroundColor: Colors.white,
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.6),
    borderRadius: 20,
    marginTop: hp(1.4),
  },
  memberSinceText: {
    fontSize: RFValue(10),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.primary_blue,
  },
  statsRow: {
    flexDirection: "row",
    gap: wp(3),
  },
  sectionTitle: {
    fontSize: RFValue(15),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.black,
    marginTop: hp(3.2),
    marginBottom: hp(1.8),
  },
  calendarRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.card,
    borderRadius: 16,
    paddingVertical: hp(2),
    paddingHorizontal: wp(3),
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  calendarDayWrap: {
    alignItems: "center",
    gap: 6,
  },
  calendarDot: {
    width: wp(8.5),
    height: wp(8.5),
    borderRadius: wp(4.25),
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  calendarDotToday: {
    borderColor: Colors.primary_blue,
    borderWidth: 1.5,
  },
  calendarLabel: {
    fontSize: RFValue(9.5),
    fontFamily: AppFonts.body_medium,
    color: Colors.grey,
  },
  settingsList: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 1,
  },
  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: hp(1.8),
    paddingHorizontal: wp(4),
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  settingsIconWrap: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    backgroundColor: Colors.blue_tint,
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp(3.5),
  },
  settingsLabel: {
    flex: 1,
    fontSize: RFValue(12.5),
    fontFamily: AppFonts.body_medium,
    color: Colors.text_light,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: hp(3.5),
    height: hp(6.3),
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.error,
  },
  signOutText: {
    fontSize: RFValue(13),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.error,
  },
});

export default styles;
