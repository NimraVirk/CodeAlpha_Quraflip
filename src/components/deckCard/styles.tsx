import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../assets/constants/colors";
import { RFValue } from "react-native-responsive-fontsize";
import AppFonts from "../../assets/constants/font";

const styles = StyleSheet.create({
  card: {
    width: wp(58),
    backgroundColor: Colors.card,
    borderRadius: 20,
    marginRight: wp(3.5),
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  header: {
    padding: wp(4),
    paddingBottom: hp(1.8),
  },
  categoryTag: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.3)",
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(0.5),
    borderRadius: 20,
    marginBottom: hp(1.2),
  },
  categoryText: {
    fontSize: RFValue(9.5),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.white,
  },
  title: {
    fontSize: RFValue(14.5),
    fontFamily: AppFonts.body_extraBold,
    color: Colors.white,
  },
  body: {
    padding: wp(4),
  },
  progressRow: {
    marginBottom: hp(1.6),
  },
  progressText: {
    fontSize: RFValue(10.5),
    fontFamily: AppFonts.body_medium,
    color: Colors.grey,
    marginTop: hp(0.8),
  },
  actionsRow: {
    flexDirection: "row",
    gap: wp(2.5),
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
    height: hp(3),
    borderRadius: 999,
    backgroundColor: Colors.blue_tint,
  },
  actionText: {
    fontSize: RFValue(11),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.primary_blue,
  },
  quizButton: {
    backgroundColor: Colors.primary_yellow,
  },
  quizText: {
    color: Colors.black,
  },
});

export default styles;
