import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Colors } from "../../../../assets/constants/colors";
import { RFValue } from "react-native-responsive-fontsize";
import AppFonts from "../../../../assets/constants/font";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
    flex: 1,
    marginHorizontal: wp(3),
    textAlign: "center",
    fontSize: RFValue(14.5),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.black,
  },
  progressWrap: {
    paddingHorizontal: wp(6),
    marginBottom: hp(1),
  },
  progressText: {
    marginTop: hp(1),
    fontSize: RFValue(11),
    fontFamily: AppFonts.body_medium,
    color: Colors.grey,
    textAlign: "center",
  },
  cardArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: wp(6),
  },
  cardTouchable: {
    width: "100%",
    height: hp(46),
  },
  cardFace: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 26,
    overflow: "hidden",
    backfaceVisibility: "hidden",
    shadowColor: Colors.primary_blue,
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  cardGradient: {
    flex: 1,
    padding: wp(7),
  },
  cardLabel: {
    fontSize: RFValue(11),
    fontFamily: AppFonts.body_bold,
    color: "rgba(255,255,255,0.75)",
    letterSpacing: 1,
  },
  cardTextWrap: {
    flexGrow: 1,
    justifyContent: "center",
    paddingVertical: hp(2),
  },
  cardText: {
    fontSize: RFValue(19),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.white,
    textAlign: "center",
    lineHeight: RFValue(26),
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: wp(3),
    paddingHorizontal: wp(6),
    paddingTop: hp(1),
    paddingBottom: hp(3),
  },
  navButton: {
    width: wp(13),
    height: wp(13),
    borderRadius: wp(6.5),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  navButtonDisabled: {
    opacity: 0.4,
  },
  showAnswerButton: {
    flex: 1,
    height: hp(6.5),
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary_blue,
    shadowColor: Colors.primary_blue,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  showAnswerText: {
    fontSize: RFValue(13.5),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.white,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: wp(8),
  },
  emptyTitle: {
    fontSize: RFValue(14.5),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.black,
    marginTop: hp(1.4),
  },
  emptySubtitle: {
    fontSize: RFValue(11.5),
    fontFamily: AppFonts.body_regular,
    color: Colors.grey,
    textAlign: "center",
    marginTop: hp(0.6),
  },
});

export default styles;
