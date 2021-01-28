import React from "react";
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import InitiateOTP from "../screens/authentication/InitiateOTP";
import VerifyOTP from "../screens/authentication/VerifyOTP";
import Home from "../screens/Home/Home";


export const HomeLayout = (props) => {
    const stack = createStackNavigator();
    return (
        <stack.Navigator initialRouteName="Home" screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: "#fff" }
        }}>
            
            <stack.Screen name="Home" component={Home} />

        </stack.Navigator>
    )
}

export default HomeLayout;