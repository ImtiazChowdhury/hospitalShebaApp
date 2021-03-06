import React, { useState, useEffect } from "react"
import { Dimensions, StyleSheet, Image, View, TouchableOpacity, Text } from "react-native"
import { baseUrl } from "../../config.json"
import { Card, Snackbar, Title, ActivityIndicator } from "react-native-paper"
import Icon from "react-native-vector-icons/Ionicons"

import DoctorImage from "../../assets/doctor2.png"
import CategoryIcon from "./CategoryIcon"

export const NearestDoctor = ({ navigation, route }) => {

    const [categories, setCategories] = useState([])
    const [alert, setAlert] = useState(false)
    const [loading, setLoading] = useState(true)

    async function loadNearestHospitals() {
        try {
            setLoading(true)
            const response = await fetch(baseUrl + "/api/diseaseCategory?limit=9&page=1"
            )
            if (response.ok) {
                const list = await response.json()
                setCategories(list.data)
            } else {
                setAlert(true)
            }
            setLoading(false)
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
                <Title style={style.heading}>Doctors</Title>
                <TouchableOpacity onPress={() => { navigation.navigate("AllDoctorCategories") }}>

                    <View style={style.seeMoreView}>
                        <Text style={style.seeMoreText}>All Categories</Text>
                        <Icon style={style.seeMoreIcon} name="chevron-forward" color="#359d9e" size={16} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={style.cardContainer}>
                {categories.length > 0 && categories.map(i => (
                    <TouchableOpacity key={i._id} onPress={()=>navigation.navigate("DoctorList", {category: i._id})}>
                        <CategoryIcon category={i}  />
                    </TouchableOpacity>
                ))}

                {!loading && !categories.length &&
                    <View style={style.notFoundMessage} >
                        <Icon name="alert-circle-outline" size={75} color="#5d5d5d" />
                        <Text style={style.notFoundText}>No doctor found nearby</Text>
                    </View>
                }
                {loading &&
                    <View style={style.notFoundMessage}>
                        <ActivityIndicator color="#359d9e" size="small"/>
                    </View>
                }
            </View>
        </>
    )
}

export default NearestDoctor

const style = StyleSheet.create({
    hospitalCard: {
        width: "48%",
        marginBottom: 15,
        marginTop: 5,
        backgroundColor: "#fff"
    },
    cardImage: {
        backgroundColor: "#fff"
    },
    cardContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
    },
    notFoundMessage: {
        alignItems: "center",
        marginTop: 50,
        marginBottom: 50
    },
    notFoundText: {
        textAlign: "center",
        marginTop: 20,
        color: "#5d5d5d",
        marginBottom: 20
    },

    doctorName: {
        fontWeight: "400",
        fontSize: 14,
        color: "#359d9e",
        marginTop: 5,
        textAlign: "left",
        paddingLeft: 5,
        paddingRight: 5,
        textAlign: "center"
    },
    categoryName: {
        fontWeight: "400",
        fontSize: 12,
        color: "#5d5d5d",
        textAlign: "left",
        paddingLeft: 5,
        paddingRight: 5,
        textAlign: "center"

    },
    hospitalName: {
        fontWeight: "400",
        fontSize: 13,
        color: "#434343",
        textAlign: "left",
        paddingLeft: 5,
        paddingRight: 5,
        textAlign: "center"

    },

    titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin:2,
        marginTop: 10,
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
        alignItems: "center",
    },
    seeMoreText: {
        color: "#359d9e",
    },
    seeMoreIcon: {
        marginTop: 3
    }
})