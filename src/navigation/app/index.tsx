import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import BottomTab from "./bottomTab";
import { DecksProvider } from "../../context/DecksContext";
import { StatsProvider } from "../../context/StatsContext";

const AppStack = createNativeStackNavigator();

const AppNavigation = () => {
    return (
        <DecksProvider>
            <StatsProvider>
                <AppStack.Navigator
                screenOptions={{ headerShown: false }}
                >
                    <AppStack.Screen name="MainTabs" component={BottomTab} />
                </AppStack.Navigator>
            </StatsProvider>
        </DecksProvider>
    )
}

export default AppNavigation;
