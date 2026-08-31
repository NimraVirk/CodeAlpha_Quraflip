import React, { useRef, useState } from "react";
import { Image, Text, View } from "react-native";
import styles from "./styles";
import LottieView from "lottie-react-native";
import Video from "react-native-video";
import { LinearGradient } from "react-native-linear-gradient";
import { Colors } from "../../../assets/constants/colors";


const Splash=()=>{


    return(
        // <View style={styles.container} >
        <LinearGradient
      colors={[Colors.primary_purple, Colors.primary_blue]}
      start={{ x: 0, y: 0 }} // Top-left
      end={{ x: 1, y: 1 }}   // Bottom-right
      style={styles.container}
    >

            {/* <LottieView
            source={require('../../../assets/splash-logo.json')}
            autoPlay
            loop={false}
            style={{height:300,width:300,
                }}
            renderMode="HARDWARE"
            /> */}
            {/* <Video
            source={require("../../../assets/splash-logo.mp4")}
        style={{ width: 300, height: 300, 
            // opacity: shouldPlay ? 1 : 0 

        }}
        resizeMode="contain"
        repeat={false}
        // paused={!shouldPlay}
        muted={true} // Set to true to avoid system audio focus issues on startup
            /> */}

            <Image
            source={require("../../../assets/icons/logo.png")}
            style={styles.logo}
            />
</LinearGradient>
        /* </View> */
    )
}



export default Splash;



