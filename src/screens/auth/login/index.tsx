import React, { useRef, useState } from "react";
import { Image, Text, View } from "react-native";
import styles from "./styles";
import LottieView from "lottie-react-native";
import Video from "react-native-video";
import { LinearGradient } from "react-native-linear-gradient";
import { Colors } from "../../../assets/constants/colors";


const Login=()=>{


    return(
        <View style={styles.container}>
            <Image 
            source={require('../../../assets/icons/logo.png')}
            style={styles.logo}
            />
            <Text style={styles.title}>Login</Text>


        </View>
    )
}



export default Login;



