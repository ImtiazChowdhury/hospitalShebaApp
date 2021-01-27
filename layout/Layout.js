import React from "react";
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import AuthenticationLayout from "./Authentication"


export const Layout = (props)=>{
    const stack = createStackNavigator();
    return (
        <NavigationContainer >
            <AuthenticationLayout />
        </NavigationContainer>
    )
}

export default Layout