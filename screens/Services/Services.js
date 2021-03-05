import React from "react";
import { Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InPageSearchBar from "../../components/services/InPageSearchBar";
import NearestDoctor from "../../components/services/NearestDoctor";
import NearestHospital from "../../components/services/NearestHospital";
import NearestTest from "../../components/services/NearestTest";

export const Services = (props) => {

    return (

            <ScrollView >
                <InPageSearchBar {...props}/>
                <NearestDoctor {...props}/>
                <NearestHospital {...props}/>
                <NearestTest {...props}/>
                <View style={{height: 60}} >
                    <Text>{/*:D */}</Text>    
                </View> 
            </ScrollView>
    )
}

export default Services;