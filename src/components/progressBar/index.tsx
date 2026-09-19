import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { Colors } from "../../assets/constants/colors";

interface ProgressBarProps {
  progress: number; // 0 to 1
  color?: string;
  trackColor?: string;
  height?: number;
}

const ProgressBar = ({
  progress,
  color = Colors.primary_blue,
  trackColor = Colors.border,
  height = 6,
}: ProgressBarProps) => {
  const clamped = Math.max(0, Math.min(1, progress));

  return (
    <View style={[styles.track, { backgroundColor: trackColor, height }]}>
      <View
        style={[
          styles.fill,
          { width: `${clamped * 100}%`, backgroundColor: color, height },
        ]}
      />
    </View>
  );
};

export default ProgressBar;
