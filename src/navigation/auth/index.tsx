import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Splash from "../../screens/auth/splash";
import Login from "../../screens/auth/login";

const AuthStack = createNativeStackNavigator();

const AuthNavigation=()=>{
    return(
        <AuthStack.Navigator 
        screenOptions={{headerShown:false}}
        >
            <AuthStack.Screen name="Login" component={Login}/>
            
        </AuthStack.Navigator>
    )
}

export default AuthNavigation;