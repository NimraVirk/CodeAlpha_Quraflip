import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Colors } from "../../../assets/constants/colors";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import AppFonts from "../../../assets/constants/font";

const styles=StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    paddingTop:hp(10),
    backgroundColor:Colors.white

    
    
  },
  title: {
    fontSize: RFValue(22),
    fontFamily: AppFonts.body_bold,
    color: Colors.black,
  },
  logo: {
    height:wp(18),
    width:wp(45),
    resizeMode: 'contain',
    // backgroundColor:'red',
    tintColor:Colors.primary_blue
  },
});

export default styles;