import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../../screens/app/profile";
import EditProfile from "../../screens/app/profile/editProfile";

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} options={{ presentation: "modal" }} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
