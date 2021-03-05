import React, { useState, useEffect } from "react"
import { Dimensions, StyleSheet, Image, View, TouchableOpacity, Text } from "react-native"
import { baseUrl } from "../../config.json"
import { Card, Snackbar, Title, ActivityIndicator } from "react-native-paper"
import Icon from "react-native-vector-icons/Ionicons"
import TestImage from "../../assets/test2.png"


export const NearestTest = ({navigation, route}) => {

    const [doctors, setDoctors] = useState([])
    const [alert, setAlert] = useState(false)
    const [loading, setLoading] = useState(true)

    async function loadNearestHospitals() {
        try {
            setLoading(true);
            
            navigator.geolocation.getCurrentPosition(async loc => {
                const response = await fetch(baseUrl + "/api/service?"
                    + `latitude=${loc.coords && loc.coords.latitude}`
                    + `&longitude=${loc.coords && loc.coords.longitude}`
                    + "&limit=5&sort=distance&resolveHospital=1"
                )
                if (response.ok) {
                    const list = await response.json()
                    setDoctors(list.data)
                } else {
                    setAlert(true)
                }
                setLoading(false)

            })


        } catch (err) {
            console.log(err)
            setAlert(true)
            setLoading(false)
        }
    }


    useEffect(() => { loadNearestHospitals() }, [])

    return (
        <>
            <Snackbar visible={alert} duration={5000} theme={{ colors: { primary: "#c12127" } }}
				action={{ label: 'Ok', onPress: () => { setInfoBarVisible(false) } }}
                >
                Could not load data
            </Snackbar>

            <View style={style.titleContainer}>
                <Title style={style.heading}>Disgnostic Services</Title>
                <TouchableOpacity onPress={()=>{navigation.navigate("TestList")}}>

                    <View style={style.seeMoreView}>
                        <Text style={style.seeMoreText}>See More</Text>
                        <Icon style={style.seeMoreIcon} name="chevron-forward" color="#359d9e" size={16} />
                    </View>
                </TouchableOpacity>
            </View>

            <View style={style.cardContainer}>
                {doctors.length > 0 && doctors.map(i => (

                    <Card style={style.hospitalCard} key={i._id}>
                        <TouchableOpacity  onPress={()=>navigation.navigate("TestDetail", {test: i._id})}>
                            <Card.Cover style={style.cardImage}  source={i.cover && { uri:baseUrl + i.cover.medium } || TestImage}/>
                            <View>
                                <Text style={style.hospitalName}>{i.name}</Text>
                                <Text style={style.categoryName}>{i.hospital && i.hospital.name}</Text>

                            </View>
                        </TouchableOpacity>
                    </Card>

                ))}
                
                {!loading && !doctors.length &&
                    <View style={style.notFoundMessage} >
                        <Icon name="alert-circle-outline" size={75} color="#5d5d5d" />
                        <Text style={style.notFoundText}>No diagnostic service found nearby</Text>
                    </View>
                }

                {loading &&
                    <View style={style.notFoundMessage}>
                        <ActivityIndicator color="#359d9e" />
                    </View>
                }
            </View>
        </>
    )
}

export default NearestTest

const style = StyleSheet.create({
    hospitalCard: {
        width: "45%",
        marginTop: 10,
    },
    cardContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
    },
    notFoundMessage: {
        alignItems: "center",
        marginTop: 50,
        marginBottom:50
    },
    notFoundText: {
        textAlign: "center",
        marginTop: 20,
        color: "#5d5d5d"
    },
    heading: {
        fontSize: 16,
        fontWeight: "600",
        color: "#359d9e",
        marginTop: 20,
        paddingLeft: 10
    },
    hospitalName: {
        fontWeight: "400",
        fontSize: 14,
        color: "#359d9e",
        paddingLeft: 5,
        paddingRight: 5,
        textAlign: "center",
    },
    categoryName: {
        fontWeight: "400",
        fontSize: 12,
        color: "#5d5d5d",
        paddingLeft: 5,
        paddingRight: 5,
        textAlign: "center",
    },
    cardImage: {
        //     height: 150,
        //     width: 150
    },
    moreText: {
        fontWeight: "400",
        fontSize: 14,
        color: "#359d9e",
        padding: 5,
        textAlign: "center"
    },
    moreCard: {
        justifyContent: "center",
        // height: "100%",
        alignItems: "center",
        paddingTop: 70
    },
    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin:2,
        marginTop: 20,
        padding:2,
        paddingLeft: 5,
        paddingRight: 5,
        // borderColor: "#359d9e55",
        // borderWidth:1,
        // borderRadius:5,
        alignItems:"center",
		// backgroundColor:"#359d9e22"

    },
    heading: {
        fontSize: 16,
        fontWeight: "600",
        color: "#359d9e",
    },
    seeMoreView: {
        flexDirection: "row",
        alignItems:"center",  
    },
    seeMoreText: {
        color: "#359d9e",
    },
    seeMoreIcon: {
        marginTop: 3
    }
})