import React from "react";
import { Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InPageSearchBar from "../../components/services/InPageSearchBar";
import NearestDoctor from "../../components/services/NearestDoctor";
import NearestHospital from "../../components/services/NearestHospital";
import NearestTest from "../../components/services/NearestTest";

export const Services = (props) => {

    return (
        <SafeAreaView >

            <ScrollView >
                <InPageSearchBar />
                <NearestHospital />
                <NearestDoctor />
                <NearestTest />

            </ScrollView>
        </SafeAreaView>
    )
}

export default Services;