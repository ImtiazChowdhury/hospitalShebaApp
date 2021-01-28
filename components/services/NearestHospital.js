import React, { useState, useEffect } from "react";
import { Dimensions, StyleSheet, Image, View, TouchableOpacity, Text } from "react-native";
import { baseUrl } from "../../config.json";
import { Card, Snackbar, Title } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

export const NearestHospital = (props) => {

    const [hospitals, setHospitals] = useState([]);
    const [alert, setAlert] = useState(false);

    async function loadNearestHospitals() {
        try {
            navigator.geolocation.getCurrentPosition(async loc => {
                const response = await fetch(baseUrl + "/api/hospital?"
                    + `latitude=${loc.coords && loc.coords.latitude}`
                    + `&longitude=${loc.coords && loc.coords.longitude}`
                    + "&limit=5&sort=distance"
                );
                if (response.ok) {
                    const list = await response.json();
                    setHospitals(list.data);
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
            <Snackbar
                visible={alert}
                duration={5000}
                theme={{ colors: { primary: "#c12127" } }}

            >Could not load data</Snackbar>

            <Title style={style.heading}>Hospitals</Title>
            <View style={style.cardContainer}>
                {hospitals.length > 0 && hospitals.map(i => (

                    <Card style={style.hospitalCard} key={i._id}>
                        <TouchableOpacity>

                            <Card.Cover style={style.cardImage} source={{ uri: baseUrl + i.cover.medium }} />
                            <Card.Content>
                                <Text style={style.hospitalName}>{i.name}</Text>
                            </Card.Content>
                        </TouchableOpacity>
                    </Card>

                ))}

                {hospitals.length > 0 &&
                    <Card style={style.hospitalCard} key="more">
                        <TouchableOpacity>
                            <Card.Content style={style.moreCard}>
                                <Icon name="list-outline" size={25} color="#359d9e" />
                                <Text style={style.moreText}>More</Text>
                            </Card.Content>
                        </TouchableOpacity>
                    </Card>
                }

                {!hospitals.length &&
                    <View style={style.notFoundMessage} >
                        <Icon name="alert-circle-outline" size={75} color="#5d5d5d" />
                        <Text style={style.notFoundText}>No hospitals found nearby</Text>
                    </View>
                }
            </View>
        </>
    )
}

export default NearestHospital;

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
        marginTop: 50
    },
    notFoundText: {
        textAlign: "center",
        marginTop: 20,
        color: "#5d5d5d",
        marginBottom: 20
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
        padding: 5
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