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
  listContent: {
    paddingHorizontal: wp(5.5),
    paddingTop: hp(2),
    paddingBottom: hp(12),
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: RFValue(20),
    fontFamily: AppFonts.body_extraBold,
    color: Colors.black,
  },
  iconButton: {
    width: wp(10.5),
    height: wp(10.5),
    borderRadius: wp(5.25),
    backgroundColor: Colors.card,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  searchInput: {
    marginTop: hp(2),
    height: hp(6),
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
    paddingHorizontal: wp(4),
    fontSize: RFValue(12.5),
    fontFamily: AppFonts.body_regular,
    color: Colors.black,
  },
  chipsRow: {
    marginTop: hp(2.4),
    marginBottom: hp(1),
    gap: wp(2.5),
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
  columnWrapper: {
    justifyContent: "space-between",
  },
  gridCard: {
    width: wp(43.5),
    marginRight: 0,
    marginTop: hp(2),
  },
  emptyState: {
    alignItems: "center",
    paddingTop: hp(8),
    paddingHorizontal: wp(8),
  },
  emptyIconWrap: {
    width: wp(16),
    height: wp(16),
    borderRadius: wp(8),
    backgroundColor: Colors.blue_tint,
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
  fabTouchable: {
    position: "absolute",
    right: wp(6),
    bottom: hp(3),
  },
  fab: {
    width: wp(14),
    height: wp(14),
    borderRadius: wp(7),
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary_blue,
    shadowOpacity: 0.35,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
});

export default styles;
