import React from "react";
import Feather, { FeatherIconName } from "@react-native-vector-icons/feather";
import Ionicons, { IoniconsIconName } from "@react-native-vector-icons/ionicons";

type FeatherIconProps = {
  family?: "feather";
  name: FeatherIconName;
  size?: number;
  color?: string;
};

type IoniconsIconProps = {
  family: "ionicons";
  name: IoniconsIconName;
  size?: number;
  color?: string;
};

type IconProps = FeatherIconProps | IoniconsIconProps;

/** Unified icon component so screens don't need to import each icon family directly. */
const Icon = ({ family = "feather", name, size = 20, color = "#000" }: IconProps) => {
  if (family === "ionicons") {
    return <Ionicons name={name as IoniconsIconName} size={size} color={color} />;
  }
  return <Feather name={name as FeatherIconName} size={size} color={color} />;
};

export default Icon;
