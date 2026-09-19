import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Colors } from "../../../assets/constants/colors";

const styles=StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary_blue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    // height:300,
    width:wp(60),
    resizeMode: 'contain',
  },
});

export default styles;