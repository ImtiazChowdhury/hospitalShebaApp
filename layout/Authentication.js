import React from "react";
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"
import InitiateOTP from "../screens/authentication/InitiateOTP";
import VerifyOTP from "../screens/authentication/VerifyOTP";
import SetInformation from "../screens/authentication/SetInformation"
import Login from "../screens/authentication/Login"
import Profile from "../screens/authentication/Profile"
import BillList from "../screens/authentication/BillList"
import BillDetail from "../screens/authentication/BillDetail"
import EditProfile from "../screens/authentication/EditProfile"
import ChangePassword from "../screens/authentication/ChangePassword"


import AppBar from "../components/AppBar"


export const AuthenticationLayout = (props)=>{
    const stack = createStackNavigator();
    return (
        <stack.Navigator initialRouteName="Authentication" screenOptions={{
            // headerShown:false,
            cardStyle: {backgroundColor:"#fff"},
            header: props=><AppBar {...props} route={props.route}/>

        }}>
            <stack.Screen name="InitiateOTP" component={InitiateOTP}/>
            <stack.Screen name="VerifyOTP" component={VerifyOTP}/>
            <stack.Screen name="SetInformation" component={SetInformation}/>
            <stack.Screen name="Login" component={Login}/>
            <stack.Screen name="Profile" component={Profile}/>
            <stack.Screen name="BillList" component={BillList}/>
            <stack.Screen name="BillDetail" component={BillDetail}/>

            <stack.Screen name="EditProfile" component={EditProfile}/>
            <stack.Screen name="ChangePassword" component={ChangePassword}/>




        </stack.Navigator>
    )
}

export default AuthenticationLayout;