import React from "react";
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import InitiateOTP from "../screens/authentication/InitiateOTP";
import VerifyOTP from "../screens/authentication/VerifyOTP";


export const AuthenticationLayout = (props)=>{
    const stack = createStackNavigator();
    return (
        <stack.Navigator initialRouteName="Register" screenOptions={{
            headerShown:false,
            cardStyle: {backgroundColor:"#fff"}
        }}>
            <stack.Screen name="InitiateOTP" component={InitiateOTP}/>
            <stack.Screen name="VerifyOTP" component={VerifyOTP}/>

        </stack.Navigator>
    )
}

export default AuthenticationLayout;