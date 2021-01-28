import React from "react";
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import InitiateOTP from "../screens/authentication/InitiateOTP";
import VerifyOTP from "../screens/authentication/VerifyOTP";
import Home from "../screens/Home/Home";
import Services from "../screens/Services/Services";


export const ServicesLayout = (props) => {
    const stack = createStackNavigator();
    return (
        <stack.Navigator initialRouteName="Services" screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: "#fff" }
        }}>
            
            <stack.Screen name="Services" component={Services} />

        </stack.Navigator>
    )
}

export default ServicesLayout;