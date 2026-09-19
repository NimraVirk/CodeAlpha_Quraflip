import React from "react";
import { Image, StatusBar } from "react-native";
import { LinearGradient } from "react-native-linear-gradient";
import { Colors } from "../../../assets/constants/colors";
import styles from "./styles";

const Splash = () => {
    return (
        <LinearGradient
            colors={[Colors.primary_purple, Colors.primary_blue]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.container}
        >
            {/* Overrides the app-wide dark-content bar while this colorful gradient is showing;
                reverts automatically once Splash unmounts. */}
            <StatusBar barStyle="light-content" />

            <Image
                source={require("../../../assets/icons/logo.png")}
                style={styles.logo}
            />
        </LinearGradient>
    );
};

export default Splash;
