import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors } from "../../../assets/constants/colors";
import { RFValue } from "react-native-responsive-fontsize";
import AppFonts from "../../../assets/constants/font";

const styles=StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  flexFill: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems:'center',
    paddingBottom: hp(4),
    backgroundColor:Colors.white
  },
  hero: {
    width: '100%',
    alignItems: 'center',
    paddingTop: hp(3),
    paddingBottom: hp(4.5),
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    marginBottom: hp(4),
  },
  title: {
    fontSize: RFValue(23),
    fontFamily: AppFonts.body_extraBold,
    color: Colors.white,
    marginTop: hp(2),
  },
  subtitle: {
    fontSize: RFValue(12),
    fontFamily: AppFonts.body_regular,
    color: 'rgba(255,255,255,0.85)',
    marginTop: hp(0.6),
  },
  logo: {
    height:wp(18),
    width:wp(45),
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  formError: {
    width: wp(85),
    fontSize: RFValue(11.5),
    fontFamily: AppFonts.body_medium,
    color: Colors.error,
    marginBottom: hp(1.5),
    textAlign: 'left',
  },
  button: {
    width: wp(85),
    marginTop: hp(1),
  },
  footerRow: {
    flexDirection: 'row',
    marginTop: hp(3),
    alignItems: 'center',
  },
  footerText: {
    fontSize: RFValue(12),
    fontFamily: AppFonts.body_regular,
    color: Colors.text_light,
  },
  footerLink: {
    fontSize: RFValue(12),
    fontFamily: AppFonts.body_semiBold,
    color: Colors.primary_blue,
  },
});

export default styles;
