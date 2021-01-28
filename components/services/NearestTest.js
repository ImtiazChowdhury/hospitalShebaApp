import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, Image, View, TouchableOpacity, Text } from "react-native";
import { baseUrl } from "../../config.json";
import { Card, Snackbar, Title } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

export const NearestTest = (props) => {

    const [doctors, setDoctors] = useState([]);
    const [alert, setAlert] = useState(false);

    async function loadNearestHospitals() {
        try {
            navigator.geolocation.getCurrentPosition(async loc => {
                const response = await fetch(baseUrl + "/api/service?"
                    + `latitude=${loc.coords && loc.coords.latitude}`
                    + `&longitude=${loc.coords && loc.coords.longitude}`
                    + "&limit=5&sort=distance&resolveHospital=1"
                );
                if (response.ok) {
                    const list = await response.json();
                    setDoctors(list.data);
                } else {
                    setAlert(true);
                }
            })


        } catch (err) {
            console.log(err);
            setAlert(true);
        }
    }


    useEffect(() => { loadNearestHospitals() }, []);

    return (
        <>
            <Snackbar visible={alert} duration={5000} theme={{ colors: { primary: "#c12127" } }}>
                Could not load data
            </Snackbar>

            <Title style={style.heading}>Diagnostic Services</Title>
            <View style={style.cardContainer}>
                {doctors.length > 0 && doctors.map(i => (

                    <Card style={style.hospitalCard} key={i._id}>{console.log(i)}
                        <TouchableOpacity >
                            <Card.Cover style={style.cardImage} source={{ uri: baseUrl + i.cover.mediummthumbnailthumbnailthumbnailthumbnailthumbnail }} />
                            <Card.Content>
                                <Text style={style.hospitalName}>{i.name}</Text>
                                <Text style={style.categoryName}>{i.hospital && i.hospital.name}</Text>

                            </Card.Content>
                        </TouchableOpacity>
                    </Card>

                ))}
                {doctors.length > 0 &&
                    <Card style={style.hospitalCard} key="more">
                        <TouchableOpacity>
                            <Card.Content style={style.moreCard}>
                                <Icon name="list-outline" size={25} color="#359d9e"/>
                                <Text style={style.moreText}>More</Text>
                            </Card.Content>
                        </TouchableOpacity>
                    </Card>
                }
                {!doctors.length &&
                    <View style={style.notFoundMessage} >
                        <Icon name="alert-circle-outline" size={75} color="#5d5d5d" />
                        <Text style={style.notFoundText}>No doctors found nearby</Text>
                    </View>
                }
            </View>
        </>
    )
}

export default NearestTest;

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
        color: "#5d5d5d",
        marginBottom: 20

    },
    notFoundText: {
        textAlign: "center",
        marginTop: 20,
        color: "#5d5d5d"
    },
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#359d9e",
        marginTop: 20,
        paddingLeft: 10
    },
    hospitalName: {
        fontWeight: "400",
        fontSize: 14,
        color: "#359d9e",
    },
    categoryName: {
        fontWeight: "400",
        fontSize: 12,
        color: "#5d5d5d",
    },
    cardImage: {
        height: 150,
        width: 150
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
        height: "100%",
        alignItems: "center",
        paddingTop: 70
    }
})