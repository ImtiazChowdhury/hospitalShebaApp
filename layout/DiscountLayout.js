import React from "react";
import { createStackNavigator } from "@react-navigation/stack"
import Services from "../screens/Services/Services";
import HospitalList from "../screens/Services/HospitalList"
import DoctorList from "../screens/Services/DoctorList"
import AppBar from "../components/AppBar"
import BillImage from "../screens/discount/BillImage"
import Discount from "../screens/discount/Discount"


export const DiscountLayout = (props) => {
    const stack = createStackNavigator();
    return (
        <stack.Navigator initialRouteName="Main" screenOptions={{
            cardStyle: { backgroundColor: "#fff" },
            header: props=><AppBar {...props} route={props.route}/>
        }}> 
            <stack.Screen name="Main" component={Discount} />
            <stack.Screen name="BillImage" component={BillImage} />

        </stack.Navigator>
    )
}

export default DiscountLayout;