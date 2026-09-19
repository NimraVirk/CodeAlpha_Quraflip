import React from "react";
import { Text, View } from "react-native";
import styles from "./styles";
import Icon from "../icon";
import { FeatherIconName } from "@react-native-vector-icons/feather";

interface StatTileProps {
  icon: FeatherIconName;
  iconColor: string;
  iconTint: string;
  value: string;
  label: string;
}

const StatTile = ({ icon, iconColor, iconTint, value, label }: StatTileProps) => {
  return (
    <View style={styles.tile}>
      <View style={[styles.iconCircle, { backgroundColor: iconTint }]}>
        <Icon name={icon} size={16} color={iconColor} />
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

export default StatTile;
