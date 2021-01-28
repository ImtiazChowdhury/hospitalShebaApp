import React from "react";
import { Text, View, ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity,} from "react-native";
import HomeCarousel from "../../components/home/Carousel";
import NearestHospital from "../../components/services/NearestHospital";


import hospitalImage from "../../assets/hospital.jpg";
import testImage from "../../assets/test.jpg";
import doctorImage from "../../assets/doctor.jpg";


export const Home = ({route, navigation}) => {

    const location = navigator.geolocation.getCurrentPosition((params) => {
    });
    return (
        // <SafeAreaView style={{flex:1}}>

        <ScrollView >

            <HomeCarousel />
            <NearestHospital />

            <View style={style.overlayContainer}>

                <View style={style.fullOverlayCard}>
                    <TouchableOpacity onPress={()=>{navigation.navigate("Services")}}>
                        <Image style={style.overlayImage} source={ hospitalImage} />
                        <View style={style.overlayTitleView}>
                            <Text style={style.overlayTitle}>Hospitals</Text>

                        </View>
                    </TouchableOpacity>
                </View>

                <View style={style.halfOverlayCardContainer} >

                    <View style={style.halfOverlayCard}>
                    <TouchableOpacity onPress={()=>{navigation.navigate("Services")}}>

                            <Image style={style.overlayImage} source={testImage} />
                            <View style={style.overlayTitleView}>
                                <Text style={style.overlayTitle}>Diagnostic</Text>

                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={style.halfOverlayCard}>
                    <TouchableOpacity onPress={()=>{navigation.navigate("Services")}}>

                            <Image style={style.overlayImage} source={ doctorImage} />
                            <View style={style.overlayTitleView}>
                                <Text style={style.overlayTitle}>Doctors</Text>

                            </View>
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        </ScrollView>
        // </SafeAreaView>
    )
}

export default Home;

const width = Dimensions.get("window");

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

    },
    overlayTitle: {
        color: "#fff",
        fontSize: 25,
        fontWeight: "bold"
    },
    overlayTitleView: {
        position: "absolute",
        top: 0,
        textAlign: "center",
        backgroundColor: "rgba(0, 0, 0, .3)",
        width: "100%",
        height: "100%",
        justifyContent: "center"
    },

    overlayImage: {
        width: "100%",
        height: 100,
        borderRadius: 15
    }
})