import React, { useState, useEffect } from "react"
import { Dimensions, StyleSheet, Image, View, TouchableOpacity, Text } from "react-native"
import { baseUrl } from "../../config.json"
import { Card, Snackbar, Title, ActivityIndicator } from "react-native-paper"
import Icon from "react-native-vector-icons/Ionicons"

export const NearestDoctor = ({navigation, route}) => {

    const [tests, setTests] = useState([])
    const [alert, setAlert] = useState(false)
    const [loading, setLoading] = useState(true)

    async function loadNearestHospitals() {
        try {
            setLoading(true)
            navigator.geolocation.getCurrentPosition(async loc => {
                const response = await fetch(baseUrl + "/api/doctor?"
                    + `latitude=${loc.coords && loc.coords.latitude}`
                    + `&longitude=${loc.coords && loc.coords.longitude}`
                    + "&limit=6&resolveDiseaseCategory=1&resolveHospital=1"
                )
                if (response.ok) {
                    const list = await response.json()
                    setTests(list.data)
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
            <Snackbar visible={alert} duration={5000} theme={{ colors: { primary: "#c12127" } }}>
                Could not load data
            </Snackbar>
 
            <View style={style.titleContainer}>
                <Title style={style.heading}>Doctors</Title>
                <TouchableOpacity onPress={()=>{navigation.navigate("DoctorList")}}>

                    <View style={style.seeMoreView}>
                        <Text style={style.seeMoreText}>See More</Text>
                        <Icon style={style.seeMoreIcon} name="chevron-forward" color="#369d9e" size={16} />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={style.cardContainer}>
                {tests.length > 0 && tests.map(i => (

                    <Card style={style.hospitalCard} key={i._id}>
                        <TouchableOpacity>
                            <Card.Cover style={style.cardImage} source={{ uri: baseUrl + i.cover.medium }} />
                            <View>
                                <Text style={style.doctorName}>{i.name}</Text>
                                <Text style={style.categoryName}>{i.diseaseCategory && i.diseaseCategory.name}</Text>
                                <Text style={style.hospitalName}>{i.hospital && i.hospital.name}</Text>

                            </View>
                        </TouchableOpacity>
                    </Card>

                ))}

                {!loading && !tests.length &&
                    <View style={style.notFoundMessage} >
                        <Icon name="alert-circle-outline" size={75} color="#5d5d5d" />
                        <Text style={style.notFoundText}>No doctor found nearby</Text>
                    </View>
                }
                {loading &&
                    <View style={style.notFoundMessage}>
                        <ActivityIndicator color="#369d9e" />
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
        marginTop:5,
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
        margin:5,
        marginTop: 30,
        padding:5,
        borderColor: "#d5d5d599",
        borderWidth:1,
        borderRadius:5,
        alignItems:"center",
		backgroundColor:"#369d9e22"

    },
    heading: {
        fontSize: 20,
        fontWeight: "600",
        color: "#359d9e",
    },
    seeMoreView: {
        flexDirection: "row",
        alignItems:"center",  
    },
    seeMoreText: {
        color: "#369d9e",
    },
    seeMoreIcon: {
        marginTop: 3
    }
})