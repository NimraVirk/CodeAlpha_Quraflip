import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { Colors } from "../../assets/constants/colors";
import AppFonts from "../../assets/constants/font";
import Icon from "../../components/icon";
import { FeatherIconName } from "@react-native-vector-icons/feather";
import Home from "../../screens/app/home";
import DecksStack from "./decksStack";
import Quiz from "../../screens/app/quiz";
import ProfileStack from "./profileStack";

const Tab = createBottomTabNavigator();

// Stable, module-level icon renderers per tab (react-navigation renders
// tabBarIcon as a component, so this must not be recreated on every render).
const createTabIcon = (name: FeatherIconName) => {
  const TabIcon = ({ color, size }: { color: string; size: number }) => (
    <Icon name={name} size={size - 2} color={color} />
  );
  return TabIcon;
};

const HomeTabIcon = createTabIcon("home");
const DecksTabIcon = createTabIcon("folder");
const QuizTabIcon = createTabIcon("award");
const ProfileTabIcon = createTabIcon("user");

const BottomTab = () => {
  // A custom tabBarStyle height opts out of react-navigation's own safe-area
  // handling, so the real bottom inset (gesture bar / home indicator) is
  // added in here instead of guessing at a fixed value.
  const insets = useSafeAreaInsets();
  const tabBarBottomInset = Math.max(insets.bottom, Platform.OS === "ios" ? hp(1) : 0);

  const tabBarStyle = {
    height: hp(7) + tabBarBottomInset,
    paddingTop: hp(1),
    paddingBottom: tabBarBottomInset,
    backgroundColor: Colors.card,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  };
  const hiddenTabBarStyle = { display: "none" as const };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary_blue,
        tabBarInactiveTintColor: Colors.grey,
        tabBarLabelStyle: {
          fontSize: RFValue(9.5),
          fontFamily: AppFonts.body_semiBold,
          marginBottom: Platform.OS === "ios" ? 0 : hp(0.4),
        },
        tabBarStyle,
      }}
    >
      <Tab.Screen name="Home" component={Home} options={{ tabBarIcon: HomeTabIcon }} />
      <Tab.Screen
        name="Decks"
        component={DecksStack}
        options={({ route }) => {
          // Hide the tab bar once the user has pushed past the deck list
          // (create/add-cards/detail flows), matching the modal-like feel.
          const focusedRoute = getFocusedRouteNameFromRoute(route) ?? "DecksList";
          return {
            tabBarIcon: DecksTabIcon,
            tabBarStyle: focusedRoute === "DecksList" ? tabBarStyle : hiddenTabBarStyle,
          };
        }}
      />
      <Tab.Screen name="Quiz" component={Quiz} options={{ tabBarIcon: QuizTabIcon }} />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={({ route }) => {
          const focusedRoute = getFocusedRouteNameFromRoute(route) ?? "ProfileMain";
          return {
            tabBarIcon: ProfileTabIcon,
            tabBarStyle: focusedRoute === "ProfileMain" ? tabBarStyle : hiddenTabBarStyle,
          };
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
