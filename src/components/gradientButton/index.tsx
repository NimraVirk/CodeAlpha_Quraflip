import React from "react";
import { ActivityIndicator, StyleProp, Text, TouchableOpacity, ViewStyle } from "react-native";
import { LinearGradient } from "react-native-linear-gradient";
import { FeatherIconName } from "@react-native-vector-icons/feather";
import styles from "./styles";
import { Colors, Gradients } from "../../assets/constants/colors";
import Icon from "../icon";

interface GradientButtonProps {
  title: string;
  onPress?: () => void;
  colors?: string[];
  icon?: FeatherIconName;
  iconPosition?: "left" | "right";
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * The app's signature pill-shaped, gradient-filled primary action button —
 * used for every main CTA (submit forms, save, next/finish) so the app reads
 * as one consistent, colorful system instead of flat single-color buttons.
 */
const GradientButton = ({
  title,
  onPress,
  colors = Gradients.hero,
  icon,
  iconPosition = "right",
  loading = false,
  disabled = false,
  style,
}: GradientButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      disabled={isDisabled}
      style={[isDisabled && styles.disabled, style]}
    >
      <LinearGradient
        colors={isDisabled ? [Colors.border, Colors.border] : colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
      >
        {loading ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <>
            {icon && iconPosition === "left" && (
              <Icon name={icon} size={16} color={isDisabled ? Colors.grey : Colors.white} />
            )}
            <Text style={[styles.text, isDisabled && styles.textDisabled]}>{title}</Text>
            {icon && iconPosition === "right" && (
              <Icon name={icon} size={16} color={isDisabled ? Colors.grey : Colors.white} />
            )}
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default GradientButton;
