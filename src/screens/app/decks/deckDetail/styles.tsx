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
  listContent: {
    paddingHorizontal: wp(5.5),
    paddingBottom: hp(4),
  },
  categoryTag: {
    alignSelf: "flex-start",
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.6),
    borderRadius: 20,
    marginTop: hp(0.5),
  },
  categoryText: {
    fontSize: RFValue(10.5),
    fontFamily: AppFonts.body_semiBold,
  },
  description: {
    fontSize: RFValue(12),
    fontFamily: AppFonts.body_regular,
    color: Colors.grey,
    marginTop: hp(1.4),
    lineHeight: RFValue(17),
  },
  cardCount: {
    fontSize: RFValue(11),
    fontFamily: AppFonts.body_medium,
    color: Colors.grey,
    marginTop: hp(1),
  },
  ctaRow: {
    flexDirection: "row",
    gap: wp(3),
    marginTop: hp(2.4),
  },
  ctaButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: hp(6.2),
    borderRadius: 999,
  },
  ctaQuiz: {
    backgroundColor: Colors.primary_yellow,
  },
  ctaPrimaryText: {
    fontSize: RFValue(12),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.white,
  },
  ctaQuizText: {
    color: Colors.black,
  },
  sectionTitle: {
    fontSize: RFValue(15.5),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.black,
    marginTop: hp(3.2),
    marginBottom: hp(1.6),
  },
  emptyText: {
    fontSize: RFValue(12),
    fontFamily: AppFonts.body_regular,
    color: Colors.grey,
    textAlign: "center",
    marginTop: hp(4),
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: Colors.card,
    borderRadius: 14,
    padding: wp(3.5),
    marginBottom: hp(1.4),
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  cardIndex: {
    width: wp(5.5),
    fontSize: RFValue(11),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.grey,
    marginTop: hp(0.3),
  },
  cardSide: {
    flex: 1,
  },
  cardSideLabel: {
    fontSize: RFValue(9),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.grey,
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom: hp(0.4),
  },
  cardSideText: {
    fontSize: RFValue(11.5),
    fontFamily: AppFonts.body_regular,
    color: Colors.black,
  },
  cardDivider: {
    width: 1,
    alignSelf: "stretch",
    backgroundColor: Colors.border,
    marginHorizontal: wp(2.5),
  },
  cardActions: {
    marginLeft: wp(2.5),
    gap: hp(1.4),
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalCard: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: wp(5.5),
    paddingBottom: hp(4),
  },
  modalTitle: {
    fontSize: RFValue(15.5),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.black,
    marginBottom: hp(2),
  },
  modalActions: {
    flexDirection: "row",
    gap: wp(3),
    marginTop: hp(0.5),
  },
  modalButton: {
    flex: 1,
    height: hp(6.2),
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  modalCancelButton: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  modalCancelText: {
    fontSize: RFValue(13),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.text_light,
  },
  modalSaveButton: {
    backgroundColor: Colors.primary_blue,
  },
  modalSaveText: {
    fontSize: RFValue(13),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.white,
  },
});

export default styles;
