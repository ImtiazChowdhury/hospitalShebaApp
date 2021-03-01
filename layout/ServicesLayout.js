import React from "react";
import { createStackNavigator } from "@react-navigation/stack"
import Services from "../screens/Services/Services";
import HospitalList from "../screens/Services/HospitalList"
import DoctorList from "../screens/Services/DoctorList"
import TestList from "../screens/Services/TestList"


import AppBar from "../components/AppBar"
import HospitalDetail from "../screens/Services/HospitalDetail";
import DoctorDetail from "../screens/Services/DoctorDetail";
import TestDetail from "../screens/Services/TestDetail";


export const ServicesLayout = (props) => {
    const stack = createStackNavigator();
    return (
        <stack.Navigator initialRouteName="AllServices" screenOptions={{
            cardStyle: { backgroundColor: "#fff" },
            header: props=><AppBar {...props} />
        }}> 
            <stack.Screen name="AllServices" component={Services} options={{
                title:"Services"
            }}/>
            <stack.Screen name="HospitalList" component={HospitalList} />
            <stack.Screen name="DoctorList" component={DoctorList} />
            <stack.Screen name="TestList" component={TestList} />


            <stack.Screen name="HospitalDetail" component={HospitalDetail} />
            <stack.Screen name="DoctorDetail" component={DoctorDetail} />
            <stack.Screen name="TestDetail" component={TestDetail} />



        </stack.Navigator>
    )
}

export default ServicesLayout;