import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { getAuth, onAuthStateChanged, type User } from "@react-native-firebase/auth";
import AuthNavigation from "./auth";
import AppNavigation from "./app";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "../screens/auth/splash";

const MainStack = createNativeStackNavigator();

const Navigation=()=>{

    const [showSplash, setShowSplash] = useState(true)
    const [initializing, setInitializing] = useState(true)
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowSplash(false)
        }, 2500);

        const unsubscribe = onAuthStateChanged(getAuth(), authUser => {
            setUser(authUser)
            setInitializing(false)
        });

        return () => {
            clearTimeout(timer)
            unsubscribe()
        }
    }, [])

    if (showSplash || initializing)
        return <Splash />

    else
    return(
        <NavigationContainer>
            <MainStack.Navigator screenOptions={{headerShown:false}}>
                {user ? (
                    <MainStack.Screen name="App" component={AppNavigation}/>
                ) : (
                    <MainStack.Screen name="Auth" component={AuthNavigation}/>
                )}
            </MainStack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation;
