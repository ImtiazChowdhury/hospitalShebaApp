import React from "react";
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import InitiateOTP from "../screens/authentication/InitiateOTP";
import VerifyOTP from "../screens/authentication/VerifyOTP";
import Home from "../screens/Home/Home";
import AppBar from "../components/AppBar"
import AuthenticationLayout from "./Authentication"


export const HomeLayout = (props) => {
    const stack = createStackNavigator();
    return (
        <stack.Navigator initialRouteName="Main" screenOptions={{
            cardStyle: { backgroundColor: "#fff" },
            header: props=><AppBar {...props} route={props.route}/>
        }}
        
        >    
            <stack.Screen name="Main" component={Home} />
            <stack.Screen name="Authentication" component={AuthenticationLayout} 
            options={{headerShown: false}} />

        </stack.Navigator>
    )
}

export default HomeLayout;