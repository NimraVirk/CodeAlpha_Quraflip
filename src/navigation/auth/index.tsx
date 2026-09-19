import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "../../screens/auth/login";
import Signup from "../../screens/auth/signup";

const AuthStack = createNativeStackNavigator();

const AuthNavigation=()=>{
    return(
        <AuthStack.Navigator
        screenOptions={{headerShown:false}}
        >
            <AuthStack.Screen name="Login" component={Login}/>
            <AuthStack.Screen name="Signup" component={Signup}/>

        </AuthStack.Navigator>
    )
}

export default AuthNavigation;