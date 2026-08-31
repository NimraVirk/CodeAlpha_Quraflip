import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./auth";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../screens/auth/splash";

const MainStack = createNativeStackNavigator();

const Navigation=()=>{

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 2500);
    })

    if (loading)
        return <Splash />

    else  
    return(
        <NavigationContainer>
            <MainStack.Navigator screenOptions={{headerShown:false}}>
                <MainStack.Screen name="Auth" component={AuthNavigation}/>
            </MainStack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;