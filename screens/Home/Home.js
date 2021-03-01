import React from "react"
import { Text, View, ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity, SafeAreaView} from "react-native"
import HomeCarousel from "../../components/home/Carousel"
import NearestHospital from "../../components/services/NearestHospital"


import hospitalImage from "../../assets/hospital.jpg"
import testImage from "../../assets/test.jpg"
import doctorImage from "../../assets/doctor.jpg"

import scanImage from "../../assets/scan.jpg"

export const Home = ({ route, navigation }) => {

    const slides=[
        "https://image.freepik.com/free-vector/people-walking-sitting-hospital-building-city-clinic-glass-exterior-flat-vector-illustration-medical-help-emergency-architecture-healthcare-concept_74855-10130.jpg",
        "https://img.freepik.com/free-vector/set-doctors-characters_48866-327.jpg?size=626&ext=jpg",        
        "https://image.freepik.com/free-vector/coronavirus-test-kit-abstract-concept-vector-illustration-novel-coronavirus-diagnosis-covid-19-swipe-test-kit-ncov-testing-protocol-finding-antibodies-rapid-diagnostic-abstract-metaphor_335657-1599.jpg"
    ]

    return (
        <SafeAreaView >

            <ScrollView >

                <HomeCarousel slides={slides}/>

                <View style={style.overlayContainer}>

                    <View style={style.fullOverlayCard}>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate("Services", { screen: "HospitalList" })
                        }}>
                            <Image style={style.overlayImage} source={hospitalImage} />
                            <View style={style.overlayTitleView}>
                                <Text style={style.overlayTitle}>Hospitals</Text>

                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={style.halfOverlayCardContainer} >

                        <View style={style.halfOverlayCard}>
                            <TouchableOpacity onPress={() => { navigation.navigate("Services", { screen: "TestList" }) }}>

                                <Image style={style.overlayImage} source={testImage} />
                                <View style={style.overlayTitleView}>
                                    <Text style={style.overlayTitle}>Diagnostic</Text>

                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={style.halfOverlayCard}>
                            <TouchableOpacity onPress={() => { navigation.navigate("Services", { screen: "DoctorList" }) }}>

                                <Image style={style.overlayImage} source={doctorImage} />
                                <View style={style.overlayTitleView}>
                                    <Text style={style.overlayTitle}>Doctors</Text>

                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>

                {/* <NearestHospital navigation={navigation} route={route}/> */}

                <View style={style.imageContainer}>
                    <Image source={scanImage} style={style.image} />
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

export default Home

const width = Dimensions.get("window")

const style = StyleSheet.create({
    overlayContainer: {
        flexDirection: "column",
        flexWrap: "wrap",
        width: "100%"
    },
    fullOverlayCard: {
        width: "96%",
        position: "relative",
        margin: "2%",
        marginBottom: "1%",
        borderRadius:5,
    },
    halfOverlayCardContainer: {
        marginRight: "1%",
        marginLeft: "1%",
        width: "100%",
        flexDirection: "row",

    },
    halfOverlayCard: {
        width: "47%",
        position: "relative",
        margin: "1%",
        borderRadius:5,

    },
    overlayTitle: {
        color: "#fff",
        fontSize: 25,
        fontWeight: "600",
        textAlign: "center",
        fontFamily:"serif"
    },
    overlayTitleView: {
        position: "absolute",
        top: 0,
        backgroundColor: "rgba(0, 0, 0, .4)",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        borderRadius:4
    },

    overlayImage: {
        width: "100%",
        height: 120,
        borderRadius: 7
    },
    image:{
        width: 350,
        height: 200
    },
    imageContainer:{
        alignItems:"center",
        marginTop: 40,
        marginBottom: 40
    }
})