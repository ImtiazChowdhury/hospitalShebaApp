import React, { useState, useEffect } from "react"
import { Dimensions, StyleSheet, Image, View, TouchableOpacity, Text } from "react-native"
import { baseUrl } from "../../config.json"
import { Card, Snackbar, Title, Searchbar } from "react-native-paper"
import Icon from "react-native-vector-icons/Ionicons"
import { Picker } from '@react-native-picker/picker'


export const InPageSearchBar = (props) => {

    const [query, setQuery] = useState("")
    const [searchIn, setSearchIn] = useState("hospital")

    const clearIcon = <Icon name="close" size={16} color="#359d9e" />

    function search() {
        let route = searchIn == "Hospital"? "HospitalList" : 
        searchIn == "Doctor" ? "DoctorList" : 
        searchIn == "Diagnostic" ? "TestList" : "HospitalList" 
        ;
        props.navigation.navigate(route, {query})
    }
    return (
        <View style={style.container}>

            <Searchbar inputStyle={style.input} style={style.searchBar} placeholder="Search" iconColor="#359d9e"
                value={query} onChangeText={(text) => setQuery(text)} onSubmitEditing={search}
                onIconPress={search} />

            <View style={style.pickerContainer}>

                <Picker selectedValue={searchIn} onValueChange={(value) => setSearchIn(value)}
                    style={style.picker}>
                    <Picker.Item label="Hospital" value="Hospital" />
                    <Picker.Item label="Doctor" value="Doctor" />
                    <Picker.Item label="Diagnostic" value="Diagnostic" />

                </Picker>
                <Icon style={style.pickerIcon} name="caret-down" size={14} />
            </View>
        </View>
    )
}

export default InPageSearchBar

const style = StyleSheet.create({
    container: {
        flexDirection: "row",
        padding: 5
    },
    searchBar: {
        width: "70%",
        elevation: 0,
        borderWidth: 1,
        borderColor: "#d5d5d5",
        borderStyle: "solid",
        borderRadius: 10,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
        height: 40,
        borderRightWidth:0
    },
    picker: {
        backgroundColor: "#fff",
        color: "#5d5d5d",
        height: 35,
        width: "90%",
    },
    pickerContainer:{
        height: 40,
        width: "30%",
        borderWidth:1,
        borderColor: "#d5d5d5",
        borderRadius: 10,
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        flexDirection: "row",
        justifyContent:"flex-start",
        borderLeftWidth:0
    },
    pickerIcon:{
        width: "15%",
        height:40,
        marginTop:10,
        marginLeft:"-10%"
    },
    input:{
        color: "#5d5d5d"
    }
})