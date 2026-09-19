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
  scrollContent: {
    paddingHorizontal: wp(6),
    paddingBottom: hp(3),
  },
  promptCard: {
    backgroundColor: Colors.yellow_tint,
    borderRadius: 22,
    paddingVertical: hp(4),
    paddingHorizontal: wp(6),
    marginTop: hp(1),
    marginBottom: hp(3.5),
  },
  promptText: {
    fontSize: RFValue(17),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.black,
    textAlign: "center",
    lineHeight: RFValue(24),
  },
  optionsWrap: {
    gap: hp(1.6),
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.card,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 14,
    paddingVertical: hp(1.9),
    paddingHorizontal: wp(4.5),
  },
  optionCorrect: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  optionWrong: {
    backgroundColor: Colors.error,
    borderColor: Colors.error,
  },
  optionText: {
    flex: 1,
    fontSize: RFValue(13),
    fontFamily: AppFonts.body_medium,
    color: Colors.text_light,
    marginRight: wp(2),
  },
  optionTextLight: {
    color: Colors.white,
    fontFamily: AppFonts.body_semiBold,
  },
  footer: {
    paddingHorizontal: wp(5.5),
    paddingTop: hp(1.5),
    paddingBottom: hp(2.5),
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  nextButton: {
    height: hp(6.5),
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary_yellow,
    shadowColor: Colors.primary_yellow,
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },
  nextButtonDisabled: {
    backgroundColor: Colors.border,
  },
  nextButtonText: {
    fontSize: RFValue(13.5),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.black,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: wp(8),
  },
  emptyIconWrap: {
    width: wp(16),
    height: wp(16),
    borderRadius: wp(8),
    backgroundColor: Colors.yellow_tint,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp(2),
  },
  emptyTitle: {
    fontSize: RFValue(14.5),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.black,
  },
  emptySubtitle: {
    fontSize: RFValue(11.5),
    fontFamily: AppFonts.body_regular,
    color: Colors.grey,
    textAlign: "center",
    marginTop: hp(0.8),
  },

  // Results phase
  resultsWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: wp(8),
  },
  scoreCircle: {
    width: wp(38),
    height: wp(38),
    borderRadius: wp(19),
    borderWidth: 6,
    borderColor: Colors.primary_yellow,
    backgroundColor: Colors.yellow_tint,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: hp(2.5),
  },
  scoreText: {
    fontSize: RFValue(22),
    fontFamily: AppFonts.body_extraBold,
    color: Colors.black,
  },
  scorePercentText: {
    fontSize: RFValue(12),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.grey,
    marginTop: hp(0.3),
  },
  tierLabel: {
    fontSize: RFValue(17),
    fontFamily: AppFonts.body_extraBold,
    color: Colors.black,
  },
  tierMessage: {
    fontSize: RFValue(12),
    fontFamily: AppFonts.body_regular,
    color: Colors.grey,
    marginTop: hp(0.6),
    textAlign: "center",
  },
  resultsProgressWrap: {
    width: "100%",
    marginTop: hp(3),
    marginBottom: hp(4),
  },
  resultsActions: {
    flexDirection: "row",
    gap: wp(3),
    width: "100%",
  },
  retakeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: hp(6.3),
    borderRadius: 999,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
  },
  retakeButtonText: {
    fontSize: RFValue(12.5),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.text_light,
  },
  doneButton: {
    flex: 1,
    height: hp(6.3),
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary_blue,
  },
  doneButtonText: {
    fontSize: RFValue(12.5),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.white,
  },
});

export default styles;
